import Image from "next/image";

const Img = (props) => {
  const { item } = props;
  const transformations = "e_blur:2000,q_1";
  let a = item.secure_url;
  let b;
  return (
    <div>
      <p>{item.filename}</p>
      <p>{item.secure_url}</p>
      <Image
        // unoptimized // sometimes returns 403 forbidden if not set to true
        src={item.secure_url}
        alt={item.display_name}
        width={100}
        height={100}
        placeholder="blur"
        blurDataURL={
          (a = ((b = a.split("/")).splice(6, 0, transformations), b.join("/")))
        }
      />
    </div>
  );
};

export default Img;
