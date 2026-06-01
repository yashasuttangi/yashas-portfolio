import type { PortfolioContent } from '../data/types';
import { shared } from '../data/shared';

interface Props {
  content: PortfolioContent;
}

export default function Contact({ content }: Props) {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 md:px-12 py-32">
      <div className="text-center border-t border-line-base pt-24">
        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[0.95]">
          {content.contactHeading.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="gradient-text">{content.contactHeading.split(' ').slice(-1)}</span>
        </h2>

        <p className="text-ink-secondary text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          {content.contactSub}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href={shared.social.email} className="px-6 py-3 rounded-lg bg-violet-mid text-white font-medium text-sm hover:bg-violet-glow transition-all hover:-translate-y-0.5">✉ Email me</a>
          <a href={shared.social.linkedin} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-line-base text-ink-secondary font-medium text-sm hover:border-line-bright hover:text-ink-primary hover:bg-white/[0.03] transition-all">LinkedIn ↗</a>
          <a href={shared.social.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-line-base text-ink-secondary font-medium text-sm hover:border-line-bright hover:text-ink-primary hover:bg-white/[0.03] transition-all">GitHub ↗</a>
          <a href={shared.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-line-base text-ink-secondary font-medium text-sm hover:border-line-bright hover:text-ink-primary hover:bg-white/[0.03] transition-all">Resume ↗</a>
        </div>

        <p className="font-mono text-[11px] text-ink-faint tracking-wider mt-16">
          YASHAS UTTANGI · BOSTON · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}