import Image from "next/image";
import classes from "./FlexCard.module.css";

const FlexCard = ({ src, alt, style, transformedUrl }) => {
  return (
    <figure
      className={classes.flexcard}
      style={{
        flexGrow: style.flexGrow,
        flexBasis: style.flexBasis,
      }}
    >
      <i
        className={classes.img_container}
        style={{ paddingBottom: `${style.paddingBottom}%` }}
      />
      <Image
        className={classes.img}
        src={src}
        alt={alt}
        layout="fill"
        placeholder="blur"
        blurDataURL={transformedUrl}
      />
    </figure>
  );
};

export default FlexCard;
