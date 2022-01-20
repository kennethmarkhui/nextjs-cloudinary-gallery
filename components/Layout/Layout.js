import Navbar from "./Navbar";

const Layout = (props) => {
  console.log("Rendered Layout");
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
