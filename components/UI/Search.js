import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Button from "./Button";
import Filter from "./Filter";
import classes from "./Search.module.css";

const Search = () => {
  console.log("Rendered Search");

  const [query, setQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    console.log("Search useeffect ran");
    setQuery(router.query.search);
  }, [router.query.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      router.push({ query: { search: query } });
    }
  };

  return (
    <div className={classes.search}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="name" />
        <input
          className={classes.input}
          type="search"
          id="name"
          value={query || ""}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <Button>
          <SearchIcon className="h-6 w-6" />
        </Button>
      </form>
      <Filter />
    </div>
  );
};

export default Search;
