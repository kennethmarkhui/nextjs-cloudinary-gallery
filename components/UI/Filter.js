import { useEffect, useState } from "react";

const Filter = (props) => {
  console.log("Rendered Filter");
  const { onFilter } = props;

  const [orderByToggle, setOrderByToggle] = useState(!props.orderQuery);

  useEffect(() => {
    console.log("Filter useffect ran");
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
