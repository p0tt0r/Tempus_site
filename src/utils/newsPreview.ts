export function getPreview(text?: string, title?: string, length = 160): string {
  if (!text) return '';

  let result = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/[*_>`]/g, '')
    .replace(/-\s/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const t = title?.trim();
  if (t && result.toLowerCase().startsWith(t.toLowerCase())) {
    result = result.slice(t.length).replace(/^[\s\p{P}]+/u, '');
  }

  if (result.length <= length) return result;

  const cut = result.slice(0, length);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s\p{P}]+$/u, '') + '…';
}
