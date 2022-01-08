import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageList from "../components/Image/ImageList";
import SearchBar from "../components/UI/SearchBar";
import Filter from "../components/UI/Filter";
import { getAllImages } from "../utils/drive";

export default function Home(props) {
  // console.log(props);

  const router = useRouter();

  const [items, setItems] = useState(props.files);
  const [pageToken, setPageToken] = useState(props.nextPageToken);
  const [queryString, setQueryString] = useState({ query: "", mode: "" });

  useEffect(() => {
    if (!router.isReady || router.asPath === "/") return;
    // console.log("router changed", router.asPath);
    setQueryString({ query: router.asPath, mode: "search" });
  }, [router.asPath, router.isReady]);

  useEffect(() => {
    console.log("useEffect queryString before empty check");
    if (queryString.query === "" && queryString.mode === "") return;
    console.log("useEffect queryString after empty check");
    if (queryString.mode === "search") {
      (async () => {
        const res = await fetch(`/api/drive${queryString.query}`);
        const data = await res.json();
        setItems(data.result.files);
        setPageToken(data.result.nextPageToken);
      })();
    }
    if (queryString.mode === "load-more") {
      (async () => {
        const res = await fetch(`/api/drive${queryString.query}`);
        const data = await res.json();
        setItems((prev) => [...prev, ...data.result.files]);
        setPageToken(data.result.nextPageToken);
      })();
    }
  }, [queryString]);

  const searchHandler = async (text) => {
    console.log(text);

    await router.push({
      pathname: "/",
      query: { search: text },
    });
  };

  const filterHandler = (order) => {
    console.log(order);
  };

  const loadMoreHandler = async (token) => {
    // console.log(token);

    const query = `${
      router.asPath !== "/"
        ? `${router.asPath}&token=${token}`
        : `/?token=${token}`
    }`;

    setQueryString({ query: query, mode: "load-more" });
  };

  return (
    <>
      <SearchBar onSearch={searchHandler} query={router.query.search} />
      <Filter onFilter={filterHandler} />
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
