import Image from "next/image";

const Img = (props) => {
  const { item } = props;
  // console.log(item);
  const flexGrow = Math.round((item.width * 100) / item.height);
  const flexBasis = Math.round((item.width * 240) / item.height);
  const paddingBottom = Math.round((item.height / item.width) * 100.0);
  const transformations = "e_blur:2000,q_1";
  let a = item.secure_url;
  let b;
  return (
    <figure
      className={`m-1 relative rounded-lg overflow-hidden max-h-[40vh]`}
      style={{
        flexGrow: flexGrow,
        flexBasis: flexBasis,
      }}
    >
      <i className="block" style={{ paddingBottom: `${paddingBottom}%` }} />
      <Image
        className="absolute top-0 w-full align-bottom"
        src={item.url}
        alt={item.display_name}
        layout="fill"
        placeholder="blur"
        blurDataURL={
          (a = ((b = a.split("/")).splice(6, 0, transformations), b.join("/")))
        }
      />
    </figure>
  );
};

export default Img;
