import { useRef, useEffect } from "react";
import Headroom from "headroom.js";
import Logo from "../UI/Logo";
import Search from "../UI/Search";

import classes from "./Header.module.css";

const Header = () => {
  const headerRef = useRef();

  useEffect(() => {
    console.log("headroom");
    const headroom = new Headroom(headerRef.current);
    headroom.init();
  }, []);

  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));
  return (
    <header className={classes.header} ref={headerRef}>
      {/* <p>{`Header Rendered ${renderCount.current} times`}</p> */}
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

export default Header;
