"use client";

import { useState, type FormEvent } from "react";
import { submitForm, EMAIL_PATTERN } from "@/lib/forms";

type Errors = Partial<Record<"name" | "email" | "gdpr" | "submit", string>>;

/**
 * Kapcsolatfelvételi űrlap magyar hibaüzenetekkel.
 * Név és email kötelező, telefon opcionális, GDPR checkbox kötelező.
 */
export default function ContactForm() {
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
    const message = String(data.get("message") ?? "").trim();
    const gdpr = data.get("gdpr") === "on";

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "A név megadása kötelező.";
    if (!email) {
      nextErrors.email = "Az email cím megadása kötelező.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Kérjük, érvényes email címet adjon meg.";
    }
    if (!gdpr) nextErrors.gdpr = "A folytatáshoz el kell fogadnia az adatkezelési tájékoztatót.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    const ok = await submitForm({
      urlap: "Kapcsolatfelvétel",
      nev: name,
      email,
      telefon: phone,
      uzenet: message,
    });
    setSending(false);

    if (ok) {
      setSent(true);
      form.reset();
    } else {
      setErrors({ submit: "Az üzenet küldése nem sikerült. Kérjük, próbálja újra később, vagy hívjon minket telefonon." });
    }
  }

  if (sent) {
    return (
      <div className="soft-card p-10 text-center" role="status">
        <span className="section-label">Köszönjük</span>
        <p className="mt-4 font-serif text-3xl font-light text-ink">Üzenetét megkaptuk.</p>
        <p className="mt-3 text-sm leading-relaxed text-faded">
          Munkatársunk hamarosan felveszi Önnel a kapcsolatot a megadott elérhetőségek egyikén.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="field-label">
          Név <span className="text-bronze" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="form-field"
        />
        {errors.name ? (
          <p id="contact-name-error" className="mt-1.5 text-xs text-bronze-dark" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="field-label">
          Email cím <span className="text-bronze" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="form-field"
        />
        {errors.email ? (
          <p id="contact-email-error" className="mt-1.5 text-xs text-bronze-dark" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-phone" className="field-label">
          Telefonszám <span className="text-faded">(opcionális)</span>
        </label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className="form-field" />
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Üzenet
        </label>
        <textarea id="contact-message" name="message" rows={5} className="form-field resize-y" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-faded">
          <input
            type="checkbox"
            name="gdpr"
            required
            aria-invalid={Boolean(errors.gdpr)}
            aria-describedby={errors.gdpr ? "contact-gdpr-error" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#CC7D18]"
          />
          <span>
            Elolvastam és elfogadom az adatkezelési tájékoztatót, hozzájárulok adataim
            kapcsolatfelvétel céljából történő kezeléséhez.{" "}
            <span className="text-bronze" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.gdpr ? (
          <p id="contact-gdpr-error" className="mt-1.5 text-xs text-bronze-dark" role="alert">
            {errors.gdpr}
          </p>
        ) : null}
      </div>

      {errors.submit ? (
        <p className="text-sm text-bronze-dark" role="alert">
          {errors.submit}
        </p>
      ) : null}

      <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
        {sending ? "Küldés folyamatban" : "Üzenet küldése"}
      </button>
    </form>
  );
}
