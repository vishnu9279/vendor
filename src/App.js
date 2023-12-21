import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/about-us-component/AboutUs";
import Homepage from "./components/hompage/Homepage";
import HomeScreen from "./components/contactus/HomeScreen";
import RequestPickup from "./components/pages/RequestPickup";
import CartList from "./components/Cart/CartList";
import Pricing from "./pages/Pricing";
import UploadScrap from "./components/Cart/UploadScrap";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import Faqs from "./pages/Faqs";
import ForgotPasswordPageOne from "./pages/ForgotPasswordPageOne";
import ForgotPasswordPageTwo from "./pages/ForgotPasswordPageTwo";
import VendorDashboard from "./components/vendor/VendorDashboard";
import OrderSuccessful from "./pages/OrderSuccessful";
import VendorDashboardOrder from "./components/vendor/VendorDashboardOrder";
import ForgotPageThree from "./pages/ForgotPageThree";
import EnterOtp from "./pages/EnterOtp";
import Wrapper from "./layout/Wrapper";
import { useSelector } from "react-redux";
import VendorDashboardRequestIssue from "./components/vendor/VendorDashboardRequestIssue";
import VendorDashboardArrived from "./components/vendor/VendorDashboardArrived";
import VendorDashboardPickupScrap from "./components/vendor/VendorDashboardPickupScrap";
import VendorSignup from "./components/vendor/Vendor_Auth/VendorSIgnUp";
import VendorForgetPassword from "./components/vendor/Vendor_Auth/VendorForgetPassword";
import VendorOtp from "./components/vendor/Vendor_Auth/VendorOtp";
import VendorSignin from "./components/vendor/VendorSignin";
import VendorEnterOtp from "./components/vendor/VendorEnterOtp";

import AdminDashboardHome from "./components/admin/Dashboard/AdminDashboardHome";
import CustomerTables from "./components/admin/Dashboard/Customer/CustomerTables";
import Signup from "./pages/Signup";
import AdminDashboardSettings from "./components/admin/Dashboard/components/AdminDashboardSettings";
import VendorPage from "./components/admin/Dashboard/Vendor/VendorPage";
import BusinessIndustryChats from "./components/admin/Dashboard/components/Chats/BusinessIndustryChats";
import VendorRegister from "./components/vendor/Vendor_Auth/VendorRegister";
import VendorOtpRegister from "./components/vendor/Vendor_Auth/VendorOtpVerify";
import VendorSignIn from "./components/vendor/Vendor_Auth/VendorSignIn";
import OrderCompleted from "./components/vendor/OrderCompleted";

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
            <Route path="/home" element={<Homepage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact-us" element={<HomeScreen />} />
            <Route path="/request_pickup" element={<RequestPickup />} />
            <Route path="/cart" element={<CartList />} />

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/upload-scrap" element={<UploadScrap />} />

            <Route
              path="/login_signup"
              element={<Login getId={getId} userId={userId} />}
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/order-successful" element={<OrderSuccessful />} />
            <Route path="/enter-otp" element={<EnterOtp userId={userId} />} />
            <Route path="/pagethree" element={<ForgotPageThree />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/forgot-password-page1"
              element={<ForgotPasswordPageOne />}
            />
            <Route
              path="/forgot-password-page2"
              element={<ForgotPasswordPageTwo />}
            />


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
