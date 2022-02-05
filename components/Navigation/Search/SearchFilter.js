import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/outline";
import Button from "../../UI/Button";

import classes from "./SearchFilter.module.css";

const Filter = () => {
  console.log("Rendered Filter");
  const router = useRouter();

  const [orderByToggle, setOrderByToggle] = useState(!!router.query.order);

  useEffect(() => {
    setOrderByToggle(router.query.order);
  }, [router.query.order]);

  const handleClick = () => {
    let newQuery;
    const { order, search } = router.query;
    if (router.query.search) {
      newQuery = order ? { search } : { ...router.query, order: "desc" };
    }
    if (!router.query.search) {
      newQuery = order ? "" : { order: "desc" };
    }
    router.push({ query: newQuery });
  };

  return (
    <Button onClick={handleClick}>
      {!orderByToggle ? (
        <SortAscendingIcon className={classes.icon} />
      ) : (
        <SortDescendingIcon className={classes.icon} />
      )}
    </Button>
  );
};

export default Filter;
