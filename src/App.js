import  { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import VendorDashboard from "./components/vendor/VendorDashboard";

import VendorDashboardOrder from "./components/vendor/VendorDashboardOrder";

// import VendorDashboardRequestIssue from "./components/vendor/VendorDashboardRequestIssue";
// import VendorDashboardArrived from "./components/vendor/VendorDashboardArrived";
// import VendorDashboardPickupScrap from "./components/vendor/VendorDashboardPickupScrap";
import AddDocuments from "./components/vendor/Vendor_Auth/AddDocuments";

import VendorRegister from "./components/vendor/Vendor_Auth/VendorRegister";
import VendorOtpRegister from "./components/vendor/Vendor_Auth/VendorOtpVerify";
import VendorSignIn from "./components/vendor/Vendor_Auth/VendorSignIn";
// import OrderCompleted from "./components/vendor/OrderCompleted";
import Settings from "./components/vendor/Settings";
// import AcceptedOrder from "./components/vendor/AcceptedOrder";
// import History from "./components/vendor/History";
import ContactScreen from "./pages/ContactUs";
import AboutUs from "./pages/AboutUsPage";

import Protected from "./components/protected/protectedForComponent";
import Loader from "./components/Loader";
import axiosInstance from "./api-config/axiosInstance";

import {generateFCMToken, messaging} from "./services/fireBaseInit";
import { onMessage} from "firebase/messaging";
import VendorDashboardOrderDetail from "./components/vendor/VendorDashboardOrderDetail";

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
        {/* <Route
          path="/accept-order"
          element={<Protected Component={AcceptedOrder} />}
        /> */}
        {/* <Route path="/price" element={<Pricing />} /> */}

        {/* Order Pickup Flow */}
        {/* <Route
          path="/vendor-dashboard-request-issue"
          element={<Protected Component={VendorDashboardRequestIssue} />}
        />
        <Route
          path="/vendor-dashboard-arrived"
          element={<Protected Component={VendorDashboardArrived} />}
        />
        <Route
          path="/vendor-dashboard-pickup-scrap"
          element={<Protected Component={VendorDashboardPickupScrap} />}
        /> */}

        {/* <Route
          path="/OrderCompleted"
          element={<Protected Component={OrderCompleted} />}
        /> */}

        <Route path="/Settings" element={<Protected Component={Settings} />} />
        {/* <Route path="/history" element={<History />} /> */}
        <Route
          path="/contactUs"
          element={<Protected Component={ContactScreen} />}
        />
        <Route path="/aboutUs" element={<Protected Component={AboutUs} />} />
      </Routes>
    </div>
  );
}

export default App;
