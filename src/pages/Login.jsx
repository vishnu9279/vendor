import React from "react";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import DesktopSignin from "./DesktopSignin";
import client from "../api/client";
import gabbage from "../assets/PNG/gabbabge 1.png";
import NavLinks from "../components/auth/NavLinks";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/users/userSlice";
import LoginModal from "../modals/LoginModal";

const Login = ({ getId, userId }) => {
  const [state, setState] = React.useState({ number: "", password: "" });
  const [signin, setSignin] = React.useState(true);
  const [error, setError] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => navigate("/forgot-password-page1");

  const activateSignin = () => setSignin(true);

  const activateSignup = () => setSignin(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    setError("");
  };

  const data = {
    phoneNumber: "+" + state.number,
    password: state.password,
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      const response = await client.post("/user/login", data, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      if (response) {
        dispatch(loginUser(response?.data));
        setLoader(false);
        setOpenModal(true);
      }
      console.log(response.data, ">>>>");
    } catch (error) {
      setError(error?.response?.data?.message || error?.message);
      setLoader(false);
    }
  };

  return (
    <>
      <div className="login-container">
        {signin ? (
          <>
            <div>
              <div className="mt-8">
                <NavLinks
                  signin={signin}
                  activateSignin={activateSignin}
                  activateSignup={activateSignup}
                />
              </div>
              <div className="p-8">
                <img src={gabbage} alt="" className="w-full h-[202px] mb-4" />
              </div>
              <div className="p-5 -mt-12 -mb-4">
                <h2 className="font-[400] text-[32px] text-center text-[#303030]">
                  Welcome, Customer!
                </h2>
                <p className="text-[#707070] text-[14px] text-center">
                  Sign into your account or create an <br /> account in four
                  simple steps
                </p>
              </div>
            </div>
            <div className="form-content">
              <form>
                <label>Enter your phone number</label>
                <Input
                  classname="w-full input-content"
                  placeHolder="Enter your phone number"
                  type="number"
                  name="number"
                  value={state.number}
                  handleChange={handleChange}
                />
                <label className="password-label">Password</label>
                <Input
                  classname="w-full input-content"
                  placeHolder="Password"
                  type="password"
                  name="password"
                  value={state.password}
                  handleChange={handleChange}
                />
                <span className="flex justify-between">
                  <p className="text-left">{error}</p>
                  <p
                    onClick={handleNavigate}
                    className="hover:font-semibold text-right"
                  >
                    Forgot Password?
                  </p>
                </span>
                <Button
                  classname="w-full input-content btn"
                  label={loader ? "Signing in ..." : "Sign In"}
                  handleClick={handleLogin}
                />
              </form>
            </div>
          </>
        ) : (
          <Signup
            activateSignin={activateSignin}
            activateSignup={activateSignup}
            getUserId={getId}
          />
        )}
      </div>
      <span className="desktop">
        <DesktopSignin getId={getId} userId={userId} />
      </span>
      <LoginModal
        openModal={openModal}
        handleClick={() => {
          navigate("/upload-scrap");
          setOpenModal(false);
        }}
        loader={loader}
      />
    </>
  );
};

export default Login;
