import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../UI/Spinner";
import Img from "./Img";
// import { useEffect, useRef } from "react";

const ImageList = (props) => {
  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));
  console.log("Rendered ImageList");
  const { files, nextCursor, onLoadMore } = props;
  return (
    <InfiniteScroll
      dataLength={files.length}
      next={onLoadMore}
      hasMore={!!nextCursor}
      loader={<Spinner />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {/* <p>{`ImageList Rendered ${renderCount.current} times`}</p> */}
      {files.map((item) => {
        return <Img key={item.public_id} item={item} />;
      })}
    </InfiniteScroll>
  );
};

export default ImageList;
