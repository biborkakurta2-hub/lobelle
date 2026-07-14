/**
 * FORMSPREE PLACEHOLDER — cserélendő a valós végpontra!
 *
 * Regisztrálj a https://formspree.io oldalon, hozz létre űrlapot, majd az ott
 * kapott azonosítót írd ide (pl. "https://formspree.io/f/abcdwxyz").
 * Amíg a placeholder szerepel itt, az űrlapok nem küldenek hálózati kérést,
 * csak a sikeres kitöltést igazolják vissza a látogatónak.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/FORMSPREE_ID_PLACEHOLDER";

export function isFormspreeConfigured(): boolean {
  return !FORMSPREE_ENDPOINT.includes("PLACEHOLDER");
}

export async function submitForm(data: Record<string, string>): Promise<boolean> {
  if (!isFormspreeConfigured()) {
    // Placeholder mód: nincs hálózati kérés, a beküldést sikeresnek tekintjük.
    return true;
  }
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
