"use client";

import { FavoriteCurrencies } from "./components/FavoriteCurrencies";
import { CurrencyExchangeCard } from "./components/CurrencyExchangeCard";

export default function Home() {
  return (
    <main>
      <CurrencyExchangeCard />
      <FavoriteCurrencies />
    </main>
  );
}
