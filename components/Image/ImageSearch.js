import { useRef } from "react";

const ImageSearch = (props) => {
  const { onSearch } = props;

  const searchRef = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (searchRef.current.value !== "") {
      onSearch(searchRef.current.value);
    }
  };

  return (
    <form onSubmit={handleClick}>
      <label htmlFor="name" />
      <input type="text" id="name" ref={searchRef} placeholder="search" />
      <button>search</button>
    </form>
  );
};

export default ImageSearch;
