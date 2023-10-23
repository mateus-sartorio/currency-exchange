"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Provider } from "react-redux";
import { FavoriteCurrencies } from "./components/FavoriteCurrencies";
import store from "./store/store";

interface Currency {
  acronym: string;
  fullName: string;
}

interface Rates {
  [key: string]: {
    currency_name: string;
    rate: string;
    rate_for_amount: string;
  };
}

interface ExchangeData {
  amount: string;
  base_currency_code: string;
  base_currency_name: string;
  target_currency_code: string;
  rates: Rates;
  status: string;
  updated_date: string;
}

const API_KEY = "c27c9425a38679f734f1a6b278eec778a4d3045d";

export default function Home() {
  const [currencies, setCurrencies] = useState([] as Currency[]);

  const [originCurrency, setOriginCurrency] = useState("BRL");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setamount] = useState("10");

  const [exchangeData, setExchangeData] = useState({} as ExchangeData);

  async function getData() {
    const response = await fetch(`https://api.getgeoapi.com/v2/currency/list?api_key=${API_KEY}`);
    const data = await response.json();

    const newCurrencies = [];
    for (const c in data.currencies) {
      newCurrencies.push({ acronym: c, fullName: data.currencies[c] });
    }
    setCurrencies(newCurrencies);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=${API_KEY}&from=${originCurrency}&to=${targetCurrency}&amount=${amount}&format=json`);
    const data = await response.json();
    console.log(data);
    setExchangeData({ ...data, target_currency_code: targetCurrency });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Provider store={store}>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Value
            <input type="number" value={amount} onChange={(event: ChangeEvent<HTMLInputElement>) => setamount(event.target.value)} />
          </label>
          <label>
            From
            <select name="from" onChange={(event: ChangeEvent<HTMLSelectElement>) => setOriginCurrency(event.target.value)} value={originCurrency}>
              {currencies.map((currency) => (
                <option key={currency.acronym} value={currency.acronym}>
                  {currency.acronym} - {currency.fullName}
                </option>
              ))}
            </select>
          </label>
          <label>
            To
            <select name="to" onChange={(event: ChangeEvent<HTMLSelectElement>) => setTargetCurrency(event.target.value)} value={targetCurrency}>
              {currencies.map((currency) => (
                <option key={currency.acronym} value={currency.acronym}>
                  {currency.acronym} - {currency.fullName}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Convert</button>
        </form>
        {Object.keys(exchangeData).length > 0 && (
          <div>
            {exchangeData.amount} {exchangeData.base_currency_name} = {exchangeData.rates[exchangeData.target_currency_code].rate_for_amount} {exchangeData.rates[exchangeData.target_currency_code].currency_name}
          </div>
        )}

        <FavoriteCurrencies />
      </main>
    </Provider>
  );
}
