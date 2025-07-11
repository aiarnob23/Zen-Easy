import About from "../../components/home/about/About";
import Banner from "../../components/home/banner/Banner";
import Feedback from "../../components/home/feedback/Feedback";
import Service from "../../components/home/service/Service";

const Home = () => {
  return (
    <div className="w-full">
      <div>
        <Banner />
      </div>
      <div>
        <Service/>
      </div>
      <div>
        <About/>
      </div>
      <div>
        <Feedback/>
      </div>
    </div>
  );
};

export default Home;
