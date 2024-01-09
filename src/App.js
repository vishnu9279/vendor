// import  { useEffect, useState } from "react";
// import { Route, Routes } from "react-router-dom";
import "./App.css";

// import VendorDashboard from "./components/vendor/VendorDashboard";

// import VendorDashboardOrder from "./components/vendor/VendorDashboardOrder";
// import AddDocuments from "./components/vendor/Vendor_Auth/AddDocuments";

// import VendorRegister from "./components/vendor/Vendor_Auth/VendorRegister";
// import VendorOtpRegister from "./components/vendor/Vendor_Auth/VendorOtpVerify";
// import VendorSignIn from "./components/vendor/Vendor_Auth/VendorSignIn";
// import Settings from "./components/vendor/Settings";
// // import History from "./components/vendor/History";
// import ContactScreen from "./pages/ContactUs";
// import AboutUs from "./pages/AboutUsPage";

// import Protected from "./components/protected/protectedForComponent";
// import Loader from "./components/Loader";
// import axiosInstance from "./api-config/axiosInstance";

// import {generateFCMToken, messaging} from "./services/fireBaseInit";
// import { onMessage} from "firebase/messaging";
// import VendorDashboardOrderDetail from "./components/vendor/VendorDashboardOrderDetail";

function App() {
  // const [loading, setLoading] = useState(false);
  
  // useEffect(() => {
  //   generateFCMToken();
  //   onMessage(messaging,(payload)=>{
  //     console.log("fcm payload", payload);
  //   })
  //   axiosInstance.interceptors.request.use(
  //     (config) => {
  //       setLoading(true);
        
  //       return config;
  //     },
  //     (error) => {
  //       // Handle request error
  //       setLoading(false);
  //       return Promise.reject(error);
  //     }
  //     );
      
  //     axiosInstance.interceptors.response.use(
  //       (response) => {
  //         console.log("axios response ", response);
  //         setLoading(false);
  //         return response;
  //       },
  //       (error) => {
  //         console.log("axiosInstance response error", error);
  //         setLoading(false);
          
  //         return Promise.reject(error);
  //       }
  //       );
  //     }, []);

  return (
    <div className="App">
      <>Hi React</>
    </div>
  );
}

export default App;
