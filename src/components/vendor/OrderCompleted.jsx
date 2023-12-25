import React, { useState } from "react";
import order_successful from "../../assets/PNG/order_successful.png";

import { useNavigate } from "react-router-dom";
import Button from "../auth/Button";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";

const OrderCompleted = () => {
    const navigate = useNavigate();
    const [vendorNav, setVendorNav] = useState(false);
    const handleVendorNav = () => setVendorNav(true);
    const closeVendorNav = () => setVendorNav(false);
    return (
        <main>
            <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
            <VendorDashboardHead
                handleNavClick={handleVendorNav}
                showNav={vendorNav}
            />
            <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] bg-green-50 h-full ">
                <section className="mx-5 border-2 border-lime-600 rounded-full mb-2 block lg:hidden md:max-w-[600px] md:mx-auto">
                    <div className="pt-[80px] pb-12 flex flex-col justify-center items-center top-[325px]">
                        <img
                            src={order_successful}
                            className="order_img w-[750px] h-[490px]"
                            alt=""
                        />
                        <div>
                            <p className="order_text_1 font-[400] text-[40px] text-[#4A4A4A] underline text-center">
                                Pickup successfully{" "}
                            </p>
                        </div>
                        <div className="mt-10 flex">
                            <Button
                                handleClick={() => navigate("/vendor-dashboard-order", { replace: true })}
                                label="Browse More Order"
                                classname="order_btn rounded-[50.94px] h-[60px] w-[350px] font-[400] text-[28px] text-[#343434] border border-black outline-none bg-white m-2"
                            />
                            <Button

                                handleClick={() => navigate("/vendor-dashboard", { replace: true })}
                                label="Return To Home"
                                classname="order_btn rounded-[50.94px] h-[60px] w-[350px] font-[400] text-[28px] bg-[#5AB344] text-white m-2"
                            />
                        </div>
                    </div>
                </section>
            </section>
        </main>
    )
}

export default OrderCompleted;