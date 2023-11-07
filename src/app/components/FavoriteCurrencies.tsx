import { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addFavoriteCurrency, selectEmail, selectFavoriteCurrencies, selectPassword, selectReferenceCurrency, setFavoriteCurrencies, setReferenceCurrency } from "../store/userInfoReducer";
import { CurreciesSelector } from "./CurreciesSelector";
import FavoriteCurrencyItem from "./FavoriteCurrencyItem";

export function FavoriteCurrencies() {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const favoriteCurrencies = useSelector(selectFavoriteCurrencies);
  const referenceCurrency = useSelector(selectReferenceCurrency);
  const dispatch = useDispatch();

  const [newCurrency, setNewCurrency] = useState("");

  async function addNewFavoriteCurrncy(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        favoriteCurrencies,
      }),
    });

    const data = await response.json();

    dispatch(setFavoriteCurrencies(data.user.favoriteCurrencies));
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
        {favoriteCurrencies.map((currency: string) => (
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
