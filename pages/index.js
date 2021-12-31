import { listFiles } from "../utils/drive";

const nextPage = (token) => {
  console.log(token);
  return token;
};

export default function Home(props) {
  return (
    <div>
      <ul>
        {props.files.map((image) => (
          <li key={image.name}>
            {image.name} - {image.mimeType}
          </li>
        ))}
      </ul>
      <button onClick={() => nextPage(props.nextPageToken)}>next</button>
    </div>
  );
}

export async function getStaticProps() {
  const { files, nextPageToken } = await listFiles(10, nextPage);
  return {
    props: {
      files,
      nextPageToken,
    },
  };
}
