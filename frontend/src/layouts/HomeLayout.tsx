import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";


const HomeLayout = () => {
  return (
    <div>
        <Outlet/>
        <Footer/>
    </div>
  );
};

export default HomeLayout;