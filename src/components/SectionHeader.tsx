interface Props {
  num: string; // e.g. "01"
  title: string; // e.g. "About"
}

export default function SectionHeader({ num, title }: Props) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-xs text-violet-glow tracking-[0.15em]">
        {num}
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="flex-1 h-px bg-line-base" />
    </div>
  );
}
