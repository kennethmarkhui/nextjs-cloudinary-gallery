import { useRef, useEffect } from "react";
import Headroom from "headroom.js";
import Navigation from "../Navigation/Navigation";

import classes from "./Header.module.css";

const Header = () => {
  const headerRef = useRef();

  useEffect(() => {
    const headroom = new Headroom(headerRef.current);
    headroom.init();
  }, []);

  return (
    <header className={classes.header} ref={headerRef}>
      <Navigation />
    </header>
  );
};

export default Header;
