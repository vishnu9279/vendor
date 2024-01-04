import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import VendorDashboard from "./components/vendor/VendorDashboard";

import VendorDashboardOrder from "./components/vendor/VendorDashboardOrder";


import Wrapper from "./layout/Wrapper";
import { useSelector } from "react-redux";
import VendorDashboardRequestIssue from "./components/vendor/VendorDashboardRequestIssue";
import VendorDashboardArrived from "./components/vendor/VendorDashboardArrived";
import VendorDashboardPickupScrap from "./components/vendor/VendorDashboardPickupScrap";
import VendorSignup from "./components/vendor/Vendor_Auth/VendorSIgnUp";
import VendorForgetPassword from "./components/vendor/Vendor_Auth/VendorForgetPassword";

import VendorEnterOtp from "./components/vendor/VendorEnterOtp";

import AdminDashboardHome from "./components/admin/Dashboard/AdminDashboardHome";
import CustomerTables from "./components/admin/Dashboard/Customer/CustomerTables";

import AdminDashboardSettings from "./components/admin/Dashboard/components/AdminDashboardSettings";
import VendorPage from "./components/admin/Dashboard/Vendor/VendorPage";
import BusinessIndustryChats from "./components/admin/Dashboard/components/Chats/BusinessIndustryChats";
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

function App() {
  const [userId, setUserId] = React.useState("");
  const state = useSelector((state) => state.user);
  const token = state?.data;

  const getId = (id) => setUserId(id);

  console.log(token, "+++++++");

  return (
    <div>
      <Wrapper token={token}>
        <div className="App">
          <Routes>



            {/* Vendor Part  */}

            <Route path="/" element={<VendorRegister />} />
            <Route path="/vendor-signup" element={<VendorSignup />} />
            <Route path="/vendor-otp" element={<VendorOtpRegister />} />
            <Route path="/vendor-signIn" element={<VendorSignIn />} />




            <Route
              path="/vendor-forgetpassword"
              element={<VendorForgetPassword />}
            />



            {/* Vendor Dashboard */}
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/accept-order" element={<AcceptedOrder />} />
            <Route path="/price" element={<Pricing />} />

            {/* Order Pickup Flow */}
            <Route
              path="/vendor-dashboard-order"
              element={<VendorDashboardOrder />}
            />
            <Route
              path="/vendor-dashboard-request-issue"
              element={<VendorDashboardRequestIssue />}
            />
            <Route
              path="/vendor-dashboard-arrived"
              element={<VendorDashboardArrived />}
            />
            <Route
              path="/vendor-dashboard-pickup-scrap"
              element={<VendorDashboardPickupScrap />}
            />

            <Route
              path="/OrderCompleted"
              element={<OrderCompleted />}
            />

            <Route path="/Settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
            <Route path="/contactUs" element={<ContactScreen />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/VendorSign" element={<VendorSign />} />




            <Route path="/vendor-enter-otp" element={<VendorEnterOtp />} />
            {/* ADMIN ROUTES */}
            <Route path="/admin-dashboard" element={<AdminDashboardHome />} />
            <Route path="/admin-dashboard/vendor" element={<VendorPage />} />
            <Route
              path="/admin-dashboard/customer_details"
              element={<CustomerTables />}
            />
            <Route
              path="/admin-dashboard-settings"
              element={<AdminDashboardSettings />}
            />
            <Route
              path="/business-industry-chats"
              element={<BusinessIndustryChats />}
            />
          </Routes>
        </div>
      </Wrapper>
    </div>
  );
}

export default App;
