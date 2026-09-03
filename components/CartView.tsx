"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/shop";
import { submitForm, EMAIL_PATTERN } from "@/lib/forms";

type Errors = Partial<Record<"name" | "email" | "address" | "gdpr" | "submit", string>>;

/**
 * Kosár és megrendelés.
 *
 * A megrendelés a Formspree űrlapon keresztül emailben érkezik meg — így
 * fizetési szolgáltató nélkül is működő rendelési folyamat.
 *
 * SHOPIFY-INTEGRÁCIÓ: a "Megrendelés elküldése" gomb helyére a Shopify
 * checkout átirányítása kerül (cart.checkoutUrl), az űrlap pedig elhagyható.
 */
export default function CartView() {
  const { lines, total, count, setQuantity, remove, clear } = useCart();
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const gdpr = data.get("gdpr") === "on";

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "A név megadása kötelező.";
    if (!email) {
      nextErrors.email = "Az email cím megadása kötelező.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Kérjük, érvényes email címet adjon meg.";
    }
    if (!address) nextErrors.address = "A szállítási cím megadása kötelező.";
    if (!gdpr) nextErrors.gdpr = "A megrendeléshez el kell fogadnia az adatkezelési tájékoztatót.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const items = lines
      .map(
        (line) =>
          `${line.product.name} — ${line.quantity} db × ${formatPrice(line.product.price)} = ${formatPrice(
            (line.product.price ?? 0) * line.quantity
          )}`
      )
      .join("\n");

    setSending(true);
    const ok = await submitForm({
      urlap: "Megrendelés",
      nev: name,
      email,
      telefon: phone,
      szallitasi_cim: address,
      megjegyzes: note,
      tetelek: items,
      vegosszeg: formatPrice(total),
    });
    setSending(false);

    if (ok) {
      setSent(true);
      clear();
    } else {
      setErrors({
        submit: "A megrendelés küldése nem sikerült. Kérjük, próbálja újra, vagy hívjon minket telefonon.",
      });
    }
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl border border-hairline bg-white p-12 text-center" role="status">
        <span className="section-label">Köszönjük</span>
        <p className="mt-5 font-serif text-3xl text-ink">Megrendelését megkaptuk.</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-faded">
          Munkatársunk hamarosan felveszi Önnel a kapcsolatot a rendelés visszaigazolásához és a
          szállítás egyeztetéséhez.
        </p>
        <Link href="/" className="btn-primary mt-10 inline-block">
          Vissza a főoldalra
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl border border-hairline bg-white p-12 text-center">
        <span className="section-label">Üres kosár</span>
        <p className="mt-5 font-serif text-2xl text-ink">Még nincs termék a kosárban.</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-faded">
          Böngéssz a kollekcióban, és tedd kosárba a kiválasztott darabokat.
        </p>
        <Link href="/termekek/gyerek-ekszerek" className="btn-primary mt-10 inline-block">
          Irány a kollekció
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
      {/* Tételek */}
      <div>
        <h2 className="font-serif text-2xl text-ink">A kosár tartalma</h2>
        <div className="gold-hairline mt-5" aria-hidden="true" />

        <ul className="mt-8 divide-y divide-hairline/60 border-y border-hairline/60">
          {lines.map((line) => (
            <li key={line.product.id} className="flex gap-5 py-6">
              <div className="relative h-24 w-24 shrink-0 border border-hairline bg-cream-deep">
                {line.product.images[0] ? (
                  <Image
                    src={line.product.images[0]}
                    alt={line.product.name}
                    fill
                    sizes="6rem"
                    className="object-contain p-2"
                  />
                ) : null}
              </div>

              <div className="flex flex-1 flex-col">
                <Link
                  href={`/termekek/${line.product.category}/${line.product.slug}`}
                  className="font-serif text-lg text-ink transition-colors hover:text-bronze"
                >
                  {line.product.name}
                </Link>
                <p className="mt-1 text-sm text-faded">{formatPrice(line.product.price)}</p>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
                  <div className="flex items-center border border-hairline bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                      className="px-3 py-1.5 text-faded transition-colors hover:text-bronze"
                      aria-label={`${line.product.name}: mennyiség csökkentése`}
                    >
                      <span aria-hidden="true">−</span>
                    </button>
                    <span className="w-8 text-center text-sm text-ink">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                      className="px-3 py-1.5 text-faded transition-colors hover:text-bronze"
                      aria-label={`${line.product.name}: mennyiség növelése`}
                    >
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.product.id)}
                    className="text-xs uppercase tracking-label text-faded transition-colors hover:text-bronze"
                  >
                    Eltávolítom
                  </button>
                </div>
              </div>

              <p className="shrink-0 font-serif text-lg text-bronze">
                {formatPrice((line.product.price ?? 0) * line.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={clear}
            className="text-xs uppercase tracking-label text-faded transition-colors hover:text-bronze"
          >
            Kosár ürítése
          </button>
          <p className="font-serif text-2xl text-ink">
            Végösszeg: <span className="text-bronze">{formatPrice(total)}</span>
          </p>
        </div>
      </div>

      {/* Megrendelő űrlap */}
      <div>
        <h2 className="font-serif text-2xl text-ink">Megrendelés</h2>
        <div className="gold-hairline mt-5" aria-hidden="true" />
        <p className="mt-6 text-sm leading-relaxed text-faded">
          Add meg az adataidat, és elküldjük a visszaigazolást a szállítás részleteivel.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="order-name" className="mb-1.5 block text-sm text-ink">
              Név <span className="text-bronze" aria-hidden="true">*</span>
            </label>
            <input id="order-name" name="name" type="text" autoComplete="name" required className="form-field" />
            {errors.name ? (
              <p className="mt-1.5 text-xs text-bronze-dark" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="order-email" className="mb-1.5 block text-sm text-ink">
              Email cím <span className="text-bronze" aria-hidden="true">*</span>
            </label>
            <input id="order-email" name="email" type="email" autoComplete="email" required className="form-field" />
            {errors.email ? (
              <p className="mt-1.5 text-xs text-bronze-dark" role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="order-phone" className="mb-1.5 block text-sm text-ink">
              Telefonszám <span className="text-faded">(opcionális)</span>
            </label>
            <input id="order-phone" name="phone" type="tel" autoComplete="tel" className="form-field" />
          </div>

          <div>
            <label htmlFor="order-address" className="mb-1.5 block text-sm text-ink">
              Szállítási cím <span className="text-bronze" aria-hidden="true">*</span>
            </label>
            <textarea
              id="order-address"
              name="address"
              rows={3}
              autoComplete="street-address"
              required
              className="form-field resize-y"
              placeholder="Irányítószám, város, utca, házszám"
            />
            {errors.address ? (
              <p className="mt-1.5 text-xs text-bronze-dark" role="alert">
                {errors.address}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="order-note" className="mb-1.5 block text-sm text-ink">
              Megjegyzés
            </label>
            <textarea id="order-note" name="note" rows={3} className="form-field resize-y" />
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-faded">
              <input type="checkbox" name="gdpr" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#C07F3F]" />
              <span>
                Elolvastam és elfogadom az adatkezelési tájékoztatót és az ÁSZF-et.{" "}
                <span className="text-bronze" aria-hidden="true">*</span>
              </span>
            </label>
            {errors.gdpr ? (
              <p className="mt-1.5 text-xs text-bronze-dark" role="alert">
                {errors.gdpr}
              </p>
            ) : null}
          </div>

          {errors.submit ? (
            <p className="text-sm text-bronze-dark" role="alert">
              {errors.submit}
            </p>
          ) : null}

          <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
            {sending ? "Küldés folyamatban" : "Megrendelés elküldése"}
          </button>

          <p className="text-xs leading-relaxed text-faded">
            A megrendelés elküldése után munkatársunk visszaigazolja a rendelést és egyezteti a
            fizetés és a szállítás részleteit.
          </p>
        </form>
      </div>
    </div>
  );
}
