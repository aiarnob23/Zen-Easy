import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const RootLayout = () => {
  return (
    <div>
        <Header bg="black" />
        <Outlet/>
        <Footer/>
    </div>
  );
};

export default RootLayout;