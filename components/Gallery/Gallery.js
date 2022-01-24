import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../UI/Spinner";
import Img from "./Img";
// import { useEffect, useRef } from "react";

// https://github.com/xieranmaya/blog/issues/6
// https://codepen.io/jasonsturges/pen/pRdemq

const Gallery = (props) => {
  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));
  console.log("Rendered Gallery");
  const { files, nextCursor, onLoadMore } = props;
  return (
    <InfiniteScroll
      className="flex flex-wrap after:content-[''] after:grow-[999999999]"
      dataLength={files.length}
      next={onLoadMore}
      hasMore={!!nextCursor}
      scrollThreshold={0.9}
      loader={<Spinner className="h-6 w-6" />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {/* <p>{`Gallery Rendered ${renderCount.current} times`}</p> */}
      {files.map((item) => {
        return <Img key={item.public_id} item={item} />;
      })}
    </InfiniteScroll>
  );
};

export default Gallery;
