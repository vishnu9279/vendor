import React, { useEffect } from "react";
import Desktop from "../components/auth/Desktop";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { FaRegEye } from "react-icons/fa";
import { HiEyeOff } from "react-icons/hi";
import DesktopSignup from "./DesktopSignup";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/users/userSlice";
import LoginModal from "../modals/LoginModal";

const DesktopSignin = ({ userId, getId }) => {
  const [viewPassword, setViewPassword] = React.useState(false);
  const [signin, setSignin] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [state, setState] = React.useState({ number: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();

  const activateSignin = () => setSignin(true);

  const activateSignup = () => setSignin(false);

  const [loader, setLoader] = React.useState(false);

  const handlePasswordView = () => setViewPassword((prevState) => !prevState);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    setError("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
        setOpenModal(true);
        setLoader(false);
      }
      console.log(response, ">>>>");
      localStorage.setItem("user_Token", response.data?.data);
    } catch (error) {
      setLoader(false);
      console.log(error);
      setError(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <Desktop
      signin={signin}
      activateSignin={activateSignin}
      activateSignup={activateSignup}
    >
      <>
        {signin ? (
          <form>
            <label>Phone Number</label>
            <Input
              classname="input-content signin-input placeholder:font-[Gilroy-Regular]"
              placeHolder="Phone Number"
              type="number"
              name="number"
              value={state.number}
              handleChange={handleChange}
            />
            <label>Password</label>
            <span className="icon-input">
              <Input
                classname="input-content confirm-signin placeholder:font-[Gilroy-Regular]"
                placeHolder="Password"
                name="password"
                value={state.password}
                handleChange={handleChange}
                type={viewPassword ? "text" : "password"}
              />
              {viewPassword ? (
                <FaRegEye
                  size={20}
                  className="icon signin-icon"
                  onClick={handlePasswordView}
                />
              ) : (
                <HiEyeOff
                  size={20}
                  className="icon signin-icon"
                  onClick={handlePasswordView}
                />
              )}
            </span>
            <span className="flex justify-between">
              <p className="text-xs text-red-500">{error}</p>
              <p
                className="signi-p"
                onClick={() => navigate("/forgot-password-page1")}
              >
                Forgot Password?
              </p>
            </span>
            <Button
              classname="input-content signin-btn btn"
              style={{ fontFamily: "Gilroy-Regular" }}
              label={loader ? "Signing in..." : "Sign In"}
              handleClick={handleLogin}
            />
          </form>
        ) : (
          <DesktopSignup
            userId={userId}
            getUserId={getId}
            setLogin={setSignin}
          />
        )}
      </>
      <LoginModal
        loader={loader}
        openModal={openModal}
        handleClick={() => {
          navigate("/upload-scrap");
          setOpenModal(false);
        }}
      />
    </Desktop>
  );
};

export default DesktopSignin;
