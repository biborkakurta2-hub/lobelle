/**
 * Elegáns kép-placeholder: lágyan lekerekített felület vonalas
 * szimbólummal. A valós fotók feltöltésekor next/image-re cserélendő.
 */
export default function ImagePlaceholder({
  label = "Termékfotó helye",
  aspect = "aspect-square",
}: {
  label?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`flex ${aspect} w-full flex-col items-center justify-center gap-3 rounded-card bg-cream-deep`}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 40 40" className="h-9 w-9 text-sand" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <rect x="4" y="7" width="32" height="26" rx="3" />
        <circle cx="14" cy="16" r="3" />
        <path d="M4 28l9-8 7 6 6-5 10 9" />
      </svg>
      <span className="text-xs uppercase tracking-label text-faded/70">{label}</span>
    </div>
  );
}
