import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageList from "../components/Image/ImageList";
import Filter from "../components/UI/Filter";
import { getAllImages } from "../lib/gdrive";

export default function Home(props) {
  // console.log(props);

  const router = useRouter();

  const [items, setItems] = useState(props.files);
  const [pageToken, setPageToken] = useState(props.nextPageToken);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if (!router.isReady || router.asPath === router.pathname) return;
    console.log("home useEffect router", router);
    setIsLoading(true);
    (async () => {
      const res = await fetch(`/api/gdrive${router.asPath}`);
      const data = await res.json();
      setItems(data.result.files);
      setPageToken(data.result.nextPageToken);
      setIsLoading(false);
    })();
  }, [router]);

  const filterHandler = (orderBy) => {
    console.log(`home orderBy ${orderBy ? "Ascending" : "Descending"}`);

    router.push({ query: orderBy ? "" : { order: "desc" } });
  };

  const loadMoreHandler = async (token) => {
    const newQuery = `${
      router.asPath !== "/"
        ? `${router.asPath}&nextPageToken=${token}`
        : `/?nextPageToken=${token}`
    }`;

    const res = await fetch(`/api/gdrive${newQuery}`);
    const data = await res.json();
    setItems((prev) => [...prev, ...data.result.files]);
    setPageToken(data.result.nextPageToken);
  };

  return (
    <>
      {isLoading && <h4>Loading...</h4>}
      {!isLoading && (
        <>
          <Filter onFilter={filterHandler} orderQuery={router.query.order} />
          <InfiniteScroll
            dataLength={items.length}
            next={() => loadMoreHandler(pageToken)}
            hasMore={!!pageToken}
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
  const { files, nextPageToken } = await getAllImages(5);

  return {
    props: {
      files,
      nextPageToken,
    },
  };
}
