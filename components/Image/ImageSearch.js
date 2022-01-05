import { useRef, useState } from "react";

const ImageSearch = (props) => {
  const { onSearch } = props;

  const [query, setQuery] = useState(props.query || "");

  const searchRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    if (searchRef.current.value !== "") {
      onSearch(searchRef.current.value);
    }
  };

  return (
    <form onSubmit={handleClick}>
      <label htmlFor="name" />
      <input
        type="text"
        id="name"
        ref={searchRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search"
      />
      <button>search</button>
    </form>
  );
};

export default ImageSearch;
