import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <>
      <button onClick={handleClick}>
        {!orderByToggle ? "Ascending" : "Descending"}
      </button>
    </>
  );
};

export default Filter;
