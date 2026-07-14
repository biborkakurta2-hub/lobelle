"use client";

import { useState, type FormEvent } from "react";
import { submitForm, EMAIL_PATTERN } from "@/lib/forms";

type Errors = Partial<Record<"name" | "email" | "gdpr" | "submit", string>>;

/**
 * Újrahasznosítható érdeklődő űrlap (privát oktatás, szakmai regisztráció).
 * Tegező hangnem — a képzési oldalak célközönségéhez igazítva.
 */
export default function InterestForm({
  formName,
  messageLabel = "Üzenet",
  submitLabel = "Érdeklődés elküldése",
}: {
  formName: string;
  messageLabel?: string;
  submitLabel?: string;
}) {
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
      nextErrors.email = "Kérjük, érvényes email címet adj meg.";
    }
    if (!gdpr) nextErrors.gdpr = "A folytatáshoz el kell fogadnod az adatkezelési tájékoztatót.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    const ok = await submitForm({
      urlap: formName,
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
      setErrors({ submit: "A küldés nem sikerült. Kérjük, próbáld újra később, vagy hívj minket telefonon." });
    }
  }

  if (sent) {
    return (
      <div className="border border-hairline bg-white p-10 text-center" role="status">
        <span className="section-label">Köszönjük</span>
        <p className="mt-4 font-serif text-2xl text-ink">Érdeklődésedet megkaptuk.</p>
        <p className="mt-3 text-sm leading-relaxed text-faded">
          Hamarosan felvesszük veled a kapcsolatot a megadott elérhetőségeken.
        </p>
      </div>
    );
  }

  const id = formName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm text-ink">
            Név <span className="text-bronze" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
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
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm text-ink">
            Email cím <span className="text-bronze" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
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

      <div>
        <label htmlFor={`${id}-phone`} className="mb-1.5 block text-sm text-ink">
          Telefonszám <span className="text-faded">(opcionális)</span>
        </label>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className="form-field" />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm text-ink">
          {messageLabel}
        </label>
        <textarea id={`${id}-message`} name="message" rows={4} className="form-field resize-y" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-faded">
          <input
            type="checkbox"
            name="gdpr"
            required
            aria-invalid={Boolean(errors.gdpr)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#C07F3F]"
          />
          <span>
            Elolvastam és elfogadom az adatkezelési tájékoztatót, hozzájárulok adataim
            kapcsolatfelvétel céljából történő kezeléséhez.{" "}
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

      <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
        {sending ? "Küldés folyamatban" : submitLabel}
      </button>
    </form>
  );
}
