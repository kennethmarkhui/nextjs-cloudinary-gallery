import Image from "next/image";

const ImageList = (props) => {
  const { files } = props;

  return (
    <>
      <ul>
        {files.map((item) => (
          <li key={item.public_id}>
            {item.filename}
            <p>{item.secure_url}</p>
            <Image
              // unoptimized // sometimes returns 403 forbidden if not set to true
              src={item.secure_url}
              alt={item.display_name}
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
