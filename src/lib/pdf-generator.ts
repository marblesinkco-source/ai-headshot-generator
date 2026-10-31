/**
 * Minimal raw-PDF generator for hero storybooks.
 *
 * Builds a valid PDF 1.4 document using only Node.js built-ins — no native
 * dependencies, no npm packages. Supports:
 *   - Multiple pages (US Letter, 612 x 792 pt)
 *   - Standard 14 fonts (Helvetica, Helvetica-Bold, Times-Roman)
 *   - JPEG image embedding (fetched from URLs)
 *   - Multi-line text wrapping
 *   - Centered text
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PdfImage {
  /** Raw JPEG bytes */
  data: Buffer;
  width: number;
  height: number;
}

interface PdfObject {
  id: number;
  offset: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PAGE_W = 612; // US Letter width in points
const PAGE_H = 792; // US Letter height in points
const MARGIN = 54;  // ~0.75 inch margins
const TEXT_W = PAGE_W - 2 * MARGIN;

/* ------------------------------------------------------------------ */
/*  JPEG helpers                                                       */
/* ------------------------------------------------------------------ */

/**
 * Parse JPEG dimensions from raw bytes.
 * Scans for SOF0/SOF2 markers (0xFF 0xC0 / 0xFF 0xC2).
 */
function jpegDimensions(buf: Buffer): { width: number; height: number } {
  let i = 0;
  while (i < buf.length - 1) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    // SOF0 or SOF2
    if (marker === 0xc0 || marker === 0xc2) {
      const height = buf.readUInt16BE(i + 5);
      const width = buf.readUInt16BE(i + 7);
      return { width, height };
    }
    // Skip non-marker bytes and standalone markers
    if (marker === 0x00 || marker === 0xff || (marker >= 0xd0 && marker <= 0xd9)) {
      i += 2;
      continue;
    }
    // Read segment length and skip
    if (i + 3 < buf.length) {
      const segLen = buf.readUInt16BE(i + 2);
      i += 2 + segLen;
    } else {
      break;
    }
  }
  // Fallback — assume square if parsing fails
  return { width: 1024, height: 768 };
}

/**
 * Fetch an image URL and return raw JPEG bytes + dimensions.
 * Returns null on failure (we skip that illustration).
 */
async function fetchJpeg(url: string): Promise<PdfImage | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) return null;
    const arrayBuf = await res.arrayBuffer();
    const data = Buffer.from(arrayBuf);
    if (data.length < 100) return null;
    const { width, height } = jpegDimensions(data);
    return { data, width, height };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  PDF text helpers                                                   */
/* ------------------------------------------------------------------ */

/** Escape special PDF string characters */
function pdfEsc(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    // Strip non-latin1 characters (standard fonts don't support them)
    .replace(/[^\x00-\xFF]/g, '');
}

/**
 * Approximate glyph width for Helvetica at size 1.
 * Standard Helvetica metrics: average ~550/1000 per char; spaces ~250/1000.
 * We use a simplified proportional model.
 */
function charWidth(ch: string): number {
  if (ch === ' ') return 0.25;
  if (ch === 'i' || ch === 'l' || ch === '!' || ch === '|' || ch === '.' || ch === ',' || ch === ':' || ch === ';' || ch === '\'') return 0.28;
  if (ch === 'm' || ch === 'w' || ch === 'M' || ch === 'W') return 0.72;
  if (ch >= 'A' && ch <= 'Z') return 0.65;
  return 0.52;
}

function textWidth(text: string, fontSize: number): number {
  let w = 0;
  for (const ch of text) w += charWidth(ch);
  return w * fontSize;
}

/**
 * Wrap text to fit within maxWidth at the given fontSize.
 * Returns an array of lines.
 */
function wrapText(text: string, fontSize: number, maxWidth: number): string[] {
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    if (para.trim() === '') {
      lines.push('');
      continue;
    }
    const words = para.split(/\s+/);
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (textWidth(testLine, fontSize) > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
  }

  return lines;
}

