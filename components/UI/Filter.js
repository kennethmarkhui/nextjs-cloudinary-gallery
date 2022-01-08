import { useEffect, useState } from "react";

const Filter = (props) => {
  const { onFilter } = props;
  const [orderByToggle, setOrderByToggle] = useState(true); // true='Ascending' false='Descending'

  const handleClick = () => {
    setOrderByToggle(!orderByToggle);
    onFilter(!orderByToggle);
  };

  return (
    <>
      <button onClick={handleClick}>{orderByToggle ? "up" : "down"}</button>
    </>
  );
};

export default Filter;
