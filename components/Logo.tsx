/*
 * PLACEHOLDER LOGÓ — cserélendő a végleges fájlra!
 *
 * A végleges, átlátszó hátterű bronz logót a /public/logo.png útvonalra kell
 * feltölteni, majd ezt a komponenst lecserélni egy next/image hívásra:
 *
 *   import Image from "next/image";
 *   <Image src="/logo.png" alt="Lobelle – Titan Ear Piercing Technologies" width={180} height={120} />
 *
 * Addig ez az SVG változat a brosúra logóját idézi: fül-sziluett szikrával,
 * "lobelle" szerifes felirat és kiskapitális alcím.
 */

type LogoProps = {
  /** "full" = szimbólum + felirat + alcím, "mark" = csak a szimbólum */
  variant?: "full" | "mark";
  className?: string;
};

export default function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 60 80"
        className={className}
        role="img"
        aria-label="Lobelle szimbólum"
        fill="none"
      >
        <EarSymbol />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 240 96"
      className={className}
      role="img"
      aria-label="Lobelle – Titan Ear Piercing Technologies"
      fill="none"
    >
      <g transform="translate(105 2) scale(0.42)">
        <EarSymbol />
      </g>
      <text
        x="120"
        y="66"
        textAnchor="middle"
        fill="#C07F3F"
        fontFamily="var(--font-lora), Georgia, serif"
        fontSize="34"
        fontWeight="500"
      >
        lobelle
      </text>
      <text
        x="120"
        y="86"
        textAnchor="middle"
        fill="#C07F3F"
        fontFamily="var(--font-poppins), Arial, sans-serif"
        fontSize="8.2"
        letterSpacing="2.6"
      >
        TITAN EAR PIERCING TECHNOLOGIES
      </text>
    </svg>
  );
}

/** Fül-sziluett négyágú szikrával — a brosúra címlapszimbóluma nyomán. */
function EarSymbol() {
  return (
    <>
      <path
        d="M22 66c-8-6-14-16-14-28C8 21 19 9 33 9s24 11 24 28c0 10-5 16-10 21-4 4-6 8-6 13"
        stroke="#C07F3F"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M20 52l2.6 6.4L29 61l-6.4 2.6L20 70l-2.6-6.4L11 61l6.4-2.6L20 52z"
        fill="#C07F3F"
      />
    </>
  );
}
