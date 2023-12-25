
import locationIcon from "../../assets/SVG/dashboard/location_icon.svg";
import contact_icon from "../../assets/SVG/dashboard/contact_icon.svg";
import note from "../../assets/SVG/dashboard/note.svg";
import cancel from "../../assets/SVG/dashboard/round_cancel.svg";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import telephone from "../../assets/SVG/dashboard/telephone.svg";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance";
import Swal from "sweetalert2";

const AcceptedOrder = () => {
    const [vendorNav, setVendorNav] = useState(false);
    const handleVendorNav = () => setVendorNav(true);
    const closeVendorNav = () => setVendorNav(false);
    const [userOrder, setUserOrder] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);

        fetchData();
    }, []);


    const handlePickup = async (item) => {

        const orderId = item
        const payload = {
            "orderId": item.orderId,
            "orderStatus": 2
        }
        try {
            const response = await axiosInstance.post("/updateOrderStatus", payload);
            console.log("get User data", response);
            const data = response.data;
            if (data.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: true,
                    timer: 2500,
                    title: "Successfully Arrived"
                });
                navigate("/vendor-dashboard-arrived", {
                    state: {
                        orderId
                    }
                });
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    const fullname = localStorage.getItem("fullname");
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/getVendorOrder?page=0&limit=10&orderStatus=1");
            console.log("get User data", response);
            const res = JSON.parse(response.data.data)
            console.log("order data", res);
            setUserOrder(res.orders);
            // console.log("get user order", userOrder)
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const renderData = () => {
        return userOrder?.map((item) => (

            <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] lg:bg-green-50 h-full ">
                <aside className="mb-3 pb-8  bg-white border p-3 md:pr-16 border-neutral-300 rounded-lg lg:rounded-sm md:mx-8 h-full mx-2">
                    <div className="w-full">
                        <div className="md:hidden flex items-center w-full pt-3">
                            <p className=" text-neutral-400 text-sm font-bold tracking-wide w-full">
                                Order ID: #{item.orderId}
                            </p>
                            <p className="text-center text-neutral-400 text-sm font-bold tracking-wide leading-3 w-full">
                                Order ID: #{item.orderId}
                            </p>
                        </div>
                        <h1 className=" text-neutral-700 text-2xl font-normal font-['Gilroy-Bold'] leading-9 tracking-tight p-2 w-full">
                            {item.scrapInfo.scrapName}
                        </h1>
                        <div className="flex justify-between w-full">
                            <div className="w-full">
                                <div className="flex p-2">
                                    <img src={locationIcon} alt="location_icon" className="mr-2" />
                                    <div className="">
                                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                                            {item.city}
                                        </p>
                                        <p className=" text-zinc-600 text-sm font-normal font-['Gilroy-Regular'] ">
                                            {item.address}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex p-2">
                                    <img src={contact_icon} alt="contact_icon" className="mr-2" />
                                    <div className="">
                                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                                            {item.fullName}
                                        </p>

                                    </div>
                                </div>
                                <div className="flex p-2 items-end">
                                    <img
                                        src={telephone}
                                        alt="telephone_icon"
                                        className="mr-2 w-6"
                                    />

                                    <p className="text-center text-lime-600 text-lg font-bold leading-[29.09px] tracking-wider">
                                        {" "}
                                        {item.dialCode}{" "} {item.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex hidden">
                        <div className="flex justify-end items-end w-full">
                            <button onClick={() => handlePickup(item)} className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600">
                                on my way to pickup
                            </button>
                        </div>
                    </div>


                </aside>

                <div className="flex md:hidden w-full justify-center items-center h-full mb-5">
                    <div className="flex justify-end items-end">
                        <button onClick={() => handlePickup(item)} className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600">
                            on my way to pickup
                        </button>
                    </div>
                </div>


            </section>

        ))
    }
    return (
        <main>
            <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
            <VendorDashboardHead
                handleNavClick={handleVendorNav}
                showNav={vendorNav}
            />

            {renderData()}

        </main>
    );
}

export default AcceptedOrder;