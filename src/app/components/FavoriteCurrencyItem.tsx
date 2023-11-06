import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavoriteCurrency, selectReferenceCurrency } from "../store/userInfoReducer";
import { ExchangeData } from "../types/ExchangeData";

interface propsType {
  acronym: string;
}

const API_KEY = "c27c9425a38679f734f1a6b278eec778a4d3045d";

export default function FavoriteCurrencyItem(props: propsType) {
  const { acronym } = props;

  const dispatch = useDispatch();
  const referenceCurrency = useSelector(selectReferenceCurrency);

  const [exchange, setExchange] = useState("");

  async function getExchange() {
    const response = await fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=${API_KEY}&from=${referenceCurrency}&to=${acronym}&amount=1&format=json`);
    const data: ExchangeData = await response.json();
    setExchange(data.rates[acronym].rate);
  }

  useEffect(() => {
    getExchange();
  }, []);

  return (
    <div>
      <div>{acronym}</div>
      <div>{exchange}</div>
      <i onClick={() => dispatch(removeFavoriteCurrency(acronym))} />
    </div>
  );
}
