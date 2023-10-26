import Link from "next/link";

export function Navbar() {
  return (
    <nav>
      <Link href="/">
        <i>Money Logo</i>
      </Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
