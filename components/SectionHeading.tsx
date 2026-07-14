import type { ReactNode } from "react";

/**
 * Szekciófejléc a brosúra mintájára: kiskapitális bronz feliratka,
 * szerifes cím, vékony arany elválasztó vonal.
 */
export default function SectionHeading({
  label,
  title,
  children,
  align = "center",
  as: Tag = "h2",
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <span className="section-label">{label}</span>
      <Tag className="mt-4 font-serif text-3xl font-medium leading-tight text-ink md:text-4xl">
        {title}
      </Tag>
      <div className={`gold-hairline mt-6 ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
      {children ? (
        <p
          className={`mt-6 max-w-2xl text-base leading-relaxed text-faded ${
            centered ? "mx-auto" : ""
          }`}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}
