import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../UI/Spinner";
import FlexCard from "../UI/FlexCard";
import Modal from "../UI/Modal";
// import { useEffect, useRef } from "react";

// https://github.com/xieranmaya/blog/issues/6
// https://codepen.io/jasonsturges/pen/pRdemq
const Gallery = (props) => {
  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));
  console.log("Rendered Gallery");
  const { files, nextCursor, onLoadMore } = props;

  const [active, setActive] = useState(null); // item.public_id

  const [modal, setModal] = useState({
    isOpen: false,
    content: { id: null, src: null, w: null, h: null },
  });

  const handleSetActive = (id) => setActive(id);

  const handleOpenModal = ({ src, w, h }) => {
    setModal({ isOpen: true, content: { src, w, h } });
  };
  const handleCloseModal = () => setModal({ isOpen: false });

  const generateBlurUrl = (url) => {
    const transformations = "e_blur:2000,q_1";
    const blurUrl = url.split("/");
    blurUrl.splice(6, 0, transformations);
    return blurUrl.join("/");
  };

  return (
    <>
      <InfiniteScroll
        className="flex flex-wrap items-center justify-center after:content-[''] after:grow-[999999999]"
        dataLength={files.length}
        next={onLoadMore}
        hasMore={!!nextCursor}
        scrollThreshold={0.9}
        loader={<Spinner className="h-6 w-6" />}
        endMessage={<p>Yay! You have seen it all</p>}
      >
        {/* <p>{`Gallery Rendered ${renderCount.current} times`}</p> */}
        {files.map((item) => {
          const flexGrow = Math.round((item.width * 100) / item.height);
          const flexBasis = Math.round((item.width * 300) / item.height);
          const paddingBottom = Math.round((item.height / item.width) * 100.0);

          return (
            <FlexCard
              key={item.public_id}
              id={item.public_id}
              src={item.secure_url}
              alt={item.display_name}
              name={item.display_name}
              w={item.width}
              h={item.height}
              style={{ flexGrow, flexBasis, paddingBottom }}
              transformedUrl={generateBlurUrl(item.secure_url)}
              setActiveFlexCard={handleSetActive}
              active={active}
              openModal={handleOpenModal}
            />
          );
        })}
      </InfiniteScroll>

      <Modal modal={modal} onCloseModal={handleCloseModal} />
    </>
  );
};

export default Gallery;
