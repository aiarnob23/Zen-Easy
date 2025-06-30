import Header from "../../header/Header"
import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
        <div>
            <Header bg="white" />
        </div>
       <div className="banner-content-wrapper">
         <div className="banner-content">
            <h2>Making Home Service Seamless and Living Easy</h2>
        </div>
        <div className="banner-search   ">
          Search bar
        </div>
       </div>
    </div>
  );
};

export default Banner;