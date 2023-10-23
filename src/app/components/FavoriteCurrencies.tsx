import { useState, FormEvent, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCurrency, removeCurrency, selectCurrencies } from "../store/currenciesReducer";

export function FavoriteCurrencies() {
  const currencies = useSelector(selectCurrencies);
  const dispatch = useDispatch();

  const [newCurrency, setNewCurrency] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(addCurrency(newCurrency));
    setNewCurrency("");
  }

  return (
    <>
      <h2>Favorite Currencies</h2>
      <ul>
        {currencies.map((currency: string) => (
          <li key={currency}>
            {currency} <i onClick={() => dispatch(removeCurrency(currency))}>-</i>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <input type="text" value={newCurrency} onChange={(event: ChangeEvent<HTMLInputElement>) => setNewCurrency(event.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
