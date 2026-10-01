/**
 * One-time storage bucket initialization.
 *
 * Creates the "uploads" and "headshots" buckets in Supabase Storage
 * if they don't already exist. Called manually via POST /api/setup/storage
 * with Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>.
 *
 * In development (NODE_ENV !== 'production'), the Bearer token is optional.
 * In production, a valid Bearer token matching SUPABASE_SERVICE_ROLE_KEY is required.
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";
import { safeEqual } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isDev = process.env.NODE_ENV !== "production";

  // Extract Bearer token from Authorization header
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  const hasValidToken = safeEqual(bearerToken, serviceKey);

  // In production, require a valid Bearer token
  if (!isDev && !hasValidToken) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const results: Record<string, string> = {};

  // Create "uploads" bucket (private — user selfies for training)
  const { error: uploadsError } = await supabase.storage.createBucket(
    "uploads",
    {
      public: false,
      fileSizeLimit: 10 * 1024 * 1024, // 10 MB
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    }
  );

  if (uploadsError) {
    if (uploadsError.message.includes("already exists")) {
      results.uploads = "already exists";
    } else {
      logger.error("Storage setup: uploads bucket failed", uploadsError);
      results.uploads = "error";
    }
  } else {
    results.uploads = "created";
  }

  // Create "headshots" bucket (public — generated results)
  const { error: headshotsError } = await supabase.storage.createBucket(
    "headshots",
    {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024, // 10 MB
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    }
  );

  if (headshotsError) {
    if (headshotsError.message.includes("already exists")) {
      results.headshots = "already exists";
    } else {
      logger.error("Storage setup: headshots bucket failed", headshotsError);
      results.headshots = "error";
    }
  } else {
    results.headshots = "created";
  }

  return NextResponse.json({
    success: true,
    buckets: results,
  });
}
