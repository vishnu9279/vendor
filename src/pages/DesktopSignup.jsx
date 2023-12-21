import React from "react";
import SigupInput from "../components/auth/SigupInput";
import Button from "../components/auth/Button";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

const DesktopSignup = ({ userId, getUserId, setLogin }) => {
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

  const inputs = [
    {
      type: "text",
      name: "fullname",
      value: state.fullname,
      label: "Full Name",
      placeholder: "Full Name",
    },
    {
      type: "number",
      name: "phonenumber",
      value: state.phonenumber,
      label: "Phone Number",
      placeholder: "Phone Number",
    },
    {
      type: "number",
      name: "pincode",
      value: state.pincode,
      label: "Pincode",
      placeholder: "Pincode",
    },
    {
      type: "text",
      name: "address",
      value: state.address,
      label: "Address",
      placeholder: "Address",
    },
    {
      type: "password",
      name: "password",
      value: state.password,
      label: "Password",
      placeholder: "Password",
    },
    {
      type: "text",
      name: "city",
      value: state.city,
      label: "City",
      placeholder: "City",
    },
    {
      type: "text",
      name: "landmark",
      value: state.landmark,
      label: "Land mark",
      placeholder: "Land mark",
    },
    { type: "" },
    {
      type: "number",
      name: "otp",
      value: state.otp,
      label: "Enter OTP",
      placeholder: "Enter the code sent to your phone number",
    },
  ];

  let [currentPage, setCurrentPage] = React.useState(1);
  const inputsPerPage = 2;
  const numberOfPages = Math.ceil(inputs.length / inputsPerPage);
  const lastIndex = currentPage * inputsPerPage;
  const firstIndex = lastIndex - inputsPerPage;
  const inputsToBeRendered = inputs.slice(firstIndex, lastIndex);

  let numbers = [];

  for (let index = 0; index < numberOfPages; index++) {
    numbers = [...numbers, index];
  }

  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handlePageChange = (index) => setCurrentPage(index + 1);

  const handleContinue = async () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }

    if (currentPage === numberOfPages - 1) {
      setLoader(true);
      try {
        const response = await client.post(
          "/user/register/customer",
          {
            fullName: state.fullname,
            phoneNumber: "+" + state.phonenumber,
            pincode: state.pincode,
            address: state.address,
            landmark: state.landmark,
            city: state.city,
            password: state.password,
          },
          {
            headers: {
              "Access-Contro-Allow-Origin": "*",
            },
          }
        );
        setSuccess(response?.data?.message);
        setLoader(false);
        if (response) {
          getUserId(response?.data?.data);
        }
        if (!response) {
          setCurrentPage(currentPage + 1);
        }
        console.log(response, ">>>");
      } catch (error) {
        setLoader(false);
        setCurrentPage(numberOfPages - 1);
        setError(error?.response.data?.error);
        console.log(error);
      }
    }
    // 23456565656
    if (currentPage === numberOfPages) {
      setLoader(true);
      try {
        const response = await client.patch(
          `/user/verify?userID=${userId}`,
          { otp: state.otp },
          { headers: { "Access-Control-Allow-Origin": "*" } }
        );
        console.log(response, "}}}}}}}");
        if (response) {
          navigate("/login_signup");
          setLogin(true);
          alert(response?.data?.message);
          setLoader(false);
          setState({ ...state });
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };

  const { otp, ...rest } = state;

  return (
    <form className="signup-content">
      {inputsToBeRendered.map((input, index) => (
        <SigupInput
          key={index}
          handleChange={handleChange}
          input={input}
          style={input.type === "" ? { visibility: "hidden" } : {}}
        />
      ))}
      <p
        className={`text-xs ${
          error ? "text-red-500" : "text-green-600"
        } -mt-4 mb-3`}
      >
        {error ? error : success}
      </p>
      <div className="pagination">
        {numbers.map((number, index) => (
          <div
            key={index}
            className="pagination-item"
            onClick={() => handlePageChange(number)}
            style={inputsToBeRendered.length < 2 ? { marginTop: 107 } : {}}
          ></div>
        ))}
      </div>
      <Button
        style={{ fontFamily: "Gilroy-Regular" }}
        classname="input-content signin-btn btn btn-signup"
        label={
          (currentPage === numberOfPages ||
            currentPage !== numberOfPages - 1) &&
          loader
            ? "Loading..."
            : "Continue"
        }
        handleClick={handleContinue}
        // disabled={currentPage === numberOfPages - 1 ? rest : null}
      />
      <p className="signup-para">
        Go back{" "}
        <span
          onClick={() => navigate("/")}
          className="text-signin cursor-pointer ml-1 underline"
        >
          Home
        </span>
      </p>
    </form>
  );
};

export default DesktopSignup;
