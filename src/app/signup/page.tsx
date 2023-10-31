"use client";

import { FormEvent } from "react";

export default function SignIn() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name
          <input type="text" name="first-name" />
        </label>
        <label>
          Last Name
          <input type="text" name="last-name" />
        </label>
      </div>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Username
        <input type="text" name="username" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Create Account</button>
    </form>
  );
}
