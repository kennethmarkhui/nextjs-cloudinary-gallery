import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../UI/Spinner";
import GalleyImage from "./GalleryImage";
import GalleryImageViewer from "./GalleryImageViewer";
// import { useEffect, useRef } from "react";
import classes from "./Gallery.module.css";

// https://github.com/xieranmaya/blog/issues/6
// https://codepen.io/jasonsturges/pen/pRdemq
const Gallery = (props) => {
  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));
  // console.log("Rendered Gallery");
  const { files, nextCursor, onLoadMore } = props;

  const [modal, setModal] = useState({
    isOpen: false,
    src: null,
  });

  const handleOpenModal = (src) => {
    setModal({ isOpen: true, src: src });
  };

  const handleCloseModal = useCallback(() => setModal({ isOpen: false }), []);

  return (
    <>
      <InfiniteScroll
        className={classes.gallery}
        dataLength={files.length}
        next={onLoadMore}
        hasMore={!!nextCursor}
        scrollThreshold={0.9}
        loader={<Spinner className={classes.icon} />}
        endMessage={<p>Yay! You have seen it all</p>}
      >
        {/* <p>{`Gallery Rendered ${renderCount.current} times`}</p> */}
        {files.map((item) => {
          const flexGrow = Math.round((item.width * 100) / item.height);
          const flexBasis = Math.round((item.width * 300) / item.height);
          const paddingBottom = Math.round((item.height / item.width) * 100.0);

          return (
            <GalleyImage
              key={item.id}
              src={item.thumbnailUrl}
              alt={item.name}
              url={item.url}
              name={item.name}
              // w={item.width}
              // h={item.height}
              style={{ flexGrow, flexBasis, paddingBottom }}
              lqip={item.lqipBase64}
              onOpenModal={handleOpenModal}
            />
          );
        })}
      </InfiniteScroll>

      {modal.isOpen && (
        <GalleryImageViewer src={modal.src} onHidden={handleCloseModal} />
      )}
    </>
  );
};

export default Gallery;
