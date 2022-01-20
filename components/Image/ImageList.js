import Image from "next/image";

const ImageList = (props) => {
  console.log("Rendered ImageList");
  const { files } = props;
  return (
    <>
      <ul>
        {files.map((item) => {
          const transformations = "e_blur:2000,q_1";
          let a = item.secure_url;
          let b;

          return (
            <li key={item.public_id}>
              {item.filename}
              <p>{item.secure_url}</p>
              <Image
                // unoptimized // sometimes returns 403 forbidden if not set to true
                src={item.secure_url}
                alt={item.display_name}
                width={100}
                height={100}
                placeholder="blur"
                blurDataURL={
                  (a =
                    ((b = a.split("/")).splice(6, 0, transformations),
                    b.join("/")))
                }
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ImageList;
