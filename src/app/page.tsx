"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Provider } from "react-redux";
import { FavoriteCurrencies } from "./components/FavoriteCurrencies";
import { store } from "./store/store";

import { Currency } from "./types/Currency";
import { Rates } from "./types/Rates";
import { ExchangeData } from "./types/ExchangeData";
import { CurreciesSelector } from "./components/CurreciesSelector";
import { CurrencyExchangeCard } from "./components/CurrencyExchangeCard";

export default function Home() {
  return (
    <main>
      <CurrencyExchangeCard />
      <FavoriteCurrencies />
    </main>
  );
}
