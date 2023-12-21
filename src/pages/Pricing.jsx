import React from "react";
import PriceCardComponent from "../components/auth/PriceCardComponent";

const Pricing = () => {
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   (async () => {
  //     try {
  //       const response = await client.get("/item");
  //       console.log(response, ">>>>>");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);
  return (
    <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
      <h2 className="mt-5 text-3xl text-center font-extrabold">Rates Of Scrap Bazar</h2>
      {/* {} */}
      <div className="pricing-lists">
        <PriceCardComponent />
      </div>
    </div>
  );
};

export default Pricing;
