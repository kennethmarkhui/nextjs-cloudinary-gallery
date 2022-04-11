import { useState } from "react";
import Image from "next/image";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./GalleryImage.module.css";

const GalleyImage = ({
  src,
  alt,
  url,
  name,
  // w,
  // h,
  style,
  lqip,
  onOpenModal,
}) => {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        unoptimized // enable to opt out of vercel image optimization usage in favor of 3rd party image provider(e.g.: cloudinary)
        className={`${classes.img} ${!isLoading && classes.img__loaded}`} // https://github.com/leerob/image-gallery-supabase-tailwind-nextjs
        src={src}
        alt={alt}
        layout="fill"
        // objectFit="cover"
        placeholder="blur"
        blurDataURL={lqip}
        quality={25}
        onLoadingComplete={() => setIsLoading(false)}
      />

      {/* Overlay */}
      <div className={`${active ? "flex" : "hidden"} ${classes.overlay}`}>
        <div className={classes.overlay__top}>
          <Button onClick={() => onOpenModal(url)}>
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
