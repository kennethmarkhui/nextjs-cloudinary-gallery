import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/outline";
import Button from "./Button";
import classes from "./Filter.module.css";

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
    <div className={classes.filter}>
      <Button onClick={handleClick}>
        {!orderByToggle ? (
          <SortAscendingIcon className="h-6 w-6" />
        ) : (
          <SortDescendingIcon className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default Filter;
