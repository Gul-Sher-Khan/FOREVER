import BestSeller from "../../components/User/BestSeller";
import Hero from "../../components/User/Hero";
import LatestCollection from "../../components/User/LatestCollection";
import NewsletterBox from "../../components/User/NewsletterBox";
import OurPolicy from "../../components/User/OurPolicy";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
