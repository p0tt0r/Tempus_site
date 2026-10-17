export type ProgramFact = { value: string; label: string };
export type Program = { anchor: string; title: string; summary: string; facts: ProgramFact[] };

const SUMMARY_MAX = 220;

export function programAnchor(index: number): string {
  return `program-${index + 1}`;
}

function plural(n: number, one: string, few: string, many: string): string {
  const m100 = n % 100;
  const m10 = n % 10;
  if (m100 >= 11 && m100 <= 14) return many;
  if (m10 === 1) return one;
  if (m10 >= 2 && m10 <= 4) return few;
  return many;
}

function cleanMarkdown(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*#{1,6}\s/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/[*_>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getTitle(heading: string): string {
  const quoted = heading.match(/«([^»]+)»/);
  if (quoted) return quoted[1].trim();
  const name = heading
    .replace(/\s+/g, ' ')
    .replace(/^Программа\s*/i, '')
    .replace(/^(профессиональной переподготовки|повышения квалификации)\s*/i, '')
    .replace(/,?\s*объ[её]мом.*$/i, '')
    .trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getSummary(body: string): string {
  const text = cleanMarkdown(body);
  if (!text) return '';
  const colon = text.indexOf(':');
  const dot = text.search(/[.!?](\s|$)/);
  let result: string;
  if (colon !== -1 && (dot === -1 || colon < dot)) result = text.slice(0, colon) + '.';
  else if (dot !== -1) result = text.slice(0, dot + 1);
  else result = text;
  if (result.length <= SUMMARY_MAX) return result;
  const cut = result.slice(0, SUMMARY_MAX);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s\p{P}]+$/u, '') + '…';
}

const FORMS: Record<string, string> = {
  'очно-заочной': 'Очно-заочно',
  'очной': 'Очно',
  'заочной': 'Заочно',
  'дистанционной': 'Дистанционно',
};

function getFacts(text: string): ProgramFact[] {
  const facts: ProgramFact[] = [];

  const hours = text.match(/(\d+)\s*час/i);
  if (hours) {
    const n = Number(hours[1]);
    facts.push({ value: `${n} ${plural(n, 'час', 'часа', 'часов')}`, label: 'объём программы' });
  }

  const term = text.match(/Продолжительность обучения[^–—\n]*[–—]\s*([^\n]+)/i);
  const termValue = term?.[1].trim().replace(/[.\s]+$/, '');
  if (termValue) facts.push({ value: termValue, label: 'продолжительность' });

  const form = text.match(/([\p{L}-]+)\s+форме/iu);
  const formValue = form && FORMS[form[1].toLowerCase()];
  if (formValue) facts.push({ value: formValue, label: 'форма обучения' });

  if (/(?<!\p{L})диплом(?!\p{L})/iu.test(text)) facts.push({ value: 'Диплом', label: 'о переподготовке' });
  else if (/(?<!\p{L})удостоверение(?!\p{L})/iu.test(text)) facts.push({ value: 'Удостоверение', label: 'о повышении квалификации' });

  return facts;
}

export function parsePrograms(markdown?: string | null): Program[] {
  if (!markdown) return [];
  const parts = markdown.replace(/\r\n?/g, '\n').split(/^# /m).slice(1);
  return parts.map((part, index) => {
    const nl = part.indexOf('\n');
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    const body = nl === -1 ? '' : part.slice(nl + 1);
    return {
      anchor: programAnchor(index),
      title: getTitle(heading),
      summary: getSummary(body),
      facts: getFacts(part),
    };
  });
}
