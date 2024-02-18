import Footer from "../Footer";
import NavBar from "../NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="container-fluid">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
