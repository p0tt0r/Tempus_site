export function formatFileInfo(file?: { ext?: string; size?: number } | null): string {
  if (!file) return '';
  const ext = file.ext ? file.ext.replace(/^\./, '').toUpperCase() : '';
  let size = '';
  if (typeof file.size === 'number' && file.size > 0) {
    size =
      file.size >= 1024
        ? `${(file.size / 1024).toFixed(1).replace('.', ',')} МБ`
        : `${Math.round(file.size)} КБ`;
  }
  return [ext, size].filter(Boolean).join(', ');
}
