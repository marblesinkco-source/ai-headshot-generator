/**
 * Runtime Manrope loader for next/og ImageResponse.
 * Fetches the Google Fonts CSS (with a UA that yields TTF), extracts the font URL,
 * and returns the binary. Returns undefined on failure so callers fall back to sans-serif.
 */
export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700 | 800;
  style: 'normal';
};

async function loadWeight(weight: 400 | 700 | 800): Promise<OgFont | undefined> {
  try {
    const cssRes = await fetch(
      `https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&display=swap`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1' } }
    );
    if (!cssRes.ok) return undefined;
    const css = await cssRes.text();
    const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!match) return undefined;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return undefined;
    return { name: 'Manrope', data: await fontRes.arrayBuffer(), weight, style: 'normal' };
  } catch {
    return undefined;
  }
}

export async function loadManropeFonts(): Promise<OgFont[]> {
  const fonts = await Promise.all([loadWeight(400), loadWeight(700)]);
  return fonts.filter((f): f is OgFont => Boolean(f));
}
