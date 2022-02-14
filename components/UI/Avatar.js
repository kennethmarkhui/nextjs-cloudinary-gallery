import Image from "next/image";
import classes from "./Avatar.module.css";

const Avatar = ({
  src = "/vercel.svg",
  alt = "Avatar",
  w = 48,
  h = 48,
  url = "/",
}) => {
  return (
    <div>
      <a href={url} rel="noopener noreferrer">
        <Image
          src={src}
          alt={alt}
          className={classes.img}
          width={w}
          height={h}
        />
      </a>
    </div>
  );
};

export default Avatar;
