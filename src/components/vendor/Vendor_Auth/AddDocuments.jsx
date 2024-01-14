import React, { useEffect, useState } from "react";
import Button from "../../auth/Button";
import customer from "../../../assets/PNG/tractor 2.png";
import Input from "../../auth/Input";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api-config/axiosInstance";
import showSuccessMessage from "../../../utils/SwalPopup";

const AddDocuments = () => {
  const location = useLocation();
  const [checked, setChecked] = React.useState(true);
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [previewPanCard, setPreviewPanCard] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [previewAdhar, setPreviewAdhar] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [adharCard, setAdharCard] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = React.useState("");
  const [photo, setProfilePhoto] = useState("");
  const [lastName, setLastName] = useState("");
  const [panCard, setPanCard] = useState("");
  const [address, setAddress] = useState("");
  const [countriesAndStates, setcountriesAndStates] = useState([]);

  const fetchData = async () => {
    try {
      const userIdResp = location.state.userId;
      console.log("userId", userIdResp);
      setUserId(userIdResp);
      const response = await axiosInstance.get("/getCountries");

      const countriesAndStatesData = JSON.parse(response.data.data);

      console.log("countriesAndStatesData", countriesAndStatesData);

      setcountriesAndStates(countriesAndStatesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let loginToken = localStorage.getItem("token");
    if (loginToken) {
      navigate("/vendor-dashboard");
    }
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
      // setDialCode(`${countriesAndStates[0].phone_code}`);
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
      if (el.state_code === selectedState) return el.cities;
    })[0]?.cities || [];

  const handleCityChange = (event) => {
    const citySelected = event.target.value;

    setSelectedCity(citySelected);
  };

  const generateSignedUrl = async (fileName, contentType) => {
    try {
      const payload = {
        ContentType: contentType,
        fileName,
        uploadType: "DOCUMENTS",
        userId,
      };
      console.log("generateSignedUrl function work", payload);
      const signedUrl = await axiosInstance.post(
        "/generateS3UploadSignedUrl",
        payload
      );
      return JSON.parse(signedUrl.data.data);
    } catch (error) {
      console.error("Error While Uploading File", error);
      showSuccessMessage(error.response.data.error._message, "error");
    }
  };

  const uploadFileOnS3 = async (file, signedUrl) => {
    try {
      const uploadResponse = await fetch(signedUrl, {
        body: file,
        headers: {
          "Content-Type": file.type, // Set the Content-Type header based on the image type
        },
        method: "PUT",
      });
      console.log("uploadFileOnS3 work", uploadFileOnS3);
      return uploadResponse;
    } catch (error) {
      showSuccessMessage("Error While Uploading Image", "error");
    }
  };
  const uploadAdhar = async (e) => {
    console.log("file ", e.target.files[0]);
    const file = e.target.files[0];
    const previewUrl = file.name;

    setPreviewAdhar(previewUrl);
    try {
      const imageSignedObj = await generateSignedUrl(file.name, file.type);
      setAdharCard(imageSignedObj.key);

      const uploadResponseFromS3 = await uploadFileOnS3(
        file,
        imageSignedObj.signedUrl
      );

      console.log({
        signedUrl: imageSignedObj.signedUrl,
        key: imageSignedObj.key,
        adharCardImagePath: adharCard,
        uploadResponseFromS3,
      });
      showSuccessMessage("Successfully Uploaded Aaddhaar Card", "success");
    } catch (error) {
      console.error("Error fetching data:", error);
      showSuccessMessage(error.response.data.error._message, "error");
    }
  };

  const uploadPanCard = async (e) => {
    console.log("file ", e.target.files[0]);
    const file = e.target.files[0];
    const previewUrl = file.name;

    setPreviewPanCard(previewUrl);

    try {
      const imageSignedObj = await generateSignedUrl(file.name, file.type);
      setPanCard(imageSignedObj.key);
      const uploadResponseFromS3 = await uploadFileOnS3(
        file,
        imageSignedObj.signedUrl
      );
      console.log({
        signedUrl: imageSignedObj.signedUrl,
        key: imageSignedObj.key,
        panCardImagePath: adharCard,
        uploadResponseFromS3,
      });
      showSuccessMessage("Successfully Uploaded Pan Card", "success");
    } catch (error) {
      console.error("Error fetching data:", error);

      showSuccessMessage(error.response.data.error._message, "error");
    }
  };

  const uploadProfilePhoto = async (e) => {
    console.log("file ", e.target.files[0]);
    const file = e.target.files[0];
    const previewUrl = file.name;
    setPreviewPhoto(previewUrl);
    try {
      const imageSignedObj = await generateSignedUrl(file.name, file.type);
      setProfilePhoto(imageSignedObj.key);

      const uploadResponseFromS3 = await uploadFileOnS3(
        file,
        imageSignedObj.signedUrl
      );

      console.log({
        signedUrl: imageSignedObj.signedUrl,
        key: imageSignedObj.key,
        adharCardImagePath: adharCard,
        uploadResponseFromS3,
      });
      showSuccessMessage("Successfully Uploaded Profile Photo", "success");
    } catch (error) {
      console.error("Error fetching data:", error);

      showSuccessMessage(error.response.data.error._message, "error");
    }
  };

  const signUpService = async () => {
    if (!checked) showSuccessMessage("Select Term And Condition", "error");
    const payload = {
      userId,
      firstName: firstName,
      lastName: lastName,
      aadhaarID: adharCard,
      panID: panCard,
      profile: photo,
      city: selectedCity,
      countryCode: selectedCountry,
      stateCode: selectedState,
      address: address,
    };

    try {
      console.log("upload Documents", payload);
      const resp = await axiosInstance.post("/uploadDocument", payload);
      const dataObject = resp.data;
      const tokenDataParsing = JSON.parse(dataObject.data);
      localStorage.setItem("token", tokenDataParsing.token);
      showSuccessMessage(dataObject.message, "success");
      navigate("/vendor-dashboard");
    } catch (error) {
      console.error("error", error);

      showSuccessMessage(error.response.data.error._message, "error");
    }
  };

  return (
    <>
      <div className="  text-gray-900 bg-[#355B2B] flex justify-center">
        <div className="w-full m-0 sm:m-10   sm:rounded-lg flex justify-center flex-1">
          <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr  i justify-around items-center hidden">
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
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 shadow bg-white">
            <div className="mx-auto w-full max-w-[550px] bg-white">
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
                <p className="text-[#666666] text-[16px] mt-5">
                  Upload Adhar Card
                </p>
                <div className="col-span-6 sm:col-span-3 ">
                  <div className="relative">
                    <label
                      htmlFor="pix1"
                      className="cursor-pointer block bg-[#80d7421c] border border-gray-300 hover:border-gray-400 rounded-md p-4 text-center"
                    >
                      {previewAdhar ? (
                        <p>{previewAdhar}</p>
                      ) : (
                        <span className="text-gray-500 mb-4">
                          Upload Adhar Card
                        </span>
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
                <p className="text-[#666666] text-[16px] mt-5">
                  Upload Pan Card
                </p>
                <div className="col-span-6 sm:col-span-3 ">
                  <div className="relative">
                    <label
                      htmlFor="pix2"
                      className="cursor-pointer block bg-[#80d7421c] border border-gray-300 hover:border-gray-400 rounded-md p-4 text-center"
                    >
                      {previewPanCard ? (
                        <p>{previewPanCard}</p>
                      ) : (
                        <span className="text-gray-500 mb-4">
                          Upload Pan Card
                        </span>
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
                      onChange={uploadProfilePhoto}
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <div>
                    <label className="block py-3 text-black">
                      Enter Address
                    </label>
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
                      <label className="block py-3 text-black">
                        Select Country
                      </label>
                      <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                        <div className="w-full">
                          <select
                            className="w-full bg-[#80d7421c] p-1"
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
                      <label className="block py-3 text-black">
                        Select State
                      </label>
                      <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                        <div className="w-full">
                          <select
                            className="w-full bg-[#80d7421c] p-1"
                            value={selectedState}
                            onChange={handleStateChange}
                          >
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
                        <select
                          className="w-full bg-[#80d7421c] p-1"
                          value={selectedCity}
                          disabled={!selectedState}
                          onChange={handleCityChange}
                        >
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
                  </span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer">
                    Privacy Policy{" "}
                  </span>
                </p>
                <Button
                  label="Continue"
                  handleClick={signUpService}
                  // label={loading ? "Please wait ...." : "Continue"}
                  classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
                />
                <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3">
                  Already have an account?{" "}
                  <span
                    className="font-semibold cursor-pointer none hover:text-[#5AB344]"
                    onClick={() => navigate("/vendor-signIn")}
                  >
                    Sign in
                  </span>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDocuments;
