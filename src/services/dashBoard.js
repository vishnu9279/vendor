// import showSuccessMessage from "../utils/SwalPopup";
import axiosInstance from "../api-config/axiosInstance";
import showSuccessMessage from "../utils/SwalPopup";

const scrapOrdersService = async (queryString,obj,skip,perPageCount) => {
    try {
      // const response = await axiosInstance.get(`/vendor/getVendorOrder?page=0&limit=10&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
      const response = await axiosInstance.get(`/vendor/getVendorOrder?limit=${perPageCount}&page=${skip}&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
    
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
        const response = await axiosInstance.post("/vendor/updateOrderStatus", payload);
        return response;
    } catch (error) {
        console.error("Error while Updating order Status", error);
    }
}

const scrapOrdersInfoService = async (orderId)=>{
  console.log("scrapOrdersInfoService working",orderId);
  try {
    const response = await axiosInstance.get(`/vendor/getVendorOrderInfo?orderId=${orderId}`);
    console.log("getVendorOrderInfo",response);
        return response;
  } catch (error) {
    console.error("Error while Updating order Status", error);
  }
}

const getPaymentModeService = async ()=>{
  console.log("getPaymentModeService working",);
  try {
    const response = await axiosInstance.get("/vendor/getPaymentType");
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
      const response = await axiosInstance.post("/vendor/updatePaymentMethod", payload);
      return response;
  } catch (error) {
      console.error("Error while Updating order Status", error);
  }
}
const vendorScrapOrderConfirmation=async(scrapInfo)=>{
  try {
    console.log("updatePaymentMethodService working", scrapInfo);
    const response = await axiosInstance.post("/vendor/vendorScrapOrderConfirmation", scrapInfo);
    return response;
  } catch (error) {
      console.error("Error while Updating order Status", error);
  }
}
const downloadPdfService=async(orderId)=>{
  try {
    console.log("downloadPdfService working", orderId);
    const response = await axiosInstance.get(`/vendor/downloadInvoice?orderId=${orderId}`);
    return response;
  } catch (error) {
      console.error("Error while Updating order Status", error);
  }
}

const generateSignedUrl = async (fileName, contentType, userId) => {
  try {
    const payload = {
      ContentType: contentType,
      fileName,
      uploadType: "DOCUMENTS",
      userId,
    };
    console.log("generateSignedUrl function work", payload);
    const signedUrl = await axiosInstance.post(
      "/vendor/generateS3UploadSignedUrl",
      payload
    );
    return JSON.parse(signedUrl.data.data);
  } catch (error) {
    console.error("Error While Uploading File", error);
    showSuccessMessage(error.response.data.error._message, "error");
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
    console.log("uploadFileOnS3 work",uploadResponse);
    return uploadResponse;
  } catch (error) {
    showSuccessMessage("Error While Uploading Image", "error");
  }
};

const deleteAccountService = async (deletionReason) => {
  try {
    const payload = {
      deletionReason,
    };
    console.log("deletionReason function work", payload);
     await axiosInstance.post(
      "/vendor/deleteAccount",
      payload
    );
    return true
  } catch (error) {
    console.error("Error While Uploading File", error);
    showSuccessMessage(error.response.data.error._message, "error");
  }
};
const logOutService = async () => {
  try {
    await axiosInstance.get("/vendor/logout");
    localStorage.clear();
    return true
  } catch (error) {
    console.error("error", error);
    const errorMessage = !error.response.data.error.message
      ? error.response.data.error?._message
      : error.response.data.error.message;

    showSuccessMessage(errorMessage, "error");
  }
};
export { 
  logOutService,
  scrapOrdersService,
  updateScrapOrderStatusService,
  scrapOrdersInfoService,
  getPaymentModeService,
  updatePaymentMethodService,
  vendorScrapOrderConfirmation,
  downloadPdfService,
  generateSignedUrl,
  uploadFileOnS3,
  deleteAccountService};
