import { useEffect } from "react";
import Contactus from "./Contactus";
import Form from "./Form";

import Hero from "./Hero";

const HomeScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Hero />

      <Contactus />

      <Form />
    </div>
  );
};

export default HomeScreen;
