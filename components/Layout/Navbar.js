import Link from "next/link";
import SearchBar from "../UI/SearchBar";

const Navbar = () => {
  console.log("Rendered Navbar");
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
