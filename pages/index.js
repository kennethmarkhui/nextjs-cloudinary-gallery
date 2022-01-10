import { useRouter } from "next/router";
import Link from "next/link";
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
    if (!router.isReady || router.asPath === "/" || !router.query.search) {
      // console.log("useEffect router changed not search");
      setQueryString({
        query: router.query.order ? router.asPath : "",
        mode: "default",
      });
      return;
    }
    // console.log("useEffect router changed", router.asPath);
    setQueryString({ query: router.asPath, mode: "search" });
  }, [router.asPath, router.isReady, router.query]);

  useEffect(() => {
    // console.log("useEffect queryString before empty check");
    if (queryString.query === "" && queryString.mode === "") return;
    // console.log("useEffect queryString after empty check");
    // console.log(queryString.mode);
    (async () => {
      const res = await fetch(`/api/drive${queryString.query}`);
      const data = await res.json();
      if (queryString.mode === "search" || queryString.mode === "default") {
        setItems(data.result.files);
      }
      if (queryString.mode === "load-more") {
        setItems((prev) => [...prev, ...data.result.files]);
      }
      setPageToken(data.result.nextPageToken);
    })();
  }, [queryString]);

  const searchHandler = async (text) => {
    // console.log('searchhandler ', text);

    await router.push({
      pathname: "/",
      query: { search: text },
    });
  };

  const filterHandler = async (order) => {
    // console.log(`orderBy ${order ? "Ascending" : "Descending"}`);

    let newQuery;

    if (router.query.search) {
      const { order, search } = router.query;
      newQuery = order ? { search } : { ...router.query, order: "desc" };
    } else {
      newQuery = order ? "" : { order: "desc" };
    }

    // console.log(newQuery);
    await router.push({ query: newQuery });
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
      <Link href="/">
        <a>Logo</a>
      </Link>
      <SearchBar onSearch={searchHandler} query={router.query.search} />
      <Filter onFilter={filterHandler} query={router.query.order} />
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
