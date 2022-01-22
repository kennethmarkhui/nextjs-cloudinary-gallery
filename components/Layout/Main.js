import classes from "./Main.module.css";

const Main = (props) => {
  return (
    <main className={classes.main}>
      <div className={classes.content}>{props.children}</div>
    </main>
  );
};

export default Main;
