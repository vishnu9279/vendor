import { useEffect } from "react";
import About from "../body/about/About";
import Faq from "../body/about/Faq";
import Banner from "../body/banner/Banner";
import Results from "../pages/Results";
import Treasure from "../pages/Treasure";
import Tutorial from "../pages/Tutorial";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner />
      <About />
      <Treasure />
      <Tutorial />
      <Faq />
      <Results />
    </div>
  );
};

export default Homepage;
