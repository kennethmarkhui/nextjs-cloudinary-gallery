import { useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import Button from "../../UI/Button";

import classes from "./SearchForm.module.css";

const Search = () => {
  // console.log("Rendered Search");

  const router = useRouter();

  const [query, setQuery] = useState(router.query.search || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      router.push({ query: { search: query } });
    }
  };

  return (
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
      <Button type="submit">
        <SearchIcon className={classes.icon} />
      </Button>
    </form>
  );
};

export default Search;
