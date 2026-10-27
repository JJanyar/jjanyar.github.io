// /llms.txt: a plain summary of the portfolio for AI assistants (https://llmstxt.org).
// Built from the same data as the site, so it never goes out of date.
import type { APIRoute } from 'astro';
import { contacts, experience, profile, projects, skillGroups, socials } from '../data/site';
import { formatRange } from '../lib/duration';

export const GET: APIRoute = ({ site }) => {
  const abs = (href: string) => new URL(href, site).href;

  const jobs = experience.flatMap((c) =>
    c.roles.map(
      (r) => `- ${r.title} at ${c.name}${c.place ? `, ${c.place}` : ''} (${formatRange(r.start, r.end)}): ${r.description}`,
    ),
  );

  const links = [
    ...contacts.map((c) => `- ${c.label}: ${c.href.startsWith('http') ? c.href : c.text}`),
    ...socials
      .filter((s) => s.href.startsWith('http') && !contacts.some((c) => c.label === s.label))
      .map((s) => `- ${s.label}: ${s.href}`),
  ];

  const text = `# ${profile.name}

> ${profile.name} is an IT Developer at Holysmartphone, based in ${profile.location}, the Netherlands: building and maintaining holysmartphone.nl, working on Tripframe, and studying Software Development at ROC Nova College.

## Experience

${jobs.join('\n')}

## Skills

${skillGroups.map((g) => `- ${g.label}: ${g.skills.map((s) => s.name).join(', ')}`).join('\n')}

## Projects

${projects
  .map((p) => `- [${p.title}](${p.site?.href ?? p.source}): ${p.description}${p.source ? ` Source: ${p.source}` : ''}`)
  .join('\n')}

## Contact

${links.join('\n')}

## Optional

- [CV (PDF)](${abs('/CV_Janyar.pdf')})
- [Portfolio](${abs('/')})
`;

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
