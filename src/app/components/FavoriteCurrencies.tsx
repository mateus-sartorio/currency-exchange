import { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addFavoriteCurrency, selectFavoriteCurrencies, selectReferenceCurrency, setReferenceCurrency } from "../store/userInfoReducer";
import { CurreciesSelector } from "./CurreciesSelector";
import FavoriteCurrencyItem from "./FavoriteCurrencyItem";

export function FavoriteCurrencies() {
  const currencies = useSelector(selectFavoriteCurrencies);
  const referenceCurrency = useSelector(selectReferenceCurrency);
  const dispatch = useDispatch();

  const [newCurrency, setNewCurrency] = useState("");

  function addNewFavoriteCurrncy(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(addFavoriteCurrency(newCurrency));
    setNewCurrency("");
  }

  return (
    <>
      <h2>Favorite Currencies</h2>

      <form>
        <label>
          <CurreciesSelector name="reference-currency" onChange={(argument: string) => dispatch(setReferenceCurrency(argument))} value={referenceCurrency} />
        </label>
      </form>

      <ul>
        {currencies.map((currency: string) => (
          <FavoriteCurrencyItem key={uuidv4()} acronym={currency} />
        ))}
      </ul>

      <form onSubmit={addNewFavoriteCurrncy}>
        <label>
          <CurreciesSelector name="add-currency" onChange={setNewCurrency} value={newCurrency} />
        </label>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
