import { useState } from "react";
import VendorDashboardHead from "./VendorDashboardHead";
import VendorDashboardNav from "./VendorDashboardNav";
import PriceCardComponent from "./components/PriceCard";


const Pricing = () => {

    const [vendorNav, setVendorNav] = useState(false);
    const handleVendorNav = () => setVendorNav(true);
    const closeVendorNav = () => setVendorNav(true);
    return (
        <main>
            <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
            <VendorDashboardHead
                handleNavClick={handleVendorNav}
                showNav={vendorNav}
            />
            <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] bg-green-50 h-full ">

                <PriceCardComponent />
            </section>
        </main >
    );
};

export default Pricing;