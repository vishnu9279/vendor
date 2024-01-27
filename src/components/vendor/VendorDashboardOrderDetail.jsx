import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrdersEnum, OrdersRespEnum } from "../../api-config/common";
import showSuccessMessage from "../../utils/SwalPopup";
import {
  scrapOrdersInfoService,
  updateScrapOrderStatusService,
  getPaymentModeService,
  updatePaymentMethodService,
  vendorScrapOrderConfirmation,
} from "../../services/dashBoard";
const buttonText = {
  0: "Accept Pickup",
  1: "On the Way",
  2: "I have arrived at pickup",
  3: "I have Pickup Scrap",
  4: "Order Completed",
};

const VendorDashboardOrderDetail = () => {
  const [userOrder, setUserOrder] = useState();
  const { orderId } = useParams();
  const [selectPayment, setSelectedPayent] = useState();
  const [payment, setPaymentMode] = useState();
  const [orderDetailsData, setOrderDetailsData] = useState();
  const [quantityItem, setQuantityItem] = useState({});
  const [totalCheckedQuanity, setTotalCheckedQuantity] = useState([]);
  // const [orderTotalPrice,setOrderTotalPrice]=useState(0);

  console.log("GETTING ORDER ID ", orderId);
  const orderInfo = async () => {
    console.log("API Call started");
    try {
      const orderInfo = await scrapOrdersInfoService(orderId);
      console.log("vendor orders Info", orderInfo);
      console.log("API Call successful", JSON.parse(orderInfo.data.data));
      setUserOrder(JSON.parse(orderInfo?.data?.data));
      const orderItems = JSON.parse(orderInfo?.data?.data);
      setOrderDetailsData(orderItems?.items);
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    orderInfo();
    fetchPayemtMethod();
  }, [orderId]);

  const updateScrapOrderStatus = async (item, orderStatus) => {
    console.log("selected pickup request", item.orderId, orderStatus);
    try {
      if (userOrder.orderStatus === OrdersEnum.SCRAP_PICKED) return;
      const response = await updateScrapOrderStatusService(
        item.orderId,
        orderStatus
      );
      console.log("get User data", response);

      showSuccessMessage(OrdersRespEnum[orderStatus], "success");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchPayemtMethod = async () => {
    try {
      const response = await getPaymentModeService();
      console.log("payment mode", response);
      const data = JSON.parse(response.data.data);
      setPaymentMode(data);
      console.log("get Profile of user ", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePayment = async (event) => {
    const Payment = event.target.value;

    console.log("selected Method", Payment);
    setSelectedPayent(Payment);

    try {
      const response = await updatePaymentMethodService(
        Payment,
        userOrder.orderId
      );
      console.log("updatePaymentMethodService working", response);
      showSuccessMessage("Payment Method Added Successfully", "success");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateQuantity = (id, newQuantity = 1) => {
    console.log("............", quantityItem);
    if (quantityItem[id]) {
      console.log("if block.........");
      setQuantityItem({ ...quantityItem, [id]: false });
    } else {
      console.log("else block......");
    }
    const resultCheck = totalCheckedQuanity.some((data) => {
      return data == id;
    });
    if (resultCheck) {
      console.log("totalCheckedQuanity",totalCheckedQuanity,id)
      const filterResult = totalCheckedQuanity?.filter((data) => {
       return data != id;
      });
      console.log("filter result",filterResult)
      setTotalCheckedQuantity(filterResult);
    }
    setOrderDetailsData((prevData) =>
      prevData?.map((item) =>
        item.scrapId === id
          ? {
              ...item,
              quantity: parseFloat(newQuantity),
              amount: parseFloat(newQuantity * item.price),
            }
          : item
      )
    );
    // console.log("id", id, newQuantity);
  };
  console.log("orderDetailsData", orderDetailsData);
  let totalVendorFinalAmount = 0;
  let totalVendorScrapQuantity = 0;
  const calculateTotalPrice = () => {
    // const totalPrice = orderDetailsData?.reduce(
    //   (acc, item) => acc + item.quantity * item.price,
    //   0
    // );
    let pricePerQuantity = 0;
    const totalPrice = orderDetailsData?.map((item) => {
      pricePerQuantity = pricePerQuantity + item.amount;
    });
    console.log("totalPrice", totalPrice);
    const scrapQuantity = orderDetailsData?.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    totalVendorFinalAmount = pricePerQuantity;
    totalVendorScrapQuantity = scrapQuantity;
    return pricePerQuantity;
  };
  // const calculateTotalQuantity = () => {
  //   const scrapQuantity = orderDetailsData.reduce(
  //     (acc, item) => acc + item.quantity,
  //     0
  //   );
  //   return scrapQuantity;
  // };

  const finalScrapSettlement = async (scrap_id, scrapQuantity, scrapPrice) => {
    console.log("scrapQuantity", scrapQuantity);
    try {
      if (scrapQuantity === "" || scrapQuantity === null) {
        showSuccessMessage("Please fill the quantity", "error");
        return;
      }
      if (quantityItem[scrap_id]) {
        setQuantityItem({ ...quantityItem, [scrap_id]: false });
      } else {
        setQuantityItem({ ...quantityItem, [scrap_id]: true });
      }
      const resultCheck = totalCheckedQuanity.some((id) => {
        return id == scrap_id;
      });
      if (resultCheck) {
        const filterResult = totalCheckedQuanity.filter((id) => {
          id != scrap_id;
        });
        setTotalCheckedQuantity(filterResult);
      } else {
        setTotalCheckedQuantity([...totalCheckedQuanity, scrap_id]);
      }
      console.log("resultCheck", resultCheck);
      const scrapInfo = {
        quantity: scrapQuantity.toString(),
        price: scrapPrice,
        orderId: userOrder?.orderId,
        scrapId: scrap_id,
        vendorFinalAmount: totalVendorFinalAmount,
        VendorTotalScrapQuantity: totalVendorScrapQuantity,
      };
      console.log("scrapInfo", scrapInfo);
      const response = await vendorScrapOrderConfirmation(scrapInfo);
      if (response.data.success) {
        orderInfo();
        showSuccessMessage("Quantity updated successfully", "success");
      }
      console.log("payment mode", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("............", quantityItem);
  console.log("...........totalCheckedQuanity", totalCheckedQuanity);
  console.log("calculateTotalPrice", calculateTotalPrice());
  return (
    <div>
      <VendorDashboardNav />
      <VendorDashboardHead />
      <br />
      <br />
      <div className="mx-auto mt-8 max-w-2xl md:mt-12">
        {userOrder?.orderStatus == 3 ? (
          <div className="bg-white shadow-lg">
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
                <ul className="-my-8">
                  <span className="mt-10 font-bold text-slate-400 text-sm">
                    Order ID:- #{userOrder?.orderId}
                  </span>
                  <div>
                    <div className="flex mt-2  mb-5">
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
                      <h3 className="font-semibold center text-gray-600 text-xs uppercase w-1/5 text-center">
                        Action
                      </h3>
                    </div>

                    {orderDetailsData?.map((scrapDetail, index) => (
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
                          <input
                            type="number"
                            step="0.5"
                            className="flex justify-center items-center text-center w-full "
                            // min={1}
                            onChange={(e) =>
                              updateQuantity(
                                scrapDetail.scrapId,
                                e.target.value
                              )
                            }
                            value={scrapDetail?.quantity}
                          />
                        </div>
                        <span className="text-center w-1/5 font-semibold text-sm">
                          ₹{scrapDetail?.price}
                        </span>
                        <span className="text-center w-1/5 font-semibold text-sm">
                          ₹{scrapDetail?.amount}
                        </span>
                        <span className="w-1/5 flex justify-center items-center">
                          <input
                            type="checkbox"
                            checked={quantityItem[scrapDetail.scrapId]}
                            className={`w-[50px] h-[17px] ordersettlementcheckbox ${
                              scrapDetail?.quantity > 0 &&
                              !quantityItem[scrapDetail.scrapId]
                                ? "cursor-pointer"
                                : scrapDetail?.quantity > 0 &&
                                  quantityItem[scrapDetail.scrapId]
                                ? "pointer-events-none"
                                : ""
                            }`}
                            onChange={() => {
                              finalScrapSettlement(
                                scrapDetail.scrapId,
                                scrapDetail?.quantity,
                                scrapDetail?.price
                              );
                            }}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </ul>
                {userOrder?.orderStatus === OrdersEnum.ARRVIED && (
                  <div className="mt-8 pl-16 relative flex items-center gap-4">
                    <p>Select your payment type</p>
                    <select
                      value={selectPayment}
                      onChange={handlePayment}
                      className="w-[50%] p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                    >
                      <option value="">Select payment method</option>
                      {payment?.map((option) => {
                        return (
                          <option
                            key={option.paymentType}
                            value={option.paymentType}
                          >
                            {option.paymentType}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
              <div className="mt-6 mb-6 flex text-center justify-end  space-x-4 border-t border-b">
                <p className="flex text-center absolute right-30  space-x-2">
                  Total - ₹ {calculateTotalPrice() ? calculateTotalPrice() : 0}
                </p>
                <div className="my-7 flex space-x-4">
                  {userOrder?.orderStatus !== OrdersEnum.SCRAP_PICKED ? (
                    <button
                      onClick={() =>
                        updateScrapOrderStatus(userOrder, OrdersEnum.REJECTED)
                      }
                      className={`text-center hover:text-white text-base font-semibold tracking-tight hover:bg-lime-600 bg-transparent border-2 border-zinc-500 text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-3  mt-5 cursor-pointer px-7 py-[.65rem] hover:border-2 hover:border-lime-600`}
                    >
                      Reject Pickup
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    disabled={
                      userOrder?.orderStatus === OrdersEnum.ARRVIED
                        ? selectPayment
                          ? false
                          : true
                        : false
                    }
                    onClick={() =>
                      updateScrapOrderStatus(
                        userOrder,
                        userOrder?.orderStatus + 1
                      )
                    }
                    className={`${
                      userOrder?.orderStatus === OrdersEnum.ARRVIED
                        ? selectPayment
                          ? " duration-200 bg-lime-600 flex items-center justify-center shadow-inner rounded-full mt-5 px-7 py-[.65rem] border-2 border-lime-600 tracking-wide"
                          : "bg-gray-400 cursor-not-allowed shadow-inner rounded-full mt-5 px-7 py-[.65rem] border-2"
                        : "duration-200 bg-lime-600 flex items-center justify-center shadow-inner rounded-full mt-5 px-7 py-[.65rem] border-2 border-lime-600 tracking-wide"
                    } `}
                  >
                    {buttonText[userOrder?.orderStatus]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg">
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
                <ul className="-my-8">
                  <span className="mt-10 font-bold text-slate-400 text-sm">
                    Order ID:- #{userOrder?.orderId}
                  </span>
                  <div>
                    <div className="flex mt-2  mb-5">
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
                </ul>
                {userOrder?.orderStatus === OrdersEnum.ARRVIED && (
                  <div className="pt-5 pl-5 relative right-0 lg:max-w-sm ">
                    <select
                      value={selectPayment}
                      onChange={handlePayment}
                      className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                    >
                      <option value="">Select State</option>
                      {payment?.map((option) => {
                        return (
                          <option
                            key={option.paymentType}
                            value={option.paymentType}
                          >
                            {option.paymentType}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
              <div className="mt-6 mb-6 flex text-center justify-end  space-x-4 border-t border-b">
                <p className="flex text-center absolute right-30  space-x-2">
                  Total - ₹ {userOrder?.finalAmount}
                </p>
                <div className="my-7 flex space-x-4">
                  {userOrder?.orderStatus !== OrdersEnum.SCRAP_PICKED ? (
                    <button
                      onClick={() =>
                        updateScrapOrderStatus(userOrder, OrdersEnum.REJECTED)
                      }
                      className={`text-center hover:text-white text-base font-semibold tracking-tight hover:bg-lime-600 bg-transparent border-2 border-zinc-500 text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-3  mt-5 cursor-pointer px-7 py-[.65rem] hover:border-2 hover:border-lime-600`}
                    >
                      Reject Pickup
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    disabled={
                      userOrder?.orderStatus === OrdersEnum.ARRVIED
                        ? selectPayment
                          ? false
                          : true
                        : false
                    }
                    onClick={() =>
                      updateScrapOrderStatus(
                        userOrder,
                        userOrder?.orderStatus + 1
                      )
                    }
                    className={`${
                      userOrder?.orderStatus === OrdersEnum.ARRVIED
                        ? selectPayment
                          ? " duration-200 bg-lime-600 flex items-center justify-center shadow-inner rounded-full mt-5 px-7 py-[.65rem] border-2 border-lime-600 tracking-wide"
                          : "bg-gray-400 cursor-not-allowed shadow-inner rounded-full mt-5 px-7 py-[.65rem] border-2"
                        : "duration-200 bg-lime-600 flex items-center justify-center shadow-inner rounded-full mt-5 px-7 py-[.65rem] border-2 border-lime-600 tracking-wide"
                    } `}
                  >
                    {buttonText[userOrder?.orderStatus]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboardOrderDetail;