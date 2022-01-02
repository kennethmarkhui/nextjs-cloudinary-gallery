import { useRef } from "react";

const ImageSearch = (props) => {
  const nameRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    props.onSearch(nameRef.current.value);
  };

  return (
    <form onSubmit={handleClick}>
      <label htmlFor="name" />
      <input type="text" id="name" ref={nameRef} />
      <button>search</button>
    </form>
  );
};

export default ImageSearch;
