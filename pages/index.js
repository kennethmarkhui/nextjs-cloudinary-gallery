import ImageList from "../components/Image/ImageList";
import ImageSearch from "../components/Image/ImageSearch";
import { getImages } from "../utils/drive";

export default function Home(props) {
  console.log(props);

  const searchHandler = async (text) => {
    console.log(text);
  };

  return (
    <>
      <ImageSearch onSearch={searchHandler} />
      <ImageList files={props.files} nextPageToken={props.nextPageToken} />
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
