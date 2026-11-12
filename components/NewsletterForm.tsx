"use client";

import { useState, type FormEvent } from "react";
import { submitForm, EMAIL_PATTERN } from "@/lib/forms";

type Errors = Partial<Record<"name" | "email" | "gdpr" | "submit", string>>;

/** Hírlevél feliratkozás: név + email + GDPR checkbox. */
export default function NewsletterForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const gdpr = data.get("gdpr") === "on";

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "A név megadása kötelező.";
    if (!email) {
      nextErrors.email = "Az email cím megadása kötelező.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Kérjük, érvényes email címet adjon meg.";
    }
    if (!gdpr) nextErrors.gdpr = "A feliratkozáshoz el kell fogadnia az adatkezelési tájékoztatót.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    const ok = await submitForm({ urlap: "Hírlevél feliratkozás", nev: name, email });
    setSending(false);

    if (ok) {
      setSent(true);
      form.reset();
    } else {
      setErrors({ submit: "A feliratkozás nem sikerült. Kérjük, próbálja újra később." });
    }
  }

  if (sent) {
    return (
      <p className="soft-card px-6 py-5 text-center text-sm text-ink" role="status">
        Köszönjük a feliratkozást. Hamarosan jelentkezünk az első hírlevéllel.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nl-name" className="sr-only">
            Név
          </label>
          <input
            id="nl-name"
            name="name"
            type="text"
            placeholder="Név"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            className="form-field"
          />
          {errors.name ? (
            <p className="mt-1.5 text-xs text-bronze-dark" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="nl-email" className="sr-only">
            Email cím
          </label>
          <input
            id="nl-email"
            name="email"
            type="email"
            placeholder="Email cím"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            className="form-field"
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-bronze-dark" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <label className="mt-4 flex items-start gap-3 text-left text-xs text-faded">
        <input
          type="checkbox"
          name="gdpr"
          required
          aria-invalid={Boolean(errors.gdpr)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#CC7D18]"
        />
        <span>
          Hozzájárulok, hogy a Lobelle hírlevelet küldjön a megadott email címemre. A
          feliratkozás bármikor visszavonható.
        </span>
      </label>
      {errors.gdpr ? (
        <p className="mt-1.5 text-xs text-bronze-dark" role="alert">
          {errors.gdpr}
        </p>
      ) : null}
      {errors.submit ? (
        <p className="mt-1.5 text-xs text-bronze-dark" role="alert">
          {errors.submit}
        </p>
      ) : null}

      <button type="submit" disabled={sending} className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto">
        {sending ? "Küldés folyamatban" : "Feliratkozom"}
      </button>
    </form>
  );
}
