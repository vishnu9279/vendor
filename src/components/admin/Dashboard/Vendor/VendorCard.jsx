import React from "react";
import CardProps from "../Home/pages/CardProps";
import dots from "../../../../assets/PNG/dashboard/threeDots.svg";
import user1 from "../../../../assets/PNG/dashboard/usersGreen.png";
import Check from "../../../../assets/PNG/dashboard/check.png";
import user2 from "../../../../assets/PNG/dashboard/usersPurple.png";
import money from "../../../../assets/PNG/dashboard/money.png";

const VendorCard = () => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      <CardProps Dots={dots} Img={user1} />
      <CardProps Dots={dots} Img={Check} />
      <CardProps Dots={dots} Img={user2} />
      <CardProps Dots={dots} Img={money} />
    </div>
  );
};

export default VendorCard;
