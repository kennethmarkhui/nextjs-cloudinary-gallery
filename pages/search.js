import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageList from "../components/Image/ImageList";
import Filter from "../components/UI/Filter";

export default function Search() {
  const [items, setItems] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // console.log(router);
    if (!router.query.q || !router.isReady || router.asPath === router.pathname)
      return;
    console.log("search useeffect router", router);
    (async () => {
      try {
        const res = await fetch(`/api/gdrive${router.asPath}`);
        const data = await res.json();
        setItems(data.result.files);
        setPageToken(data.result.nextPageToken);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router]);

  const filterHandler = async (orderBy) => {
    console.log(`search orderBy ${orderBy ? "Ascending" : "Descending"}`);
    const { order, q } = router.query;
    const newQuery = orderBy ? { q } : { ...router.query, order: "desc" };
    // console.log("filterHandler ", newQuery);
    router.push({ query: newQuery });
  };

  const loadMoreHandler = async (token) => {
    try {
      const res = await fetch(
        `/api/gdrive${router.asPath}&nextPageToken=${token}`
      );
      const data = await res.json();
      setItems((prev) => [...prev, ...data.result.files]);
      setPageToken(data.result.nextPageToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p>searchpage</p>
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
