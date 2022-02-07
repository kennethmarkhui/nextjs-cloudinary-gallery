import { useState } from "react";
import Image from "next/image";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./GalleryImage.module.css";

const GalleyImage = ({ src, alt, name, w, h, style, lqip, onOpenModal }) => {
  const [active, setActive] = useState(false);

  return (
    <Card
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
      className={classes.card}
      style={{ flexGrow: style.flexGrow, flexBasis: style.flexBasis }}
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
        blurDataURL={lqip}
        quality={25}
      />
      {/* <div className="w-full h-full"></div> */}

      {/* Overlay */}
      <div className={`${active ? "flex" : "hidden"} ${classes.overlay}`}>
        <div className={classes.overlay__top}>
          <Button onClick={() => onOpenModal({ src, w, h })}>
            <ArrowsExpandIcon className={classes.icon} />
          </Button>
        </div>
        <div className={classes.overlay__bottom}>
          <div className={classes.overlay__bottom__name}>{name}</div>
        </div>
      </div>
    </Card>
  );
};

export default GalleyImage;
