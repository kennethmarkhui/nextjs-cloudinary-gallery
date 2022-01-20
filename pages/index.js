import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageList from "../components/Image/ImageList";
import Filter from "../components/UI/Filter";
import { getFiles } from "../lib/cloudinary";

export default function Home(props) {
  // console.log(props);
  console.log("Rendered Home");

  const router = useRouter();

  const [items, setItems] = useState(props.resources);
  const [nextCursor, setnextCursor] = useState(props.nextCursor);
  const [isLoading, setIsLoading] = useState(false);

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
          const res = await fetch(`/api/cloudinary${router.asPath}`);
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

  const filterHandler = (orderBy) => {
    console.log(`home orderBy ${orderBy ? "Ascending" : "Descending"}`);

    let newQuery;
    const { order, search } = router.query;
    if (router.query.search) {
      newQuery = order ? { search } : { ...router.query, order: "desc" };
    }
    if (!router.query.search) {
      newQuery = order ? "" : { order: "desc" };
    }
    router.push({ query: newQuery });
  };

  const loadMoreHandler = async (token) => {
    console.log("loadMoreHandler ran");
    const newQuery = `${
      router.asPath !== "/"
        ? `${router.asPath}&nextCursor=${token}`
        : `/?nextCursor=${token}`
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
      {isLoading && <h4>Loading...</h4>}
      {!isLoading && (
        <>
          <Filter onFilter={filterHandler} orderQuery={router.query.order} />
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
