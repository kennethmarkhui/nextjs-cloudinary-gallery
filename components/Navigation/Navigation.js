import Links from "./Links";
import Search from "./Search/Search";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <Links />
      <Search />
    </nav>
  );
};

export default Navigation;
