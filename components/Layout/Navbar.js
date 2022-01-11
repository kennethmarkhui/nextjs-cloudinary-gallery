import Link from "next/link";
import SearchBar from "../UI/SearchBar";

const Navbar = () => {
  return (
    <>
      <Link href="/">
        <a>Logo</a>
      </Link>
      <SearchBar />
    </>
  );
};

export default Navbar;
