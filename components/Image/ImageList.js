import { useState } from "react";
import Image from "next/image";

const ImageList = (props) => {
  const { files, nextPageToken } = props;

  const [items, setItems] = useState(files);
  const [isLoading, setIsLoading] = useState(false);
  const [pageToken, setPageToken] = useState(nextPageToken);

  const handleClick = async (token) => {
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
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.mimeType}
            <p>https://drive.google.com/uc?id={item.id}</p>
            <Image
              // unoptimized // sometimes returns 403 forbidden if not set to true
              src={"https://drive.google.com/uc?id=" + item.id}
              alt={item.name}
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
      {isLoading && <p>loading...</p>}
      <button
        disabled={isLoading || !pageToken}
        onClick={() => handleClick(pageToken)}
      >
        load more
      </button>
      <p>{pageToken}</p>
    </>
  );
};

export default ImageList;
