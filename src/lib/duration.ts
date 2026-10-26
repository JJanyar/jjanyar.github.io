// LinkedIn-style dates: "Apr 2025 - Present · 1 yr 7 mos"

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parse(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return { y, m };
}

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function formatMonth(ym: string) {
  const { y, m } = parse(ym);
  return `${MONTHS[m - 1]} ${y}`;
}

// Counts both the start and end month, like LinkedIn does.
export function formatDuration(start: string, end?: string) {
  const s = parse(start);
  const e = parse(end ?? currentMonth());
  const total = Math.max(1, e.y * 12 + e.m - (s.y * 12 + s.m) + 1);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}

export function formatRange(start: string, end?: string) {
  return `${formatMonth(start)} - ${end ? formatMonth(end) : 'Present'} · ${formatDuration(start, end)}`;
}
