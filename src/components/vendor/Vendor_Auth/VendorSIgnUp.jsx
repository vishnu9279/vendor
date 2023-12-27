import React, { useEffect, useState } from "react";
import Button from "../../auth/Button";
import customer from "../../../assets/PNG/tractor 2.png";
import Input from "../../auth/Input";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import { useLocation, useNavigate } from "react-router-dom";
import SmallDevices from "../components/SmallDevices";
import client from "../../../api/client";
import LabeledInput from "../../auth/LabeledInput";
import Swal from "sweetalert2";
import { serverUrl } from "../../../api-config/config";
import axios from "axios";
import axiosInstance from "../../../api-config/axiosInstance";



const VendorSignup = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [otp, setOtp] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const navigate = useNavigate();
  const [previewAdhar, setPreviewAdhar] = useState("");
  const [previewPanCard, setPreviewPanCard] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [adharCard, setAdharCard] = useState("");
  const [panCard, setPanCard] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDialCode, setDialCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countriesAndStates, setcountriesAndStates] = useState([]);

  const [address, setAddress] = useState("");

  const {
    state
  } = useLocation(); const {
    id
  } = state;

  console.log("Scrap Id", id);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getCountries");

      const countriesAndStatesData = JSON.parse(response.data.data);

      console.log("countriesAndStatesData", countriesAndStatesData);

      setcountriesAndStates(countriesAndStatesData);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  console.log("countriesAndStates", countriesAndStates);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;

    console.log("selectedCountry", selectedCountry);
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    for (let i = 0; countriesAndStates.length > i; i++) {
      console.log("dial Code", countriesAndStates[0].phone_code);
      setDialCode(`${countriesAndStates[0].phone_code}`);
    }
  };
  // Get the list of states based on the selected country
  const states = selectedCountry
    ? countriesAndStates.find((country) => country.iso2 === selectedCountry)
      ?.states || []
    : [];
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  // Get the list of cities based on the selected state
  const cities =
    states.filter((el) => {
      if (el.state_code === selectedState)
        return el.cities;
    })[0]?.cities || [];

  const handleCityChange = (event) => {
    const citySelected = event.target.value;

    setSelectedCity(citySelected);
  };


  const headers = {
    // "Content-Type": "application/json",
    platform: "web"
  };

  const uploadAdhar = async (e) => {
    console.log("file ", e.target.files[0])
    const file = e.target.files[0];
    const previewUrl = file.name;

    setPreviewAdhar(previewUrl);
    const payload = {
      ContentType: file.type,
      fileName: file.name,
      uploadType: "DOCUMENTS",
      userId: id
    };

    try {
      const signedUrl = await axios.post(`${serverUrl}/generateS3UploadSignedUrl`, payload, {
        headers: headers
      });
      //  console.log('image signed url outside axios block', signedUrl);

      const imageSignedObj = JSON.parse(signedUrl.data.data);

      console.log("start ", adharCard);


      setAdharCard(imageSignedObj.key);
      console.log("end ", adharCard);

      console.log("image signed url outside axios block", imageSignedObj.signedUrl, imageSignedObj.key);
      console.log("dead end ", adharCard);
      const uploadResponse = await fetch(imageSignedObj.signedUrl, {
        body: file,
        headers: {
          "Content-Type": file.type // Set the Content-Type header based on the image type
        },
        method: "PUT"
      });

      console.log("uploadResponse", uploadResponse);
    }
    catch (error) {
      console.error("Error fetching data:", error);

      if (error.response.status === 401) {
        const data = error.response;
        console.log("error more", data)
        // If server responded with a status code for a request  
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: data.data.error
        });

      }
      else if (error.request) {
        // Client made a request but response is not received 
        console.log("<<<<<<<Response Not Received>>>>>>>>");
        console.log(error.request);
      }
      else {
        // Other case 
        console.log("Error", error.message);
      }
    }
  };
  const uploadPanCard = async (e) => {
    console.log("file ", e.target.files[0])
    const file = e.target.files[0];
    const previewUrl = file.name;

    setPreviewPanCard(previewUrl);
    const payload = {
      ContentType: file.type,
      fileName: file.name,
      uploadType: "DOCUMENTS",
      userId: id
    };

    try {
      const signedUrl = await axios.post(`${serverUrl}/generateS3UploadSignedUrl`, payload, {
        headers: headers
      });
      //  console.log('image signed url outside axios block', signedUrl);

      const imageSignedObj = JSON.parse(signedUrl.data.data);

      setPanCard(imageSignedObj.key);

      console.log("image signed url outside axios block", imageSignedObj.signedUrl, imageSignedObj.key);

      const uploadResponse = await fetch(imageSignedObj.signedUrl, {
        body: file,
        headers: {
          "Content-Type": file.type // Set the Content-Type header based on the image type
        },
        method: "PUT"
      });

      console.log("uploadResponse", uploadResponse);
    }
    catch (error) {
      console.error("Error fetching data:", error);

      if (error.response.status === 401) {
        const data = error.response;
        console.log("error more", data)
        // If server responded with a status code for a request  
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: data.data.error
        });

      }
      else if (error.request) {
        // Client made a request but response is not received 
        console.log("<<<<<<<Response Not Received>>>>>>>>");
        console.log(error.request);
      }
      else {
        // Other case 
        console.log("Error", error.message);
      }
    }
  };

  const uploadPhoto = async (e) => {
    console.log("file ", e.target.files[0])
    const file = e.target.files[0];
    const previewUrl = file.name;

    setPreviewPhoto(previewUrl);
    const payload = {
      ContentType: file.type,
      fileName: file.name,
      uploadType: "DOCUMENTS",
      userId: id
    };

    try {
      const signedUrl = await axios.post(`${serverUrl}/generateS3UploadSignedUrl`, payload, {
        headers: headers
      });
      //  console.log('image signed url outside axios block', signedUrl);

      const imageSignedObj = JSON.parse(signedUrl.data.data);

      setPhoto(imageSignedObj.key);

      console.log("image signed url outside axios block", imageSignedObj.signedUrl, imageSignedObj.key);

      const uploadResponse = await fetch(imageSignedObj.signedUrl, {
        body: file,
        headers: {
          "Content-Type": file.type // Set the Content-Type header based on the image type
        },
        method: "PUT"
      });

      console.log("uploadResponse", uploadResponse);
    }
    catch (error) {
      console.error("Error fetching data:", error);

      if (error.response.status === 401) {
        const data = error.response;
        console.log("error more", data)
        // If server responded with a status code for a request  
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: data.data.error
        });

      }
      else if (error.request) {
        // Client made a request but response is not received 
        console.log("<<<<<<<Response Not Received>>>>>>>>");
        console.log(error.request);
      }
      else {
        // Other case 
        console.log("Error", error.message);
      }
    }
  };





  const signUpService = async () => {
    const payload = {
      "userId": id,
      "firstName": firstName,
      "lastName": lastName,
      "aadhaarID": adharCard,
      "panID": panCard,
      "profile": photo,
      "city": selectedCity,
      "countryCode": selectedCountry,
      "stateCode": selectedState,
      "address": address
    };

    try {
      const resp = await axiosInstance.post("/uploadDocument", payload);
      const dataObject = resp.data;

      if (dataObject.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: true,
          timer: 2500,
          title: dataObject.message
        });
        navigate("/vendor-dashboard",);
      }
    }
    catch (error) {
      console.error("error", error);

      if (error.response) {
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: error.response.data.error._message
        });
      }
      else if (error.request) {
        // Client made a request but response is not received 
        console.log("<<<<<<<Response Not Received>>>>>>>>");
        console.log(error.request);
      }
      else {
        // Other case 
        console.log("Error", error.message);
      }
      // Error handling here 
    }
  };


  return (
    <>
      {/* <SmallDevices /> */}
      <div className="flex flex-col signup-container lg:pl-[50px] lg:pr-[50px]">
        <div className="p-5 width">
          <h2 className="head text-[38px] md:text-[48px] mt-10 mb-2 font-[600] text-white hidden">
            Welcome To <span className="text-[#5AB344]">JunkBazar</span>
          </h2>
          <p className="head hidden text-[20px] md:text-[24px] text-white font-[400]">
            Sign up to enjoy exclusive access!
          </p>
          <img
            src={customer}
            alt=""
            className="signup-img w-[251px] h-[251px] mx-auto xs:w-[320px] xs:h-[450px] max-w-[886px] lg:h-[500px]"
          />
        </div>
        <div className="form-data-content width pl-12 pr-12 p-6 mr-5 w-full max-w-[772px] bg-white">
          <h2 className="text-[#333333] font-semibold text-[24px] mt-6 mb-2 xs:text-[28px]">
            Sign up now
          </h2>
          <p className="text-[#707070] text-[16px] font-medium mt-0 xs:text-[19px]">
            Create a new account in three simple steps
          </p>
          <div className="w-full flex justify-between mt-8 mb-5">

          </div>
          <form className="mt-5">
            <div className="grid  grid-cols-2 gap-6">

              <div>
                <label className="block py-3 text-black">First Name</label>
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  <input
                    required
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    placeholder="Enter Address"
                    className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                  />
                </div>
              </div>


              <div>
                <label className="block py-3 text-black">Last Name</label>
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  <input
                    required
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    placeholder="Enter Address"
                    className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                  />
                </div>
              </div>


            </div>
            <p className="text-[#666666] text-[16px] mt-5">Upload Adhar Card</p>
            <div className="col-span-6 sm:col-span-3 ">
              <div className="relative">
                <label
                  htmlFor="pix1"
                  className="cursor-pointer block bg-[#80d7421c] border border-gray-300 hover:border-gray-400 rounded-md p-4 text-center"
                >
                  {previewAdhar ? (
                    <p>{previewAdhar}</p>
                  ) : (
                    <span className="text-gray-500 mb-4">Upload Adhar Card</span>
                  )}
                </label>
                <input
                  id="pix1"
                  type="file"
                  className="hidden"
                  onChange={uploadAdhar}
                />
              </div>
            </div>
            <p className="text-[#666666] text-[16px] mt-5">Upload Pan Card</p>
            <div className="col-span-6 sm:col-span-3 ">
              <div className="relative">
                <label
                  htmlFor="pix2"
                  className="cursor-pointer block bg-[#80d7421c] border border-gray-300 hover:border-gray-400 rounded-md p-4 text-center"
                >
                  {previewPanCard ? (
                    <p>{previewPanCard}</p>
                  ) : (
                    <span className="text-gray-500 mb-4">Upload Pan Card</span>
                  )}
                </label>
                <input
                  id="pix2"
                  type="file"
                  className="hidden"
                  onChange={uploadPanCard}
                />
              </div>
            </div>
            <p className="text-[#666666] text-[16px] mt-5">Upload Photo</p>
            <div className="col-span-6 sm:col-span-3 ">
              <div className="relative">
                <label
                  htmlFor="pix3"
                  className="cursor-pointer block bg-[#80d7421c] border border-gray-300 hover:border-gray-400 rounded-md p-4 text-center"
                >
                  {previewPhoto ? (
                    <p>{previewPhoto}</p>
                  ) : (
                    <span className="text-gray-500 mb-4">Upload Photo</span>
                  )}
                </label>
                <input
                  id="pix3"
                  type="file"
                  className="hidden"
                  onChange={uploadPhoto}
                />
              </div>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <div>
                <label className="block py-3 text-black">Enter Address</label>
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  <input
                    required
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Enter Address"
                    className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <div className="grid  grid-cols-2 gap-6">
                <div>
                  <label className="block py-3 text-black">Select Country</label>
                  <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                    <div className="w-full">
                      <select className="w-full bg-[#80d7421c] p-1"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                      >
                        <option value="">Select Country</option>
                        {countriesAndStates.map((country) => (
                          <option key={country.iso2} value={country.iso2}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block py-3 text-black">Select State</label>
                  <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                    <div className="w-full">
                      <select className="w-full bg-[#80d7421c] p-1" value={selectedState} onChange={handleStateChange}>
                        <option value="">Select State</option>
                        {states.map((stateObj) => (
                          <option
                            key={stateObj.state_code}
                            value={stateObj.state_code}
                          >
                            {stateObj.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <label className="block py-3 text-black">Select City</label>
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  <div className="w-full">
                    <select className="w-full bg-[#80d7421c] p-1" value={selectedCity} disabled={!selectedState} onChange={handleCityChange}>
                      <option value="">Select City</option>
                      {cities.map((cityObj) => (
                        <option key={cityObj.id} value={cityObj.name}>
                          {cityObj.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* <p className="text-[#666666] text-[16px]">Upload Pan Card</p>
            <div className="border border-[#66666659] rounded-[12px] p-3 w-full cursor-pointer mb-2">
              <label htmlFor="upload">
                <span className="rounded-[8px] bg-[#DFDFDF] font-[400] text-[16px] text-[#666666] p-2 hidden lg:inline">
                  Choose an image
                </span>
                <span className="ml-2 text-[#D9D9D9] text-[16px] font-[400]">
                  No files selected
                </span>
                <Input type="file" classname="hidden w-full" id="upload" />
              </label>
            </div> */}
            {/* <p className="text-[#666666] text-[16px]">Upload Photo</p>
            <div className="border border-[#66666659] rounded-[12px] p-3 w-full cursor-pointer mb-2">
              <label htmlFor="upload">
                <span className="rounded-[8px] bg-[#DFDFDF] font-[400] text-[16px] text-[#666666] p-2 hidden lg:inline">
                  Choose an image
                </span>
                <span className="ml-2 text-[#D9D9D9] text-[16px] font-[400]">
                  No files selected
                </span>
                <Input type="file" classname="hidden w-full" id="upload" />
              </label>
            </div> */}
            {/* <StepThree /> */}
            <p className="text-[14px] text-[#666666] font-semibold mt-10 mb-5">
              <Input
                type="checkbox"
                classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                value={checked}
                checked={checked}
                handleChange={() => setChecked((prevState) => !prevState)}
              />{" "}
              By creating an account, I agree to our
              <span className="underline cursor-pointer">
                Terms of use
              </span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy </span>
            </p>
            <Button handleClick={signUpService}
              label={loading ? "Please wait ...." : "Continue"}
              classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"


            />
            <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3">
              Already have an account?{" "}
              <span
                className="font-semibold cursor-pointer underline hover:text-[#5AB344]"
                onClick={() => navigate("/vendor-signIn")}
              >
                Sign in
              </span>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default VendorSignup;
