import type { ReactNode } from "react";

/**
 * Lágy fehér kártya lekerekített sarkokkal — a Beauty Forum arculat
 * kártyaformája. (Korábban dupla keret sarokjelöléssel.)
 */
export default function FramedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`soft-card p-8 ${className}`}>
      {children}
    </div>
  );
}
