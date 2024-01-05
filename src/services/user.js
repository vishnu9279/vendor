import showSuccessMessage from "../utils/SwalPopup";
import axiosInstance from "../api-config/axiosInstance";



const getCountries = async () => {
  try {
      const response = await axiosInstance.get("/getCountries");

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
    const resp = await axiosInstance.post("/otpVerify", payload);
    const dataObject = resp.data;
    console.log("response from api", dataObject);

    const userResp = JSON.parse(dataObject.data);
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
    const resp = await axiosInstance.post("/login", payload);
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
    const resp = await axiosInstance.post("/register", payload);
    const dataObject = resp.data;
    console.log("response from api", dataObject);

    const userResp = JSON.parse(dataObject.data);
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

export { otpVerifyService, 
  handleOTP,
  signUpUser,
  handlePhoneNumberValidation,
  getCountries,
  loginUser };
