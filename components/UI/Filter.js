import { useEffect, useState } from "react";

const Filter = (props) => {
  const { onFilter } = props;

  const [orderByToggle, setOrderByToggle] = useState(!props.orderQuery);

  useEffect(() => {
    setOrderByToggle(!props.orderQuery);
  }, [props.orderQuery]);

  const handleClick = () => {
    setOrderByToggle(!orderByToggle);
    onFilter(!orderByToggle);
  };

  return (
    <>
      <button onClick={handleClick}>
        {orderByToggle ? "Ascending" : "Descending"}
      </button>
    </>
  );
};

export default Filter;
