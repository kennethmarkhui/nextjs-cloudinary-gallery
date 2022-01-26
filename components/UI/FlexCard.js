import Image from "next/image";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import Button from "./Button";
import classes from "./FlexCard.module.css";

const FlexCard = ({
  id,
  src,
  alt,
  name,
  style,
  transformedUrl,
  setActiveFlexCard,
  active,
}) => {
  return (
    <figure
      onMouseEnter={() => setActiveFlexCard(id)}
      onMouseLeave={() => setActiveFlexCard(null)}
      className={classes.flexcard}
      style={{
        flexGrow: style.flexGrow,
        flexBasis: style.flexBasis,
      }}
    >
      <i
        className={classes.i}
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

      {/* Overlay */}
      <div
        className={`${active === id ? "flex" : "hidden"} ${classes.overlay}`}
      >
        <div className={classes.overlay_top}>
          <Button>
            <ArrowsExpandIcon className={classes.icon} />
          </Button>
        </div>
        <div className={classes.overlay_bottom}>
          <div className={classes.overlay_bottom_name}>{name}</div>
        </div>
      </div>
    </figure>
  );
};

export default FlexCard;
