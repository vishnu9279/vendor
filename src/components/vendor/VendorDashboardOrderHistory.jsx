import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  scrapOrdersInfoService,
  getPaymentModeService,
  downloadPdfService
} from "../../services/dashBoard";
import pdfImage from "../../assets/PNG/pdf.png";

const VendorDashboardOrderHistory = () => {
  const [userOrder, setUserOrder] = useState();
  const { orderId } = useParams();
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);

  console.log("GETTING ORDER ID ", orderId);

  useEffect(() => {
    window.scrollTo(0, 0);

    const orderInfo = async () => {
      console.log("API Call started");
      try {
        const orderInfo = await scrapOrdersInfoService(orderId);
        setUserOrder(JSON.parse(orderInfo.data.data));
      } catch (error) {
        console.error("error", error);
      }
    };
    orderInfo();
    fetchPayemtMethod();
  }, [orderId]);

  const fetchPayemtMethod = async () => {
    try {
       await getPaymentModeService();
      // const data = JSON.parse(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const downloadPdf = async (orderId) => {
    console.log("orderId", orderId);

    try {
      const pdf = await downloadPdfService(orderId);
      console.log("pdf", pdf);
      const pdfResponse = JSON.parse(pdf.data.data);
      console.log("pdfResponse", pdfResponse);
      const pdfBuffer = new Uint8Array(pdfResponse.data);

    // Create a Blob from the Uint8Array
    const blob = new Blob([pdfBuffer], { type: 'application/pdf' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice_${orderId}.pdf`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div>
      <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <VendorDashboardHead
        handleNavClick={handleVendorNav}
        showNav={vendorNav}
      />
      <br />
      <br />
      <div className="mx-auto mt-8 max-w-2xl md:mt-12">
        <div className="bg-white shadow-lg">
        <div className="flex justify-end pr-5">
            <img className="w-7 cursor-pointer"
          onClick={() => downloadPdf(userOrder?.orderId)}
             
              src={pdfImage}
            >
            </img>
          </div>
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <span className="font-bold text-sm">{userOrder?.fullName}</span>
            <span className="text-red-500 text-sm">
              {userOrder?.dialCode}
              {userOrder?.phoneNumber}
            </span>
          </div>
          <span className="h-1 w-full bg-slate-400 lg:w-1/3"></span>
          <div className="flex flex-row  ml-4 flex-grow mt-2">
            <img
              src="https://file.rendit.io/n/C0CS7E4FGckCjnUrkzNJ.svg"
              alt="Carbonlocationfilled"
              id="CarbonlocationfilledRoot"
              className="w-5 h-4"
            />
            <span className="font-bold text-sm">
              {" "}
              {userOrder?.addressInfo.address}
            </span>
          </div>
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              <span className="h-1 w-full bg-slate-400 lg:w-1/3"></span>
              <div className="-my-8">
                <div className="flex flex-col gap-2 justify-start items-start ">
                  <span className="mt-2 font-bold text-slate-400 text-sm">
                    Order ID:- #{userOrder?.orderId}
                  </span>
                  <span className="mt-2 font-bold text-black text-sm">Platform Fees: {userOrder?.markupFee}</span>
                </div>
                <div>
                  <div className="flex mt-6 mb-5">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Product Details
                    </h3>
                    <h3 className="font-semibold center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Quantity
                    </h3>
                    <h3 className="font-semibold center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Price
                    </h3>
                    <h3 className="font-semibold center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Total
                    </h3>
                  </div>

                  {userOrder?.items?.map((scrapDetail, index) => (
                    <div
                      key={index}
                      className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    >
                      <div className="flex w-2/5">
                        <div className="w-10">
                          <img
                            className="h-10"
                            src={scrapDetail?.scrapInfo.docUrl}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {scrapDetail?.scrapInfo.scrapName}
                          </span>
                          <span className="text-red-500 text-sm">
                            {scrapDetail?.scrapInfo.quantityType}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        {scrapDetail?.quantity}
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ₹{scrapDetail?.price}
                      </span>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ₹{scrapDetail?.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 mb-6 flex text-center justify-end  space-x-4 border-t border-b">
              <p className="flex text-center absolute right-30  space-x-2">
                Total - ₹ {userOrder?.finalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardOrderHistory;
