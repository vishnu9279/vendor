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
                <section className="mx-5  md:max-w-[600px] md:mx-auto">

                    <img
                        src={order_successful}
                        className="order_img w-[750px] h-[490px]"
                        alt=""
                    />
                    <div>
                        <p className="order_text_1 font-[400] text-[40px] text-[#4A4A4A] underline text-center">
                            Order Completed{" "}
                        </p>
                    </div>


                </section>
            </section>
        </main>
    )
}

export default OrderCompleted;