/* ------------------------------------------------------------------ */
/*  PDF builder                                                        */
/* ------------------------------------------------------------------ */

export interface StoryBookPage {
  pageNumber: number;
  title: string;
  text: string;
  illustrationUrl: string | null;
}

export interface StoryBookData {
  heroName: string;
  coverTitle: string;
  coverSubtitle: string;
  dedication: string | null;
  universeId: string;
  pages: StoryBookPage[];
}

/**
 * Generate a PDF buffer for a hero storybook.
 */
export async function generateStoryPdf(story: StoryBookData): Promise<Buffer> {
  // Pre-fetch all illustrations in parallel
  const imagePromises = story.pages.map((p) =>
    p.illustrationUrl ? fetchJpeg(p.illustrationUrl) : Promise.resolve(null),
  );
  const images = await Promise.all(imagePromises);

  // We build the PDF by collecting objects, then writing the byte stream.
  const objects: Array<{ id: number; content: Buffer }> = [];
  let nextId = 1;
  const alloc = () => nextId++;

  const addObj = (id: number, body: string) => {
    const buf = Buffer.from(`${id} 0 obj\n${body}\nendobj\n`, 'latin1');
    objects.push({ id, content: buf });
  };

  const addObjBinary = (id: number, dict: string, stream: Buffer) => {
    const header = Buffer.from(`${id} 0 obj\n${dict}\nstream\n`, 'latin1');
    const footer = Buffer.from('\nendstream\nendobj\n', 'latin1');
    objects.push({ id, content: Buffer.concat([header, stream, footer]) });
  };

  // ---- Allocate fixed IDs ----
  const catalogId = alloc();   // 1
  const pagesId = alloc();     // 2
  const fontHelvId = alloc();  // 3
  const fontBoldId = alloc();  // 4
  const fontSerifId = alloc(); // 5

  // ---- Fonts (standard 14, no embedding needed) ----
  addObj(fontHelvId, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  addObj(fontBoldId, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  addObj(fontSerifId, '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>');

  // ---- Build pages ----
  const pageIds: number[] = [];

  // Helper: create a page with content stream and optional image
  function buildPage(contentStr: string, image?: PdfImage | null): number {
    const pageId = alloc();
    const contentId = alloc();
    pageIds.push(pageId);

    const resources: string[] = [
      `/Font << /F1 ${fontHelvId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontSerifId} 0 R >>`,
    ];

    let fullContent = contentStr;

    if (image) {
      const imgId = alloc();
      // Embed JPEG as XObject
      addObjBinary(
        imgId,
        `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.data.length} >>`,
        image.data,
      );
      resources.push(`/XObject << /Img1 ${imgId} 0 R >>`);

      // Calculate image placement: fill width, maintain aspect ratio, centered in top portion
      const imgDisplayW = TEXT_W;
      const imgDisplayH = (image.height / image.width) * imgDisplayW;
      // Cap image height at 55% of page
      const maxImgH = PAGE_H * 0.55;
      const finalH = Math.min(imgDisplayH, maxImgH);
      const finalW = (finalH / imgDisplayH) * imgDisplayW;
      const imgX = MARGIN + (TEXT_W - finalW) / 2;
      const imgY = PAGE_H - MARGIN - finalH;

      fullContent = `q ${finalW} 0 0 ${finalH} ${imgX.toFixed(1)} ${imgY.toFixed(1)} cm /Img1 Do Q\n` + contentStr;
    }

    const streamBuf = Buffer.from(fullContent, 'latin1');
    addObjBinary(contentId, `<< /Length ${streamBuf.length} >>`, streamBuf);

    addObj(
      pageId,
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents ${contentId} 0 R /Resources << ${resources.join(' ')} >> >>`,
    );

    return pageId;
  }

  // ---- Cover page ----
  {
    const lines: string[] = [];
    // Background color (warm beige)
    lines.push('0.96 0.94 0.90 rg');
    lines.push(`0 0 ${PAGE_W} ${PAGE_H} re f`);

    // Decorative border
    lines.push('0.71 0.55 0.35 RG'); // bronze-ish
    lines.push('2 w');
    lines.push(`${MARGIN - 10} ${MARGIN - 10} ${PAGE_W - 2 * (MARGIN - 10)} ${PAGE_H - 2 * (MARGIN - 10)} re S`);

    // Title
    lines.push('0 0 0 rg');
    lines.push('BT');
    const titleText = story.coverTitle || `The Adventures of ${story.heroName}`;
    const titleSize = titleText.length > 30 ? 28 : 36;
    const titleLines = wrapText(titleText, titleSize, TEXT_W - 40);
    let titleY = PAGE_H / 2 + 60;
    for (const tl of titleLines) {
      const tx = (PAGE_W - textWidth(tl, titleSize)) / 2;
      lines.push(`/F3 ${titleSize} Tf ${tx.toFixed(1)} ${titleY.toFixed(1)} Td (${pdfEsc(tl)}) Tj`);
      titleY -= titleSize * 1.4;
    }

    // Subtitle
    if (story.coverSubtitle) {
      const subLines = wrapText(story.coverSubtitle, 16, TEXT_W - 60);
      let subY = titleY - 20;
      for (const sl of subLines) {
        const sx = (PAGE_W - textWidth(sl, 16)) / 2;
        lines.push(`/F1 16 Tf ${sx.toFixed(1)} ${subY.toFixed(1)} Td (${pdfEsc(sl)}) Tj`);
        subY -= 22;
      }
    }

    // Hero name
    {
      const heroLine = `Starring: ${story.heroName}`;
      const hx = (PAGE_W - textWidth(heroLine, 14)) / 2;
      lines.push(`/F2 14 Tf ${hx.toFixed(1)} ${(PAGE_H / 2 - 60).toFixed(1)} Td (${pdfEsc(heroLine)}) Tj`);
    }

    lines.push('ET');
    buildPage(lines.join('\n'));
  }

  // ---- Story pages ----
  for (let i = 0; i < story.pages.length; i++) {
    const pg = story.pages[i];
    const img = images[i] || null;

    const lines: string[] = [];

    // White background
    lines.push('1 1 1 rg');
    lines.push(`0 0 ${PAGE_W} ${PAGE_H} re f`);

    // If there's an image, text starts below it; otherwise from top
    const hasImage = !!img;
    const imgDisplayH = hasImage
      ? Math.min((img!.height / img!.width) * TEXT_W, PAGE_H * 0.55)
      : 0;
    const textStartY = hasImage
      ? PAGE_H - MARGIN - imgDisplayH - 20
      : PAGE_H - MARGIN - 10;

    lines.push('0 0 0 rg');
    lines.push('BT');

    // Page title
    let curY = textStartY;
    const pgTitleSize = 18;
    if (pg.title) {
      const tLines = wrapText(pg.title, pgTitleSize, TEXT_W);
      for (const tl of tLines) {
        lines.push(`/F2 ${pgTitleSize} Tf ${MARGIN} ${curY.toFixed(1)} Td (${pdfEsc(tl)}) Tj`);
        curY -= pgTitleSize * 1.4;
      }
      curY -= 8; // gap after title
    }

    // Story text
    const bodySize = 12;
    const bodyLeading = bodySize * 1.55;
    if (pg.text) {
      const bodyLines = wrapText(pg.text, bodySize, TEXT_W);
      for (const bl of bodyLines) {
        if (curY < MARGIN + 30) break; // stop before running off page
        lines.push(`/F1 ${bodySize} Tf ${MARGIN} ${curY.toFixed(1)} Td (${pdfEsc(bl)}) Tj`);
        curY -= bodyLeading;
      }
    }

    lines.push('ET');

    // Page number footer
    lines.push('BT');
    const pgNum = `${pg.pageNumber}`;
    const pnx = (PAGE_W - textWidth(pgNum, 10)) / 2;
    lines.push(`0.6 0.6 0.6 rg`);
    lines.push(`/F1 10 Tf ${pnx.toFixed(1)} ${(MARGIN - 20).toFixed(1)} Td (${pdfEsc(pgNum)}) Tj`);
    lines.push('ET');

    buildPage(lines.join('\n'), img);
  }

  // ---- Back cover: dedication + branding ----
  {
    const lines: string[] = [];
    // Beige background
    lines.push('0.96 0.94 0.90 rg');
    lines.push(`0 0 ${PAGE_W} ${PAGE_H} re f`);

    // Decorative border
    lines.push('0.71 0.55 0.35 RG');
    lines.push('2 w');
    lines.push(`${MARGIN - 10} ${MARGIN - 10} ${PAGE_W - 2 * (MARGIN - 10)} ${PAGE_H - 2 * (MARGIN - 10)} re S`);

    lines.push('0 0 0 rg');
    lines.push('BT');

    if (story.dedication) {
      // "Dedication" header
      const dedHeader = 'Dedication';
      const dhx = (PAGE_W - textWidth(dedHeader, 20)) / 2;
      lines.push(`/F3 20 Tf ${dhx.toFixed(1)} ${(PAGE_H / 2 + 80).toFixed(1)} Td (${pdfEsc(dedHeader)}) Tj`);

      // Dedication text
      const dedLines = wrapText(story.dedication, 14, TEXT_W - 80);
      let dy = PAGE_H / 2 + 40;
      for (const dl of dedLines) {
        const dx = (PAGE_W - textWidth(dl, 14)) / 2;
        lines.push(`/F3 14 Tf ${dx.toFixed(1)} ${dy.toFixed(1)} Td (${pdfEsc(dl)}) Tj`);
        dy -= 22;
      }
    }

    // Branding
    const brand = 'Made with TailorPic';
    const bx = (PAGE_W - textWidth(brand, 10)) / 2;
    lines.push(`0.6 0.6 0.6 rg`);
    lines.push(`/F1 10 Tf ${bx.toFixed(1)} ${(MARGIN + 20).toFixed(1)} Td (${pdfEsc(brand)}) Tj`);

    const site = 'tailorpic.com';
    const sx = (PAGE_W - textWidth(site, 9)) / 2;
    lines.push(`/F1 9 Tf ${sx.toFixed(1)} ${(MARGIN + 5).toFixed(1)} Td (${pdfEsc(site)}) Tj`);

    lines.push('ET');
    buildPage(lines.join('\n'));
  }

  // ---- Catalog ----
  addObj(catalogId, `<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  addObj(
    pagesId,
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`,
  );

  // ---- Assemble final PDF ----
  const header = Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'latin1');

  // Write objects and record offsets
  const offsets: Array<{ id: number; offset: number }> = [];
  let pos = header.length;
  const bodyParts: Buffer[] = [header];

  // Sort objects by ID for a clean xref table
  objects.sort((a, b) => a.id - b.id);

  for (const obj of objects) {
    offsets.push({ id: obj.id, offset: pos });
    bodyParts.push(obj.content);
    pos += obj.content.length;
  }

  // xref table
  const xrefOffset = pos;
  const xrefLines: string[] = [];
  xrefLines.push('xref');
  xrefLines.push(`0 ${nextId}`);
  xrefLines.push('0000000000 65535 f \r');

  // Build a map for quick lookup
  const offsetMap = new Map(offsets.map((o) => [o.id, o.offset]));
  for (let id = 1; id < nextId; id++) {
    const off = offsetMap.get(id) ?? 0;
    xrefLines.push(`${String(off).padStart(10, '0')} 00000 n \r`);
  }

  const trailer = [
    'trailer',
    `<< /Size ${nextId} /Root ${catalogId} 0 R >>`,
    'startxref',
    `${xrefOffset}`,
    '%%EOF',
  ].join('\n');

  bodyParts.push(Buffer.from(xrefLines.join('\n') + '\n' + trailer + '\n', 'latin1'));

  return Buffer.concat(bodyParts);
}
