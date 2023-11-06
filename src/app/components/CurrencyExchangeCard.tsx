import { ChangeEvent, FormEvent, useState } from "react";
import { ExchangeData } from "../types/ExchangeData";
import { CurreciesSelector } from "./CurreciesSelector";

const API_KEY = "c27c9425a38679f734f1a6b278eec778a4d3045d";

export function CurrencyExchangeCard() {
  const [originCurrency, setOriginCurrency] = useState("BRL");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setamount] = useState("10");

  const [exchangeData, setExchangeData] = useState({} as ExchangeData);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=${API_KEY}&from=${originCurrency}&to=${targetCurrency}&amount=${amount}&format=json`);
    const data = await response.json();
    setExchangeData({ ...data, target_currency_code: targetCurrency });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Value
          <input type="number" value={amount} onChange={(event: ChangeEvent<HTMLInputElement>) => setamount(event.target.value)} />
        </label>
        <label>
          From
          <CurreciesSelector name="from" onChange={setOriginCurrency} value={originCurrency} />
        </label>
        <label>
          To
          <CurreciesSelector name="to" onChange={setTargetCurrency} value={targetCurrency} />
        </label>
        <button type="submit">Convert</button>
      </form>
      {Object.keys(exchangeData).length > 0 && (
        <div>
          {exchangeData.amount} {exchangeData.base_currency_name} = {exchangeData.rates[exchangeData.target_currency_code].rate_for_amount} {exchangeData.rates[exchangeData.target_currency_code].currency_name}
        </div>
      )}
    </>
  );
}
