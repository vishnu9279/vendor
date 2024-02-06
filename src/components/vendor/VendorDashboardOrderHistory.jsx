import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  scrapOrdersInfoService,
  getPaymentModeService,
  downloadPdfService,
} from "../../services/dashBoard";
import pdfImage from "../../assets/PNG/pdf.png";
import QRIMAGE from "../../assets/PNG/QRCODE.png";
import axiosInstance from "../../api-config/axiosInstance";
import showSuccessMessage from "../../utils/SwalPopup";

const VendorDashboardOrderHistory = () => {
  const [userOrder, setUserOrder] = useState();
  const { orderId } = useParams();
  const [vendorNav, setVendorNav] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isTranscationNumber, setIsTranscationNumber] = useState(0);
  const [isTranscationFile, setIsTranscationFile] = useState("");
  const [isSignedURL, setIsSignedURL] = useState("");
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
        console.log(
          "JSON.parse(orderInfo.data.data)",
          JSON.parse(orderInfo.data.data)
        );
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
      const blob = new Blob([pdfBuffer], { type: "application/pdf" });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
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
  const openPlatformModal = () => {
    setIsOpenModal(true);
  };
  const handleQRCodeUpload = async () => {
    if (!isTranscationFile || !isTranscationNumber) {
      showSuccessMessage("Please fill both the fields", "error");
      return;
    } else {
      setIsOpenModal(false);
      const payload = {
        orderId: userOrder?.orderId,
        paymentScreenShotImageKey: isSignedURL,
        transactionOrUtrNumber: isTranscationNumber,
      };
      const addPaymentDetails = await axiosInstance.post(
        "/vendor/addPaymentDetail",
        payload
      );
      console.log("addPaymentDetails",addPaymentDetails)
      if (addPaymentDetails?.data.success) {
        showSuccessMessage(
          "You have successfully added your payment details",
          "success"
        );
        window.location.reload()
      }
      else{
        showSuccessMessage(
         `${addPaymentDetails?.data._message}`,
          "error"
        );
      }
      console.log("addPaymentDetails", addPaymentDetails);
    }
  };
  const handleFileChange = async (e) => {
    console.log("file ", e.target.files[0]);
    const file = e.target.files[0];
    const fileName = file.name;
    const userId = userOrder?.userId;
    const payload = {
      ContentType: file.type,
      fileName,
      uploadType: "PAYMENT_SCREEN_SHOT",
      userId,
    };
    console.log("generateSignedUrl function work", payload);
    setIsTranscationFile(file);
    const signedUrl = await axiosInstance.post(
      "/vendor/generateS3UploadSignedUrl",
      payload
    );
    if (signedUrl.data.success) {
      const result = JSON.parse(signedUrl?.data?.data);
      setIsSignedURL(result.key);
      const uploadResponseFromS3 = await uploadFileOnS3(file, result.signedUrl);
      console.log(
        "uploadResponseFromS3",
        uploadResponseFromS3,
        JSON.parse(signedUrl.data.data)
      );
      return JSON.parse(signedUrl.data.data);
    } else {
      console.log("error");
    }
  };
  const uploadFileOnS3 = async (file, signedUrl) => {
    try {
      const uploadResponse = await fetch(signedUrl, {
        body: file,
        headers: {
          "Content-Type": file.type, // Set the Content-Type header based on the image type
        },
        method: "PUT",
      });
      console.log("uploadFileOnS3 work", uploadFileOnS3);
      return uploadResponse;
    } catch (error) {
      showSuccessMessage("Error While Uploading Image", "error");
    }
  };
  const openModa = () => {
    console.log("hello open mocal");
    return (
      <div className=" bg-[#0000004d] absolute top-0 left-0 right-0 bottom-0 h-screen z-10 flex justify-center items-center">
        <div className="bg-white w-[45%] relative z-50 flex px-10 pb-10 pt-3 flex-col">
          <div>
            <p
              className="text-[22px] text-[#5AB344] flex justify-end cursor-pointer"
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              X
            </p>
          </div>
          <div className="flex mt-2">
            <div className="w-[50%] h-[250px]">
              <img src={QRIMAGE} alt="QR_CODE" className="w-[80%] h-full" />
            </div>
            <div className="flex flex-col gap-6 w-[50%]">
              <div className="flex items-center p-2 w-full border rounded-md bg-[#80d7421c]">
                <input type="file" onChange={handleFileChange} />
              </div>
              <div className="flex items-center p-2 border  w-full rounded-md bg-[#80d7421c]">
                <input
                  type="text"
                  required
                  placeholder="Enter your transaction number"
                  className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                  onChange={(e) => {
                    setIsTranscationNumber(e.target.value);
                  }}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="font-semibold text-[17px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[47px] hover:opacity-80"
                  onClick={() => {
                    handleQRCodeUpload();
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
      {isOpenModal && openModa()}
      <div className="mx-auto mt-8 max-w-2xl md:mt-12">
        <div className="bg-white shadow-lg">
          <div className="flex justify-end pr-5">
            <img
              className="w-7 cursor-pointer"
              onClick={() => downloadPdf(userOrder?.orderId)}
              src={pdfImage}
            ></img>
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
                  <span className="mt-2 font-bold text-black text-sm">
                    Platform Fees: {userOrder?.markupFee}
                  </span>
                  <span className="mt-2 font-bold text-black text-sm flex gap-2">
                    Vendor Paid:
                    <p
                      className={`${
                        userOrder?.isPaid
                          ? userOrder?.isPaid
                            ? "text-green-600"
                            : "text-red-500"
                          : "text-red-500"
                      }`}
                    >
                      {userOrder?.isPaid
                        ? userOrder?.isPaid
                          ? "Yes"
                          : "No"
                        : "No"}
                    </p>
                  </span>
                  <span className="mt-2 font-bold text-black text-sm flex gap-2">
                    Payment Approved By Admin:
                    <p
                      className={`${
                        !userOrder?.isAdminApprovedPaymentStatus
                          ? "text-red-500"
                          : userOrder?.isAdminApprovedPaymentStatus ===
                              "pending" ||
                            userOrder?.isAdminApprovedPaymentStatus ===
                              "rejected"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {userOrder?.isAdminApprovedPaymentStatus
                        ? userOrder?.isAdminApprovedPaymentStatus: "____"}
                    </p>
                  </span>
                  <span
                    className={`mt-2 font-bold text-black text-sm flex gap-2 ${
                      userOrder?.isPaid
                        ? userOrder?.isPaid
                          ? "hidden"
                          : "block"
                        : "block"
                    }`}
                  >
                    <p>Pay your platform fees:</p>
                    <input
                      type="checkbox"
                      // checked={quantityItem[scrapDetail.scrapId]}
                      className={`w-[50px] h-[17px] mt-1 cursor-pointer`}
                      onChange={() => {
                        openPlatformModal();
                      }}
                      checked={isOpenModal ? true : false}
                    />
                  </span>
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
