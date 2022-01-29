import Image from "next/image";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import Button from "./Button";
import classes from "./FlexCard.module.css";

const FlexCard = ({
  id,
  src,
  alt,
  name,
  w,
  h,
  style,
  transformedUrl,
  setActiveFlexCard,
  active,
  openModal,
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
        // objectFit="cover"
        placeholder="blur"
        blurDataURL={transformedUrl}
        quality={25}
      />

      {/* Overlay */}
      <div
        className={`${active === id ? "flex" : "hidden"} ${classes.overlay}`}
      >
        <div className={classes.overlay_top}>
          <Button onClick={() => openModal({ src, w, h })}>
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
