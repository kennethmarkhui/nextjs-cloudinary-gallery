import classes from "./Button.module.css";

const Button = ({ children, onClick, className, type }) => {
  return (
    <button
      onClick={onClick}
      className={`${classes.btn} ${className ? className : ""}`}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
