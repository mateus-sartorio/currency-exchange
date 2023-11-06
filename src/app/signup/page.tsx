"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignIn() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/users/singup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, username, password }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success === true) {
      router.push("/login");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name
          <input type="text" name="first-name" onChange={(event) => setFirstName(event.target.value)} />
        </label>
        <label>
          Last Name
          <input type="text" name="last-name" onChange={(event) => setLastName(event.target.value)} />
        </label>
      </div>
      <label>
        Email
        <input type="email" name="email" onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Username
        <input type="text" name="username" onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password
        <input type="text" name="password" onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Create Account</button>
    </form>
  );
}
