import React, { useState } from "react";
import vendor from "../../../assets/PNG/tractor 2.png";
import SignupInput from "./SignupInput";
import Button from "../../auth/Button";
import Swal from "sweetalert2";
import axiosInstance from "../../../api-config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import scrapBus from '../../../assets/PNG/scrapbus.png'
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

    console.log("phoneNumberObj", location.state.mobile);
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
            phoneNumber: location.state.mobile
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
        <div className="small-devices bg-[#5AB344]">

            <div className="pl-10 pr-10">
                <img src={scrapBus} className="w-full h-[255px] xs:h-[400px]" alt="" />
            </div>
            <div className="bg-white -mt-12 p-10 rounded-t-lg">
                <div className="mt-5">
                    <h2 className="text-[#303030]  text-[32px] mt-2 mb-0">
                        Sign up now
                    </h2>
                    <p className="text-[#707070]  text-[14px]">
                        Create a new account in four simple steps
                    </p>
                </div>
                <form className="mt-5">
                    <SignupInput
                        input={{ label: "Enter OTP", name: "enter otp", type: "number" }}

                        inputMode='numeric'
                        pattern="[0-9]*"
                        maxlength="6"
                        handleChange={handlePhoneNumberChange}
                    />
                    <div className="mt-20">
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
                    </div>
                </form>
            </div>
        </div>


    );
};

export default OtpSmall;
