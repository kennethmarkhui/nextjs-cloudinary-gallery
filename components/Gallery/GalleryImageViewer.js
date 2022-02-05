import { useState } from "react";
import Image from "next/image";
import { XIcon } from "@heroicons/react/solid";
import Button from "../UI/Button";

import classes from "./GalleryImageViewer.module.css";

const GalleryImageViewer = ({ onCloseModal, src }) => {
  const [showMenu, setShowMenu] = useState(true);

  // TODO implement setTimeout onMouseMove

  return (
    <div className={classes.image__viewer}>
      <div className={`${showMenu ? "flex" : "hidden"} ${classes.menu}`}>
        <Button onClick={onCloseModal}>
          <XIcon className={classes.icon} />
        </Button>
      </div>
      <Image
        className={classes.image}
        src={src}
        alt=""
        layout="fill"
        objectFit="contain"
        quality={100}
        // width={modal.data.w}
        // height={modal.data.h}
      />
      {/* <div className="bg-slate-600 w-full h-full"></div> */}
    </div>
  );
};

export default GalleryImageViewer;
