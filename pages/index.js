import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Gallery from "../components/Gallery/Gallery";
import { getFiles } from "../lib/cloudinary";
import Spinner from "../components/UI/Spinner";

export default function Home(props) {
  // console.log(props);

  const router = useRouter();

  const [items, setItems] = useState(props.resources);
  const [nextCursor, setnextCursor] = useState(props.nextCursor);
  const [isLoading, setIsLoading] = useState(false);

  // const renderCount = useRef(1);
  // useEffect(() => (renderCount.current = renderCount.current + 1));

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

  const loadMoreHandler = async () => {
    console.log("loadMoreHandler ran");
    const newQuery = `${
      router.asPath !== "/"
        ? `${router.asPath.substring(1)}&nextCursor=${nextCursor}`
        : `?nextCursor=${nextCursor}`
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
  const { resources, next_cursor: nextCursor } = await getFiles(5);

  return {
    props: {
      resources,
      nextCursor,
    },
  };
}
