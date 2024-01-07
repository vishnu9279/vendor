import { useEffect, useState } from "react";
import VendorDashboardHead from "./VendorDashboardHead";
import VendorDashboardNav from "./VendorDashboardNav";
// import PriceCardComponent from "./components/PriceCard";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pricing = () => {

    const [vendorNav, setVendorNav] = useState(false);
    const handleVendorNav = () => setVendorNav(true);
    const closeVendorNav = () => setVendorNav(true);
    // const navigate = useNavigate();
    const [scrapList, setScrapList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    async function fetchData() {
        const headers = {
            platform: 'web'
        }
        try {
            const response = await axios.get("https://serverpprod.hksoftware.in/api/v1/users/getScrap", {
                headers: headers
            });
            const {
                scraps
            } = JSON.parse(response.data.data);

            console.log("pricing", scraps);
            setScrapList(scraps);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const renderData = () => {
        return scrapList?.map((item) => (
            <div key={item.scrapId} className="relative  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                    <img className="object-cover" src={item?.docUrl} alt="product image" />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 px-5 pb-5">

                    <h5 className="text-lg  tracking-tight text-slate-900">{item.scrapName}</h5>

                    <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-1xl font-bold text-slate-900"> ₹ {item.price}-{item.quantityType}</span>
                        </p>
                    </div>

                </div>
            </div>
        ));
    };
    return (
        <main>
            <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
            <VendorDashboardHead
                handleNavClick={handleVendorNav}
                showNav={vendorNav}
            />
            <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] bg-green-50 h-full ">
                <section className="mx-5 border-2 rounded-full mb-2 block  md:max-w-[600px] md:mx-auto">
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-5 md:p-5">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-10 md:gap-10">{renderData()}</div>
                    </div>

                </section>
            </section>
        </main >
    );
};

export default Pricing;