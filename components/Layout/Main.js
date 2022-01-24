import classes from "./Main.module.css";

const Main = (props) => {
  return (
    <main className={classes.main}>
      <section className={classes.gallery}>{props.children}</section>
    </main>
  );
};

export default Main;
