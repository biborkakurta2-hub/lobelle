import type { ReactNode } from "react";

/**
 * Dupla keretes kártya sarokjelöléssel — a brosúra termékkereteinek mintájára.
 * Külső hairline keret + belső finom keret + bronz sarokjelek.
 */
export default function FramedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border border-hairline bg-white p-2 ${className}`}>
      {/* Bronz sarokjelölések */}
      <span aria-hidden="true" className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-bronze" />
      <span aria-hidden="true" className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-bronze" />
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-bronze" />
      <span aria-hidden="true" className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-bronze" />
      <div className="h-full border border-hairline/60 p-6">{children}</div>
    </div>
  );
}
