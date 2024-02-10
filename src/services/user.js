import showSuccessMessage from "../utils/SwalPopup";
import axiosInstance from "../api-config/axiosInstance";
import {generateFCMToken} from "../services/fireBaseInit";

const getCountries = async () => {
  try {
      const response = await axiosInstance.get("/vendor/getCountries");

      const countriesAndStatesData = JSON.parse(response.data.data);

      console.log("countriesAndStatesData", countriesAndStatesData);
      return countriesAndStatesData;

  }
  catch (error) {
    console.error("Error While Otp Verify", error);
    if (error.response) {
      // Handle specific server response errors
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
      showSuccessMessage(errorMessage, "error");
    } else {
      // Handle other types of errors
      showSuccessMessage("An error occurred", "error");
    }
    throw error; // Rethrow the error to propagate it to the calling code
  
  }
};

const handleOTP = (otp) => {
  console.log("handle Otp", otp);
  const phoneRegex = /^\d{6}$/;
  const isValid = phoneRegex.test(otp);
  return isValid;
};
const otpVerifyService = async (phoneNumber, otp) => {
  const payload = {
    otp,
    phoneNumber,
  };

  try {
    console.log("payload", payload);
    const resp = await axiosInstance.post("/vendor/otpVerify", payload);
    const dataObject = JSON.parse(resp.data.data);
    console.log("response from api", dataObject);

    return dataObject;
  } catch (error) {
    console.error("Error While Otp Verify", error);
    if (error.response) {
      // Handle specific server response errors
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
      showSuccessMessage(errorMessage, "error");
    } else {
      // Handle other types of errors
      showSuccessMessage("An error occurred", "error");
    }
    throw error; // Rethrow the error to propagate it to the calling code
  }
};

const handlePhoneNumberValidation = (phoneNumber) => {
  console.log("handlePhoneNumberValidation working",phoneNumber);
  const phoneRegex = /^\d{10}$/;
  const isValid = phoneRegex.test(phoneNumber);

  console.log("isValid", isValid);
  return isValid;
};

const loginUser = async(dialCode,phoneNumber)=>{
  const payload = {
    dialCode,
    phoneNumber,
  };

  try {
    console.log("payload", payload);
    const resp = await axiosInstance.post("/vendor/login", payload);
    const dataObject = resp.data;
    console.log("response from api", dataObject);

    const userResp = JSON.parse(dataObject.data);
    console.log("userResp", userResp);
    showSuccessMessage(dataObject.message, "success");
    return userResp;
  } catch (error) {
    console.error("Error While Otp Verify", error);
    if (error.response) {
      // Handle specific server response errors
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
      showSuccessMessage(errorMessage, "error");
    } else {
      // Handle other types of errors
      showSuccessMessage("An error occurred", "error");
    }
    throw error; // Rethrow the error to propagate it to the calling code
  }
}

const signUpUser = async(dialCode,phoneNumber)=>{
  const payload = {
    dialCode,
    phoneNumber,
  };

  try {
    console.log("payload", payload);
    const resp = await axiosInstance.post("/vendor/register", payload);
    const dataObject = resp.data;
    console.log("response from api", dataObject);

    const userResp = JSON.parse(dataObject.data);
    showSuccessMessage(dataObject.message, "success");
    console.log("userResp", userResp);
    return userResp;
  } catch (error) {
    console.error("Error While Otp Verify", error);
    if (error.response) {
      // Handle specific server response errors
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
      showSuccessMessage(errorMessage, "error");
    } else {
      // Handle other types of errors
      showSuccessMessage("An error occurred", "error");
    }
    throw error; // Rethrow the error to propagate it to the calling code
  }
}

const resendOtpService = async(dialCode,phoneNumber)=>{
  const payload = {
    dialCode,
    phoneNumber,
  };

  try {
    console.log("payload", payload);
    const otpResp = await axiosInstance.post("/vendor/resendOtp", payload);

    console.log("userResp", otpResp);
    return otpResp.data;
  } catch (error) {
    console.error("Error While Otp Verify", error);
    if (error.response) {
      // Handle specific server response errors
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
      showSuccessMessage(errorMessage, "error");
    } else {
      // Handle other types of errors
      showSuccessMessage("An error occurred", "error");
    }
    throw error; // Rethrow the error to propagate it to the calling code
  }
}

const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/vendor/getCurrentUser");
    console.log("get User data", response);
    const user = JSON.parse(response.data.data);
    return user
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
};

const changeUserActiveStatusTogggleButtonService = async (userActiveStatus)=>{
  const payload = {
    "isActive": JSON.stringify(userActiveStatus)
  }
  try {
    const response = await axiosInstance.post("/vendor/updateActiveStatus",payload);
    console.log("get User data", response);
    const user = JSON.parse(response.data.data);
    await generateFCMToken();
    return user
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}

export { otpVerifyService, 
  handleOTP,
  signUpUser,
  handlePhoneNumberValidation,
  getCountries,
  loginUser,
  resendOtpService,
  getCurrentUser,
  changeUserActiveStatusTogggleButtonService};
