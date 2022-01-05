import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageList from "../components/Image/ImageList";
import ImageSearch from "../components/Image/ImageSearch";
import { getAllImages } from "../utils/drive";

export default function Home(props) {
  // console.log(props);

  const router = useRouter();

  const [items, setItems] = useState(props.files);
  const [pageToken, setPageToken] = useState(props.nextPageToken);

  useEffect(() => {
    if (!router.isReady || router.asPath === "/") return;
    // console.log("router changed", router.asPath);

    const fetchData = async () => {
      const res = await fetch(`/api/drive${router.asPath}`);
      const data = await res.json();
      // console.log(data);
      setItems(data.result.files);
      setPageToken(data.result.nextPageToken);
    };

    fetchData();
  }, [router.asPath, router.isReady]);

  const searchHandler = async (text) => {
    console.log(text);

    await router.push({
      pathname: "/",
      query: { search: text },
    });
  };

  const loadMoreHandler = async (token) => {
    // console.log(token);
    if (!router.query.search) {
      const res = await fetch(`/api/drive?token=${token}`);
      const data = await res.json();
      // console.log(data);
      setItems([...items, ...data.result.files]);
      setPageToken(data.result.nextPageToken);
      return;
    }

    const res = await fetch(`/api/drive${router.asPath}&token=${token}`);
    const data = await res.json();
    // console.log(data);
    setItems([...items, ...data.result.files]);
    setPageToken(data.result.nextPageToken);
  };

  return (
    <>
      <ImageSearch onSearch={searchHandler} query={router.query.search} />
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
