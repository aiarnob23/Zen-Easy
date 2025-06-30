import Banner from "../../components/home/banner/Banner";
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
    </div>
  );
};

export default Home;
