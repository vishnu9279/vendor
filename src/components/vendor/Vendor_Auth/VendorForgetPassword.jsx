import React from "react";
import SigupInput from "../../auth/SigupInput";
import Button from "../../auth/Button";
import client from "../../../api/client";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/auth/vendor_signup.png";
const VendorForgetPassword = ({ userId, getUserId }) => {
  const [state, setState] = React.useState({
    fullname: "",
    phonenumber: "",
    password: "",
    pincode: "",
    address: "",
    otp: "",
    city: "",
    landmark: "",
  });

  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  React.useEffect(() => {
    if (success) {
      setError("");
    }
    if (error) {
      setSuccess("");
    }
  }, [error, success]);

  const { otp, ...rest } = state;

  return (
    <div className="flex flex-col md:flex-row items-center sm:p-[50px] min-er:p-[50px]">
      <div className="md:w-1/2 p-5">
        <img src={pic} alt="Vendor Signup" className="w-full" />
      </div>
      <div className="md:w-[45%] shadow-lg p-5">
        <h1 className="font-bold text-3xl text-green-500 text-center mb-5">
          Vendor
        </h1>
        <div className="w-full h-[1.5px] bg-green-500 mb-5"></div>
        <form className="signup-content ">
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">Reset password</label>
              <div className="flex items-center p-2 border rounded-[30px] bg-[#7adf3243]">
                <input
                  placeholder="Enter Your Password"
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="">
            <Button
              style={{ fontFamily: "Gilroy-Regular" }}
              classname="input-content signin-btn btn btn-signup"
              label={loader ? "Loading..." : "Continue"}
            />
          </div>
          <p className="signup-para">
            Already have an account ,
            <span
              onClick={() => navigate("/")}
              className="text-signin cursor-pointer ml-1 underline"
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VendorForgetPassword;
