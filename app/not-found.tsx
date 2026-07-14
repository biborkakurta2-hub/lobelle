import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-content px-4 py-32 text-center sm:px-6 lg:px-8">
      <span className="section-label">404</span>
      <h1 className="mt-4 font-serif text-4xl font-medium text-ink">
        Ez az oldal nem található
      </h1>
      <div className="gold-hairline mx-auto mt-6" aria-hidden="true" />
      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-faded">
        A keresett oldal nem létezik vagy elköltözött. Kezdd a főoldalról, vagy nézd meg a
        kollekciónkat.
      </p>
      <Link href="/" className="btn-primary mt-10 inline-block">
        Vissza a főoldalra
      </Link>
    </section>
  );
}
