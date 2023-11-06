import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectFirstName, selectLastName } from "../store/userInfoReducer";
export function Navbar() {
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);

  return (
    <nav>
      <h2>
        Hello {firstName} {lastName}
      </h2>
      <Link href="/">
        <i>Money Logo</i>
      </Link>
      <Link href="/signup">Sign in</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
