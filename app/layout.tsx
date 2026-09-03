import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lobelle.hu"),
  title: {
    default: "Lobelle – Titánium fülbelövő rendszerek és szakemberképzés",
    template: "%s | Lobelle",
  },
  description:
    "Implantátum minőségű, ASTM F136 szabványú Grade 23 titánium fülbelövő rendszerek és fül- és orrlyukasztó szakemberképzés. Az innovatív füllyukasztás új generációja.",
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: "Lobelle",
    title: "Lobelle – Titánium fülbelövő rendszerek és szakemberképzés",
    description:
      "Implantátum minőségű titánium fülbelövő rendszerek és füllyukasztó szakemberképzés. Biztonság, innováció, szakmaiság.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${lora.variable} ${poppins.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
