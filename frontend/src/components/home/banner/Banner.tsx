import { Link } from "react-router-dom";
import Header from "../../header/Header";
import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <div className="">
        <Header bg="white" />
      </div>
      <div className="banner-content-wrapper">
        <div className="banner-content">
          <h2 >Making Home Service Seamless and Living Easy</h2>
            <p>
              All of our service
              providers are highly vetted and certified to ensure that you
              receive top-quality work every time. From plumbers to IT
              provider's, each professional is selected based on their
              expertise and experience. 24/7 no matter the time, find your needed
              service provider with ease.
            </p>
        </div>
        <div className="banner-action-wrapper">
          <Link to="/main/add-rent" className="button btn-primary">Post Rent Ad</Link>
          <Link to="/main/offer-service" className="button btn-primary">Offer Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
