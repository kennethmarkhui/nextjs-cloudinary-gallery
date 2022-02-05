import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../UI/Spinner";
import GalleyImage from "./GalleryImage";
import Modal from "../UI/Modal";
import GalleryImageViewer from "./GalleryImageViewer";
// import { useEffect, useRef } from "react";
import classes from "./Gallery.module.css";

// https://github.com/xieranmaya/blog/issues/6
// https://codepen.io/jasonsturges/pen/pRdemq
const Gallery = (props) => {
  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));
  console.log("Rendered Gallery");
  const { files, nextCursor, onLoadMore } = props;

  const [modal, setModal] = useState({
    isOpen: false,
    data: { src: null, w: null, h: null },
  });

  const handleOpenModal = ({ src, w, h }) => {
    setModal({ isOpen: true, data: { src, w, h } });
  };
  const handleCloseModal = () => setModal({ isOpen: false });

  const generateBlurUrl = (url) => {
    const transformations = "c_scale,e_blur:2000,f_webp,q_1,w_200";

    const blurUrl = url.split("/");
    blurUrl.splice(6, 0, transformations);
    return blurUrl.join("/");
  };

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
              key={item.public_id}
              src={item.secure_url}
              alt={item.display_name}
              name={item.display_name}
              w={item.width}
              h={item.height}
              style={{ flexGrow, flexBasis, paddingBottom }}
              transformedUrl={generateBlurUrl(item.secure_url)}
              onOpenModal={handleOpenModal}
            />
          );
        })}
      </InfiniteScroll>

      {modal.isOpen && (
        <Modal isOpen={modal.isOpen} onCloseModal={handleCloseModal}>
          <GalleryImageViewer
            src={modal.data.src}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default Gallery;
