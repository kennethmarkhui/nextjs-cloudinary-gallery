import { useState } from "react";

const Filter = () => {
  const [orderByToggle, setOrderByToggle] = useState(true);

  const handleClick = () => {
    setOrderByToggle(!orderByToggle);
  };

  return (
    <>
      <button onClick={handleClick}>{orderByToggle ? "up" : "down"}</button>
    </>
  );
};

export default Filter;
