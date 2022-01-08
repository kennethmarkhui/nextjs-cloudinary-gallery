import { useEffect, useState } from "react";

const SearchBar = (props) => {
  const { onSearch } = props;
  // console.log("SearchBar initial query ", props.query);

  const [query, setQuery] = useState(props.query);

  useEffect(() => {
    setQuery(props.query);
  }, [props.query]);

  const handleClick = (e) => {
    e.preventDefault();
    if (query && query !== "") {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleClick}>
      <label htmlFor="name" />
      <input
        type="text"
        id="name"
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search"
      />
      <button>search</button>
    </form>
  );
};

export default SearchBar;
