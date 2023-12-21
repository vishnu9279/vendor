import React, { useState } from "react";
import vendor from "../../../assets/PNG/tractor 2.png";
import SignupInput from "./SignupInput";
import Button from "../../auth/Button";
import Swal from "sweetalert2";
import axiosInstance from "../../../api-config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const OtpSmall = () => {

    const [checked,
        setChecked] = React.useState(true);
    const [otp,
        setOtp] = useState("");
    const [isValidPhoneNumber,
        setIsValidPhoneNumber] = useState(false);
    const navigate = useNavigate();
    const [preview, setPreview] = useState("");
    const [imageKey, setImageKey] = useState("");

    const location = useLocation();

    console.log("phoneNumberObj", location.state.phoneNumber);
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const phoneRegex = /^\d{6}$/;
        const isValid = phoneRegex.test(value);

        setOtp(value);
        setIsValidPhoneNumber(isValid);
    };
    const otpVerifyService = async () => {
        const payload = {
            otp: otp,
            phoneNumber: location.state.phoneNumber
        };

        try {
            const resp = await axiosInstance.post("/otpVerify", payload);
            const dataObject = resp.data;
            const tokenParse = JSON.parse(dataObject.data);
            console.log("response from api", resp)
            console.log("token", tokenParse.token);
            localStorage.setItem("token", tokenParse.token);

            const data = JSON.parse(resp.data.data);
            if (dataObject.statusCode === 200) {
                if (data.isDocumentUploaded === false) {
                    navigate("/vendor-signup", {
                        state: {
                            id: data.userId,
                        },
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        showConfirmButton: false,
                        timer: 2500,
                        title: dataObject.message
                    });
                    console.log("token store ", localStorage.getItem("token"));

                    navigate("/vendor-dashboard", {

                    });
                }



            }
        }
        catch (error) {
            console.error("Error", error);

            if (error.response) { // status code out of the range of 2xx
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: error.response.data.error._message
                });

                console.log("Status :" + error.response.status);
            }
            else if (error.request) { // The request was made but no response was received
                console.log(error.request);
            }
            else {// Error on setting up the request
                console.log("Error", error.message);
            }
        }
    };


    return (
        <div className="small-devices p-5">
            <div className="shadow-lg">
                <h2 className="text-center font-semibold text-[16.55px] text-[#5AB344] border-b-2 border-b-[#5AB344] p-5 mt-5">
                    OTP Verify
                </h2>
                <div className="pl-10 pr-10">
                    <img src={vendor} className="w-full h-[255px] xs:h-[400px]" alt="" />
                </div>
                <div>
                    <h2 className="text-[#303030] text-center text-[32px] mt-2 mb-0">
                        Welcome, Vendor!
                    </h2>
                    <p className="text-[#707070] text-center text-[14px]">
                        OTP Verify
                    </p>
                </div>
                <form className="p-5">
                    <SignupInput
                        input={{ label: "Enter OTP", name: "enter otp", type: "number" }}

                        inputMode='numeric'
                        pattern="[0-9]*"
                        maxlength="6"
                        handleChange={handlePhoneNumberChange}
                    />

                    <Button handleClick={otpVerifyService}
                        label="Verify"
                        classname="w-full bg-[#5AB344] h-[48px] p-3 font-semibold text-white mt-7 rounded-[27px]"
                    />
                    <p className="text-[14px] text-[#4A4A4A] mt-2 text-center font-[400]">
                        Don't have an account?{" "}
                        <span className="text-[#81D742] hover:font-semibold hover:underline cursor-pointer">
                            Sign Up
                        </span>
                    </p>
                </form>
            </div>

        </div>
    );
};

export default OtpSmall;
