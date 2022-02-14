import Link from "next/link";
import classes from "./Logo.module.css";

const Logo = ({ title = "Logo" }) => {
  return (
    <div>
      <Link href="/">
        <a className={classes.logo}>{title}</a>
      </Link>
    </div>
  );
};

export default Logo;
