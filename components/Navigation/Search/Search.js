import SearchForm from "./SearchForm";
import Filter from "./SearchFilter";

import classes from "./Search.module.css";

const Search = () => {
  return (
    <div className={classes.search}>
      <div className={classes.wrapper}>
        <SearchForm />
        <Filter />
      </div>
    </div>
  );
};

export default Search;
