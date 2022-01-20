import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageList from "../components/Image/ImageList";
import { getFiles } from "../lib/cloudinary";

export default function Home(props) {
  // console.log(props);

  const router = useRouter();

  const [items, setItems] = useState(props.resources);
  const [nextCursor, setnextCursor] = useState(props.nextCursor);
  const [isLoading, setIsLoading] = useState(false);

  const renderCount = useRef(1);
  useEffect(() => (renderCount.current = renderCount.current + 1));

  useEffect(() => {
    if (!router.isReady || router.asPath === router.pathname) {
      console.log("home useEffect router === '/'", router);
      setItems(props.resources);
      setnextCursor(props.nextCursor);
      return;
    }
    if (!router.isReady || router.asPath !== router.pathname) {
      console.log("home useEffect router !== '/'", router);
      setIsLoading(true);
      (async () => {
        try {
          const res = await fetch(
            `/api/cloudinary${router.asPath.substring(1)}`
          );
          const data = await res.json();
          setItems(data.resources);
          setnextCursor(data.next_cursor);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
      return;
    }
  }, [router, props]);

  const loadMoreHandler = async (token) => {
    console.log("loadMoreHandler ran");
    const newQuery = `${
      router.asPath !== "/"
        ? `${router.asPath.substring(1)}&nextCursor=${token}`
        : `?nextCursor=${token}`
    }`;

    try {
      const res = await fetch(`/api/cloudinary${newQuery}`);
      const data = await res.json();
      setItems((prev) => [...prev, ...data.resources]);
      setnextCursor(data.next_cursor);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p>{`Home Rendered ${renderCount.current} times`}</p>
      {isLoading && <h4>Loading...</h4>}
      {!isLoading && (
        <>
          <InfiniteScroll
            dataLength={items.length}
            next={() => loadMoreHandler(nextCursor)}
            hasMore={!!nextCursor}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <ImageList files={items} />
          </InfiniteScroll>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const { resources, next_cursor: nextCursor } = await getFiles(5);

  return {
    props: {
      resources,
      nextCursor,
    },
  };
}
