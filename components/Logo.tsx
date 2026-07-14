import Image from "next/image";

/*
 * Végleges logó: a brosúrából kinyert, átlátszó hátterű bronz logó.
 *  - /public/logo.png       – teljes logó (szimbólum + felirat + alcím)
 *  - /public/logo-mark.png  – csak a fül-szimbólum (a főoldali hero használja)
 * Ha később nagyobb felbontású mesterfájl érkezik, elég a két PNG-t lecserélni.
 */

type LogoProps = {
  /** "full" = szimbólum + felirat + alcím, "mark" = csak a szimbólum */
  variant?: "full" | "mark";
  className?: string;
};

export default function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/logo-mark.png"
        alt=""
        aria-hidden="true"
        width={741}
        height={1194}
        className={className}
        priority
      />
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Lobelle – Titan Ear Piercing Technologies"
      width={2271}
      height={1941}
      className={className}
      priority
    />
  );
}
