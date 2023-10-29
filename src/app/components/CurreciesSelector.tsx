import { ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCurrenciesList, setAllCurrenciesList } from "../store/appStateReducer";

const API_KEY = "c27c9425a38679f734f1a6b278eec778a4d3045d";

interface propsType {
  onChange: (payload: string) => any;
  value: string;
  name: string;
}

export function CurreciesSelector(props: propsType) {
  const { onChange, value, name } = props;

  const currencies = useSelector(selectAllCurrenciesList);
  const dispatch = useDispatch();

  async function getData() {
    if (currencies.length > 0) {
      return;
    }

    const response = await fetch(`https://api.getgeoapi.com/v2/currency/list?api_key=${API_KEY}`);
    const data = await response.json();

    const newCurrencies = [];
    for (const c in data.currencies) {
      newCurrencies.push({ acronym: c, fullName: data.currencies[c] });
    }
    dispatch(setAllCurrenciesList(newCurrencies));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <select name={name} onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)} value={value}>
      {currencies.length > 0 &&
        currencies.map((currency) => (
          <option key={currency.acronym} value={currency.acronym}>
            {currency.acronym} - {currency.fullName}
          </option>
        ))}
    </select>
  );
}
