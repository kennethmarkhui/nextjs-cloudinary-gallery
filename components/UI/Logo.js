import Link from "next/link";
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <a className={classes.logo}>Logo</a>
      </Link>
    </div>
  );
};

export default Logo;
