import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchBar = () => {
  console.log("Rendered SearchBar");

  const [query, setQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    console.log("SearchBar useeffect ran");
    setQuery(router.query.search);
  }, [router.query.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      router.push({ query: { search: query } });
    }
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
