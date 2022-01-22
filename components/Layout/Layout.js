import Header from "./Header";
import Main from "./Main";
import classes from "./Layout.module.css";

const Layout = (props) => {
  console.log("Rendered Layout");
  return (
    <div className={classes.layout}>
      <Header />
      <Main>{props.children}</Main>
    </div>
  );
};

export default Layout;
