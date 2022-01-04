import Image from "next/image";

const ImageList = (props) => {
  const { files } = props;

  return (
    <>
      <ul>
        {files.map((item) => (
          <li key={item.id}>
            {item.name} - {item.mimeType}
            <p>https://drive.google.com/uc?id={item.id}</p>
            <Image
              unoptimized // sometimes returns 403 forbidden if not set to true
              src={"https://drive.google.com/uc?id=" + item.id}
              alt={item.name}
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ImageList;
