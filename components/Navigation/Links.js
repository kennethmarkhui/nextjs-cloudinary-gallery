import Logo from "../UI/Logo";
import Avatar from "../UI/Avatar";

import classes from "./Links.module.css";

const Links = () => {
  return (
    <div className={classes.links}>
      <Logo title="Gallery" />
      <Avatar src="/avatar.webp" url="https://huichingye.netlify.app" />
    </div>
  );
};

export default Links;
