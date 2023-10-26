export interface Rates {
  [key: string]: {
    currency_name: string;
    rate: string;
    rate_for_amount: string;
  };
}
