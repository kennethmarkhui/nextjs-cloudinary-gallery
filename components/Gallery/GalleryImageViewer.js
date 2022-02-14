import { useEffect, useRef } from "react";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.min.css";

import classes from "./GalleryImageViewer.module.css";

// https://github.com/fengyuanchen/viewerjs
const GalleryImageViewer = ({ src, onHidden }) => {
  const imgWrapperRef = useRef();

  useEffect(() => {
    const viewer = new Viewer(imgWrapperRef.current, {
      toolbar: {
        rotateLeft: true,
        zoomOut: true,
        zoomIn: true,
        rotateRight: true,
      },
      navbar: false,
      keyboard: false,
      focus: false,
      slideOnTouch: false,
      minZoomRatio: 0.1,
      maxZoomRatio: 1,
      hidden: () => onHidden(),
    });

    viewer.show();

    return () => viewer.destroy();
  }, [onHidden]);

  return (
    <div ref={imgWrapperRef} className={classes.img__wrapper}>
      <img src={src} alt="" />
    </div>
  );
};

export default GalleryImageViewer;
