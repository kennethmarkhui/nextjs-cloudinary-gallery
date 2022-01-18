import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchBar = (props) => {
  // console.log("SearchBar initial query ", props.query);

  const [query, setQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    setQuery(router.query.q);
  }, [router.query.q]);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push({ pathname: "/search", query: { q: query } });
  };

  return (
    <form onSubmit={handleSubmit}>
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
