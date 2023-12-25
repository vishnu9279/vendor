import { useEffect, useState } from "react";
import Hero from "../components/ContactUs/Hero";
import VendorDashboardNav from "../components/vendor/VendorDashboardNav";
import VendorDashboardHead from "../components/vendor/VendorDashboardHead";
import { useNavigate } from "react-router-dom";
import ContactDetails from "../components/ContactUs/ContactDetails";

const ContactScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [vendorNav, setVendorNav] = useState(false);
    const handleVendorNav = () => setVendorNav(true);
    const closeVendorNav = () => setVendorNav(false);
    const [userOrder, setUserOrder] = useState([]);
    const navigate = useNavigate();
    return (
        <main>
            <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
            <VendorDashboardHead
                handleNavClick={handleVendorNav}
                showNav={vendorNav}
            />
            <section className="lg:ml-[18%] pt-[10%] md:pt-[2%] lg:pt-[1%] bg-green-50 h-full ">

                <Hero />
                <ContactDetails />
            </section>
        </main>
    );
};

export default ContactScreen;