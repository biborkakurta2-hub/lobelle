import type { ReactNode } from "react";

/** Belső oldalak fejléce: feliratka, szerifes cím, hairline, bevezető. */
export default function PageHero({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-hairline/50 bg-cream-deep/60">
      <div className="mx-auto max-w-content px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <span className="section-label">{label}</span>
        <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
          {title}
        </h1>
        <div className="gold-hairline mx-auto mt-6" aria-hidden="true" />
        {children ? (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-faded">{children}</p>
        ) : null}
      </div>
    </section>
  );
}
