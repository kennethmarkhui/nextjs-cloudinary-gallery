import Logo from "../UI/Logo";
import Avatar from "../UI/Avatar";

import classes from "./Links.module.css";

const Links = () => {
  return (
    <div className={classes.links}>
      <Logo title="Gallery" />
      <Avatar src="/avatar.svg" url={process.env.NEXT_PUBLIC_EXTERNAL_URL} />
    </div>
  );
};

export default Links;
