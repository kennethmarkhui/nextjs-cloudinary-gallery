import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFiles } from "../lib/cloudinary";
import useFetch from "../hooks/useFetch";
import Gallery from "../components/Gallery/Gallery";
import Spinner from "../components/UI/Spinner";

export default function Home(props) {
  const router = useRouter();

  const [items, setItems] = useState(
    router.asPath !== router.pathname ? [] : props.resources
  );
  const [nextCursor, setnextCursor] = useState(
    router.asPath !== router.pathname ? null : props.nextCursor
  );

  const { isLoading, fetchData } = useFetch();

  useEffect(() => {
    if (!router.isReady || router.asPath === router.pathname) {
      setItems(props.resources);
      setnextCursor(props.nextCursor);
      return;
    }
    if (!router.isReady || router.asPath !== router.pathname) {
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
      {isLoading && <Spinner className="h-6 w-6" />}
      {!isLoading && items.length !== 0 && (
        <Gallery
          files={items}
          nextCursor={nextCursor}
          onLoadMore={loadMoreHandler}
        />
      )}
    </>
  );
}

export async function getStaticProps() {
  const { resources, next_cursor: nextCursor } = await getFiles(20);

  return {
    props: {
      resources,
      nextCursor,
    },
  };
}
