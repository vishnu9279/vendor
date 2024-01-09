import  { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import VendorDashboard from "./components/vendor/VendorDashboard";

import VendorDashboardOrder from "./components/vendor/VendorDashboardOrder";
import AddDocuments from "./components/vendor/Vendor_Auth/AddDocuments";

import VendorRegister from "./components/vendor/Vendor_Auth/VendorRegister";
import VendorOtpRegister from "./components/vendor/Vendor_Auth/VendorOtpVerify";
import VendorSignIn from "./components/vendor/Vendor_Auth/VendorSignIn";
import Settings from "./components/vendor/Settings";
import History from "./components/vendor/History";
import ContactScreen from "./pages/ContactUs";
import AboutUs from "./pages/AboutUsPage";
import Protected from "./components/protected/protectedForComponent";
import Loader from "./components/Loader";
import axiosInstance from "./api-config/axiosInstance";
import {generateFCMToken, messaging} from "./services/fireBaseInit";
import { onMessage} from "firebase/messaging";
import VendorDashboardOrderDetail from "./components/vendor/VendorDashboardOrderDetail";
import VendorDashboardOrderHistory from "./components/vendor/VendorDashboardOrderHistory";

function App() {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    generateFCMToken();
    onMessage(messaging,(payload)=>{
      console.log("fcm payload", payload);
    })
    axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);
        
        return config;
      },
      (error) => {
        // Handle request error
        setLoading(false);
        return Promise.reject(error);
      }
      );
      
      axiosInstance.interceptors.response.use(
        (response) => {
          console.log("axios response ", response);
          setLoading(false);
          return response;
        },
        (error) => {
          console.log("axiosInstance response error", error);
          setLoading(false);
          
          return Promise.reject(error);
        }
        );
      }, []);

  return (
    <div className="App">
      <Loader show={loading} />
      <Routes>
        {/* Vendor Part  */}

        <Route path="/" element={<VendorRegister />} />
        <Route path="/add-documents" element={<AddDocuments />} />
        <Route path="/vendor-otp" element={<VendorOtpRegister />} />
        <Route path="/vendor-signIn" element={<VendorSignIn />} />

        {/* Vendor Dashboard */}
        <Route
          path="/vendor-dashboard"
          element={<Protected Component={VendorDashboard} />}
        />
          <Route
            path="/vendor-dashboard-order"
            element={<Protected Component={VendorDashboardOrder} />}
          />
           <Route
            path="/order-detail/:orderId"
            element={<Protected Component={VendorDashboardOrderDetail} />}
          />
           <Route path="/Settings" element={<Protected Component={Settings} />} />
        <Route
          path="/contactUs"
          element={<Protected Component={ContactScreen} />}
        />
        <Route path="/aboutUs" element={<Protected Component={AboutUs} />} />

        <Route path="/history" element={<Protected Component={History} />} />
        <Route path="/order-history-detail/:orderId" element={<Protected Component={VendorDashboardOrderHistory} />} />
       
      </Routes>
    </div>
  );
}

export default App;
