import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getFiles } from "../lib/cloudinary";
import useFetch from "../hooks/useFetch";
import Gallery from "../components/Gallery/Gallery";
import Spinner from "../components/UI/Spinner";

export default function Home(props) {
  // console.log(props);

  const router = useRouter();

  const [items, setItems] = useState(props.resources);
  const [nextCursor, setnextCursor] = useState(props.nextCursor);

  const { isLoading, fetchData } = useFetch();

  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));

  useEffect(() => {
    if (!router.isReady || router.asPath === router.pathname) {
      // console.log("home useEffect router === '/'", router);
      setItems(props.resources);
      setnextCursor(props.nextCursor);
      return;
    }
    if (!router.isReady || router.asPath !== router.pathname) {
      // console.log("home useEffect router !== '/'", router);
      fetchData(`/api/cloudinary${router.asPath.substring(1)}`, (data) => {
        setItems(data.resources);
        setnextCursor(data.next_cursor);
      });
    }
  }, [
    router.isReady,
    router.asPath,
    router.pathname,
    props.resources,
    props.nextCursor,
    fetchData,
  ]);

  const loadMoreHandler = () => {
    console.log("loadMoreHandler ran");
    const newQuery = `${
      router.asPath !== "/"
        ? `${router.asPath.substring(1)}&nextCursor=${nextCursor}`
        : `?nextCursor=${nextCursor}`
    }`;

    fetchData(
      `/api/cloudinary${newQuery}`,
      (data) => {
        setItems((prev) => [...prev, ...data.resources]);
        setnextCursor(data.next_cursor);
      },
      false
    );
  };

  return (
    <>
      {/* <p>{`Home Rendered ${renderCount.current} times`}</p> */}
      {isLoading && <Spinner className="h-6 w-6" />}
      {!isLoading && (
        <Gallery
          files={items}
          nextCursor={nextCursor}
          onLoadMore={loadMoreHandler}
        />
      )}
    </>
  );
}

export async function getServerSideProps() {
  const { resources, next_cursor: nextCursor } = await getFiles(20);

  return {
    props: {
      resources,
      nextCursor,
    },
  };
}
