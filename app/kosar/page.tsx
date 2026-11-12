import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Kosár",
  description:
    "A kosár tartalma és megrendelés. Implantátum minőségű titánium ékszerek és professzionális füllyukasztó eszközök a Lobelle kínálatából.",
  openGraph: {
    title: "Kosár | Lobelle",
    description: "A kosár tartalma és megrendelés.",
  },
};

export default function CartPage() {
  return (
    <>
      <PageHero label="Webshop" title="Kosár">
        Nézd át a kiválasztott darabokat, majd add meg a szállítási adatokat a megrendeléshez.
      </PageHero>

      <section className="mx-auto max-w-content px-5 py-16 sm:px-7 md:py-24 lg:px-8">
        <CartView />
      </section>
    </>
  );
}
