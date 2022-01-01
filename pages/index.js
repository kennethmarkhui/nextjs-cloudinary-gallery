import { useState } from "react";
import { listFiles } from "../utils/drive";

export default function Home(props) {
  const [items, setItems] = useState(props.files);
  const [isLoading, setIsLoading] = useState(false);
  const [pageToken, setPageToken] = useState(props.nextPageToken);

  const handleClick = async (token) => {
    // console.log(token);
    setIsLoading(true);
    const res = await fetch("/api/drive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    });
    const data = await res.json();
    setItems(data.result.files);
    setPageToken(data.result.nextPageToken);
    setIsLoading(false);
  };

  // console.log(props.nextPageToken);

  return (
    <div>
      <ul>
        {isLoading && <li>loading...</li>}
        {!isLoading &&
          items.map((item) => (
            <li key={item.name}>
              {item.name} - {item.mimeType}
            </li>
          ))}
      </ul>
      <button onClick={() => handleClick(pageToken)}>next</button>
      <p>{pageToken}</p>
    </div>
  );
}

export async function getStaticProps() {
  const { files, nextPageToken } = await listFiles(10);

  return {
    props: {
      files,
      nextPageToken,
    },
  };
}
