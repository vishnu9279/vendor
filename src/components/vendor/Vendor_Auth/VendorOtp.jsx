import React from "react";
import Button from "../../../components/auth/Button";

import { useNavigate } from "react-router-dom";
import client from "../../../api/client";
import pic from "../../../assets/auth/vendor_signup.png";
const VendorOtp = ({ userId }) => {
  const [otp, setOtp] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const navigate = useNavigate();

  const handleOtp = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      const response = await client.patch(
        `/user/verify?userID=${userId}`,
        { otp: otp },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      if (response) {
        setLoader(false);
        alert(response?.data?.message);
        navigate("/login_signup");
      }
      console.log(response);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  //
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
              <p className="m-[0]">Enter OTP</p>
              <label className="block py-3 text-gray-500 text-[13px]">
                Enter the code sent to your phone number
              </label>
              <div className="flex items-center p-2 border rounded-[30px] bg-[#7adf3243]">
                <input
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  placeholder="Enter Your OTP"
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="">
            <Button
              label={loader ? "Loading please wait" : "Continue"}
              classname="w-[300px] input-content btn"
              handleClick={handleOtp}
            />{" "}
          </div>
          <p className="signup-para">
            Resend OTP
            <span
              // onClick={() => navigate("/")}
              className="text-signin cursor-pointer ml-1 underline"
            ></span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VendorOtp;
