import classes from "./Card.module.css";

const Card = ({ className, children, style, onMouseOver, onMouseOut }) => {
  return (
    <figure
      className={`${classes.card} ${className ? className : ""}`}
      style={style || {}}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </figure>
  );
};

export default Card;
