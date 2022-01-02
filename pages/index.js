import { useState } from "react";
import ImageList from "../components/Image/ImageList";
import ImageSearch from "../components/Image/ImageSearch";
import { getImages } from "../utils/drive";

export default function Home(props) {
  console.log(props);

  const [items, setItems] = useState(props.files);
  const [isLoading, setIsLoading] = useState(false);
  const [pageToken, setPageToken] = useState(props.nextPageToken);

  const searchHandler = async (text) => {
    console.log(text);
    // isLoading(true);
  };

  const loadMoreHandler = async (token) => {
    // console.log(token);
    setIsLoading(true);
    const res = await fetch("/api/drive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    });
    const data = await res.json();
    setItems([...items, ...data.result.files]);
    setPageToken(data.result.nextPageToken);
    setIsLoading(false);
  };

  return (
    <>
      <ImageSearch onSearch={searchHandler} />
      <ImageList
        files={items}
        nextPageToken={pageToken}
        isLoading={isLoading}
        onLoadMore={loadMoreHandler}
      />
    </>
  );
}

export async function getStaticProps() {
  const { files, nextPageToken } = await getImages(1);

  return {
    props: {
      files,
      nextPageToken,
    },
  };
}
