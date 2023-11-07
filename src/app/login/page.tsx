"use client";

import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setFirstName, setLastName, setEmail, setUsername, setReferenceCurrency, setFavoriteCurrencies, setPassword } from "../store/userInfoReducer";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const response = await fetch(`http://localhost:3000/api/users/login?email=${formEmail}&password=${formPassword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);

    const { firstName, lastName, username, password, email, referenceCurrency, favoriteCurrencies } = data.user;

    if (data.success === true) {
      dispatch(setFirstName(firstName));
      dispatch(setLastName(lastName));
      dispatch(setEmail(email));
      dispatch(setUsername(username));
      dispatch(setPassword(password));
      dispatch(setReferenceCurrency(referenceCurrency));
      dispatch(setFavoriteCurrencies(favoriteCurrencies));

      router.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" name="email" onChange={(event) => setFormEmail(event.target.value)} />
      </label>
      <label>
        Password
        <input type="text" name="password" onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
