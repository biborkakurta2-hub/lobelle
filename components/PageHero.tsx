import type { ReactNode } from "react";

/** Belső oldalak fejléce: feliratka, Cormorant cím, hairline, bevezető. */
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
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-content px-5 py-20 text-center sm:px-7 md:py-24 lg:px-8">
        <span className="section-label">{label}</span>
        <h1 className="mt-4 font-serif text-5xl font-light leading-tight text-ink md:text-6xl">
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
