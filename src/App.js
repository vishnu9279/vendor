import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import VendorDashboard from "./components/vendor/VendorDashboard";

import VendorDashboardOrder from "./components/vendor/VendorDashboardOrder";

import Wrapper from "./layout/Wrapper";
import { useSelector } from "react-redux";
import VendorDashboardRequestIssue from "./components/vendor/VendorDashboardRequestIssue";
import VendorDashboardArrived from "./components/vendor/VendorDashboardArrived";
import VendorDashboardPickupScrap from "./components/vendor/VendorDashboardPickupScrap";
import VendorSignup from "./components/vendor/Vendor_Auth/addDocuments";
import VendorForgetPassword from "./components/vendor/Vendor_Auth/VendorForgetPassword";

import VendorEnterOtp from "./components/vendor/VendorEnterOtp";

// import AdminDashboardHome from "./components/admin/Dashboard/AdminDashboardHome";
// import CustomerTables from "./components/admin/Dashboard/Customer/CustomerTables";

// import AdminDashboardSettings from "./components/admin/Dashboard/components/AdminDashboardSettings";
// import VendorPage from "./components/admin/Dashboard/Vendor/VendorPage";
// import BusinessIndustryChats from "./components/admin/Dashboard/components/Chats/BusinessIndustryChats";
import VendorRegister from "./components/vendor/Vendor_Auth/VendorRegister";
import VendorOtpRegister from "./components/vendor/Vendor_Auth/VendorOtpVerify";
import VendorSignIn from "./components/vendor/Vendor_Auth/VendorSignIn";
import OrderCompleted from "./components/vendor/OrderCompleted";
import Settings from "./components/vendor/Settings";
import AcceptedOrder from "./components/vendor/AcceptedOrder";
// import PriceCardComponent from "./components/vendor/components/PriceCard";
import Pricing from "./components/vendor/priceList";
import History from "./components/vendor/History";
import ContactScreen from "./pages/ContactUs";
import AboutUs from "./pages/AboutUsPage";
import VendorSign from "./components/vendor/Vendor_Auth/VendorSignTest";


import Protected from "./components/protected/protectedForComponent";
function App() {
  // const [userId, setUserId] = React.useState("");
  // const state = useSelector((state) => state.user);
  // const token = state?.data;

  // console.log(token, "+++++++");

  return (
    <div className="App">
     
        <Routes>
          {/* Vendor Part  */}

          <Route path="/" element={<VendorRegister />} />
          <Route path="/add-documents" element={<VendorSignup />} />
          <Route path="/vendor-otp" element={<VendorOtpRegister />} />
          <Route path="/vendor-signIn" element={<VendorSignIn />} />

          <Route
            path="/vendor-forgetpassword"
            element={<VendorForgetPassword />}
          />

          {/* Vendor Dashboard */}
          <Route path="/vendor-dashboard" element={< Protected Component={ VendorDashboard} />} />
          <Route path="/accept-order" element={< Protected Component= {AcceptedOrder} />} />
          {/* <Route path="/price" element={<Pricing />} /> */}

          {/* Order Pickup Flow */}
          <Route
            path="/vendor-dashboard-order"
            element={<Protected Component = {VendorDashboardOrder} />}
          />
          <Route
            path="/vendor-dashboard-request-issue"
            element={< Protected Component = {VendorDashboardRequestIssue} />}
          />
          <Route
            path="/vendor-dashboard-arrived"
            element={< Protected Component = {VendorDashboardArrived} />}
          />
          <Route
            path="/vendor-dashboard-pickup-scrap"
            element={< Protected Component = {VendorDashboardPickupScrap} />}
          />

          <Route path="/OrderCompleted" element={< Protected Component= {OrderCompleted} />} />

          <Route path="/Settings" element={ <Protected Component={Settings} />} />
          <Route path="/history" element={<History />} />
          <Route path="/contactUs" element={< Protected Component= {ContactScreen} />} />
          <Route path="/aboutUs" element={< Protected Component=  {AboutUs} />} />

          {/* <Route path="/vendor-enter-otp" element={< VendorEnterOtp />} /> */}
        </Routes>

    </div>
  );
}

export default App;
