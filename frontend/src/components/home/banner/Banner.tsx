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
              consultants, each professional is selected based on their
              expertise and experience. 24/7 no matter the time, find your needed
              service provider with ease.
            </p>
        </div>
        <div className="banner-action-wrapper">
          <button className="btn-primary">Find Service</button>
          <button className="btn-primary">Offer Service</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
