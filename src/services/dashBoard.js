// import showSuccessMessage from "../utils/SwalPopup";
import axiosInstance from "../api-config/axiosInstance";

const scrapOrdersService = async (queryString,obj) => {
    try {
      const response = await axiosInstance.get(`/getVendorOrder?page=0&limit=10&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
    
      const resposeParsing = JSON.parse(response.data.data);
      console.log("getVendorOrder data parsing", resposeParsing);
      return resposeParsing
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const scrapOrdersSearchFilterService = async (obj) => {
    try {
      const response = await axiosInstance.get(`/getVendorOrder?page=0&limit=10&key=${obj.key}`);
    
      const resposeParsing = JSON.parse(response.data.data);
      console.log("getVendorOrder data parsing", resposeParsing);
      return resposeParsing
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

const updateScrapOrderStatusService = async (orderId,orderStatus)=>{
    const payload = {
        orderId,
        orderStatus
    }
    try {
        const response = await axiosInstance.post("/updateOrderStatus", payload);
        return response;
    } catch (error) {
        console.error("Error while Updating order Status", error);
    }
}

const scrapOrdersInfoService = async (orderId)=>{
  console.log("scrapOrdersInfoService working",orderId);
  try {
    const response = await axiosInstance.get(`/getVendorOrderInfo?orderId=${orderId}`);
    console.log("getVendorOrderInfo",response);
        return response;
  } catch (error) {
    console.error("Error while Updating order Status", error);
  }
}

const getPaymentModeService = async ()=>{
  console.log("getPaymentModeService working",);
  try {
    const response = await axiosInstance.get("/getPaymentType");
    console.log("getPaymentModeService",response);
        return response;
  } catch (error) {
    console.error("Error while Updating order Status", error);
  }
}

const updatePaymentMethodService = async (payment,orderId)=>{
  const payload = {
    "paymentType": payment,
    "orderId": orderId
  }
  try {
    console.log("updatePaymentMethodService working", payload);
      const response = await axiosInstance.post("/updatePaymentMethod", payload);
      return response;
  } catch (error) {
      console.error("Error while Updating order Status", error);
  }
}

export { scrapOrdersService,
  updateScrapOrderStatusService,
  scrapOrdersInfoService,
  getPaymentModeService,
  updatePaymentMethodService,
  scrapOrdersSearchFilterService};
