/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minden oldal statikusan generált (SSG) — Vercelre külön beállítás nélkül deployolható.
  reactStrictMode: true,
  images: {
    // A termékfotók alapesetben letöltve, a /public/termekek mappából érkeznek.
    // Ez a beállítás akkor kell, ha a scrape --no-images kapcsolóval futott,
    // és a képek közvetlenül a lobelle.hu-ról töltődnek be.
    remotePatterns: [
      { protocol: "https", hostname: "lobelle.hu" },
      { protocol: "https", hostname: "www.lobelle.hu" },
      { protocol: "https", hostname: "cdn.shoprenter.hu" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
};

export default nextConfig;
