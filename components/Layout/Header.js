// import { useRef, useEffect } from "react";
import Logo from "../UI/Logo";
import Search from "../UI/Search";

import classes from "./Header.module.css";

const Navbar = () => {
  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));
  return (
    <header className={classes.header}>
      {/* <p>{`Navbar Rendered ${renderCount.current} times`}</p> */}
      <div className={classes.links}>
        <Logo />
        <Logo />
      </div>

      <div className={classes.search_outer_div}>
        <Search />
      </div>
    </header>
  );
};

export default Navbar;
