/**
 * One-time storage bucket initialization.
 *
 * Creates the "uploads" and "headshots" buckets in Supabase Storage
 * if they don't already exist. Called automatically on first deploy
 * or can be triggered manually via GET /api/setup/storage.
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: "Missing Supabase credentials" },
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
      results.uploads = `error: ${uploadsError.message}`;
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
      results.headshots = `error: ${headshotsError.message}`;
    }
  } else {
    results.headshots = "created";
  }

  return NextResponse.json({
    success: true,
    buckets: results,
  });
}
