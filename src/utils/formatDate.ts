const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

export function formatDate(value?: string): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.slice(0, 10));
  if (!m) return value;
  const month = Number(m[2]);
  if (month < 1 || month > 12) return value;
  return `${Number(m[3])} ${MONTHS[month - 1]} ${m[1]}`;
}
