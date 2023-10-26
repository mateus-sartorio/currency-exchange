import { Rates } from "./Rates";

export interface ExchangeData {
  amount: string;
  base_currency_code: string;
  base_currency_name: string;
  target_currency_code: string;
  rates: Rates;
  status: string;
  updated_date: string;
}
