
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

    // const fullname = localStorage.getItem("fullname");
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/getVendorOrder?page=0&limit=10&orderStatus=1,2,3,4");
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
                .  <div class="mx-auto mt-8 max-w-2xl md:mt-12">
                    <div class="bg-white shadow-lg">

                        <div class="flex flex-col justify-between ml-4 flex-grow">
                            <span class="font-bold text-sm">{item?.fullName}</span>
                            <span class="text-red-500 text-sm">{item?.dialCode}{item?.phoneNumber}</span>

                        </div>
                        <span class="h-1 w-full bg-slate-400 lg:w-1/3"></span>
                        <div class="flex flex-row  ml-4 flex-grow mt-2">
                            <img
                                src="https://file.rendit.io/n/C0CS7E4FGckCjnUrkzNJ.svg"
                                alt="Carbonlocationfilled"
                                id="CarbonlocationfilledRoot"
                                className="w-5 h-4"
                            />
                            <span class="font-bold text-sm"> {item?.addressInfo.address}</span>
                        </div>
                        <div class="px-4 py-6 sm:px-8 sm:py-10">
                            <div class="flow-root">
                                <span class="h-1 w-full bg-slate-400 lg:w-1/3"></span>
                                <ul class="-my-8">
                                    <span class="mt-10 font-bold text-slate-400 text-sm">Order ID:- #{item?.orderId}</span>
                                    <div>
                                        <div class="flex mt-2  mb-5">
                                            <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                                            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                                            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                                        </div>
                                        {item.items?.map((scrapDat, index) => (
                                            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                                <div class="flex w-2/5">
                                                    <div class="w-10">
                                                        <img class="h-10" src={scrapDat?.scrapInfo.docUrl} alt="" />
                                                    </div>
                                                    <div class="flex flex-col justify-between ml-4 flex-grow">
                                                        <span class="font-bold text-sm">{scrapDat?.scrapInfo.scrapName}</span>
                                                        <span class="text-red-500 text-sm">{scrapDat?.scrapInfo.quantityType}</span>

                                                    </div>
                                                </div>
                                                <div class="flex justify-center w-1/5">
                                                    {scrapDat?.quantity}
                                                </div>
                                                <span class="text-center w-1/5 font-semibold text-sm">₹{scrapDat?.scrapInfo.price}</span>
                                                <span class="text-center w-1/5 font-semibold text-sm">₹{scrapDat?.scrapInfo.price}</span>
                                            </div>
                                        ))}
                                    </div>


                                </ul>
                            </div>
                            <div class="mt-6 flex text-center justify-end  space-x-4 border-t border-b py-5">
                                <div className="flex space-x-4">
                                    <button onClick={() => handlePickup(item)} className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600">
                                        on my way to pickup
                                    </button>
                                </div>
                            </div>
                        </div>
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