import Link from "next/link";
import { useRef, useEffect } from "react";
import Filter from "../UI/Filter";
import SearchBar from "../UI/SearchBar";

const Navbar = () => {
  const renderCount = useRef(1);
  useEffect(() => (renderCount.current = renderCount.current + 1));
  return (
    <>
      <p>{`Navbar Rendered ${renderCount.current} times`}</p>
      <Link href="/">
        <a>Logo</a>
      </Link>
      <SearchBar />
      <Filter />
    </>
  );
};

export default Navbar;
