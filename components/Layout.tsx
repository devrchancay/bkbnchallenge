import AppBar from "components/AppBar";

function Layout({ children }) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}

export default Layout;
