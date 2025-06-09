export const extractFirstImageSrc = (html: string): string | null => {
  if (!html) return null;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const img = doc.querySelector("img");
  return img?.getAttribute("src") ?? null;
};
