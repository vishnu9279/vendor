/* eslint-disable react/prop-types */
import logo from "../../assets/PNG/dashboard/junk_bazar_logo.png";
import orders from "../../assets/SVG/dashboard/solar_bag-check-bold.svg";
import home_icon from "../../assets/SVG/dashboard/Home.svg";
import about_icon from "../../assets/SVG/dashboard/About.svg";
import contact_icon from "../../assets/SVG/dashboard/Contact.svg";
import pickup_icon from "../../assets/SVG/dashboard/Pickup history.svg";
import setting_icon from "../../assets/SVG/dashboard/Settings.svg";
import logout_icon from "../../assets/SVG/dashboard/logout.svg";
import cancel_icon from "../../assets/SVG/dashboard/cancel.svg";
import location_icon from "../../assets/SVG/dashboard/location.svg";
import { TfiHeadphoneAlt } from "react-icons/tfi";

import { Link, useNavigate, NavLink } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import showSuccessMessage from "../../utils/SwalPopup";
const VendorDashboardNav = ({ showNav, hideNav, onScrap, showHistory }) => {
  const navigate = useNavigate();
  console.log("showNav", showNav);
  console.log("hello VendorDashboardNav");

  const [profile, setProfileData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/vendor/getCurrentUser");
      console.log("get User data", response);
      const data = JSON.parse(response.data.data);
      setProfileData(data);
      console.log("get Profile of user ", data);
      localStorage.setItem("fullname", profile?.firstName);
    } catch (error) {
      console.error("error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showSuccessMessage(errorMessage, "error");
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance.get("/vendor/logout");
      console.log("logout", response);
      localStorage.clear();
      navigate("/vendor-signIn");
      showSuccessMessage(response.message, "success");
    } catch (error) {
      console.error("error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showSuccessMessage(errorMessage, "error");
    }
  };
  const location = useLocation();
  const { pathname } = location;
  console.log("pathname",pathname)

  return (
    <div>
      <nav className="fixed h-screen w-[18%] shadow-xl left-0 bg-white hidden lg:block">
        <main className="flex flex-col justify-between h-full">
          <section className=" ">
            <div className="flex justify-center items-center h-[20.5%]">
              <img
                src={logo}
                alt="bazar-logo"
                className="w-36 cursor-pointer p-3"
              />
            </div>

            <div className="flex flex-col justify-center ">
              <NavLink to="/vendor-dashboard-order">
                <div
                  className=" w-[90%] h-[3.25rem] active:bg-lime-200 hover:bg-lime-200 hover:rounded-[9px] hover:text-lime-600 pl-4 duration-300 cursor-pointer ml-2 flex items-center gap-2"
                  onClick={onScrap}
                >
                  <img src={orders} alt="order-icon" className="mb-1" />
                  <span
                    className={({ isActive }) =>
                      `text-center${
                        isActive ? "text-lime-600" : "text-neutral-500"
                      } text-base font-normal font-['Gilroy-Bold']  pt-5`
                    }
                  >
                    Orders
                  </span>
                </div>
              </NavLink>
              {/* <NavLink to="/accept-order">
                <div className="w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={price_list_icon} alt="price-list-icon" />

                  <span className= {({isActive})=>`text-center ${isActive?"text-lime-600":"text-neutral-500"}  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3`}>
                    Accept Order
                  </span>
                </div>
              </NavLink> */}
              <NavLink to="/vendor-dashboard">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] hover:text-lime-600 flex items-center gap-2 pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={home_icon} alt="home-icon" className="mb-1" />

                  <span
                    className={({ isActive }) =>
                      `text-center ${
                        isActive ? "text-lime-600" : "text-neutral-500"
                      }  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3 pt-1`
                    }
                  >
                    Homepage
                  </span>
                </div>
              </NavLink>
              <NavLink to={"/aboutUs"}>
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] hover:text-lime-600 flex items-center gap-2 pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={about_icon} alt="about-icon" />

                  <span
                    className={({ isActive }) =>
                      `text-center ${
                        isActive ? "text-lime-600" : "text-neutral-500"
                      }  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3`
                    }
                  >
                    About
                  </span>
                </div>
              </NavLink>
              <NavLink to="/contactUs">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] hover:text-lime-600 flex items-center gap-2 pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={contact_icon} alt="contact-icon" />

                  <span
                    className={({ isActive }) =>
                      `text-center ${
                        isActive ? "text-lime-600" : "text-neutral-500"
                      } text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3`
                    }
                  >
                    Contact
                  </span>
                </div>
              </NavLink>
              <NavLink to="/history">
                <div
                  className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] hover:text-lime-600 flex items-center gap-2 pl-4 duration-300 cursor-pointer mt-1 ml-2"
                  onClick={showHistory}
                >
                  <img src={pickup_icon} alt="pickup-icon" />
                  <span
                    className={({ isActive }) =>
                      `text-center ${
                        isActive ? "text-lime-600" : "text-neutral-500"
                      }  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3`
                    }
                  >
                    Pickup History
                  </span>
                </div>
              </NavLink>
              <NavLink to="/Settings">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] hover:text-lime-600 flex items-center gap-2 pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={setting_icon} alt="setting-icon" />
                  <span
                    className={({ isActive }) =>
                      `text-center ${
                        isActive ? "text-lime-600" : "text-neutral-500"
                      }  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3`
                    }
                  >
                    Settings
                  </span>
                </div>
              </NavLink>
            </div>
          </section>
          <section>
            <div
              onClick={handleLogOut}
              className=" w-[90%] h-[3.25rem] hover:bg-red-300 mb-3 hover:rounded-[9px] hover:text-lime-600 flex items-center gap-2 pl-4 duration-300 cursor-pointer mt-1 ml-2 text-neutral-500 "
            >
              <img src={logout_icon} alt="logout-icon" />
              <span className="text-center   text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                Logout
              </span>
            </div>
          </section>
        </main>
      </nav>

      {/* Mobile Nav */}
      <main className="lg:hidden relative ">
        <section>
          <aside
            className={
              showNav
                ? "fixed top-0 left-0 w-[65%] md:w-[50%] h-screen bg-white  duration-700 overflow-y-scroll delay-700 rounded-br-3xl overflow z-50"
                : "fixed top-[-100%] left-0 w-screen h-screen bg-white z-50 duration-700 overflow-y-scroll opacity-0 overflow"
            }
          >
            <div className="py-10 pl-2 md:pl-10 bg-[#3CB043] rounded-br-[40px] w-full">
              <img
                src={cancel_icon}
                alt="close-icon"
                className="absolute right-4 w-7 md:w-10 top-3 cursor-pointer "
                onClick={hideNav}
              />
              <aside className="flex items-center ">
                <img
                  src={profile.profileUrl}
                  alt="useImg"
                  className="mr-2 w-14 h-14 md:w-14 rounded-full"
                />
                <aside>
                  <h1 className="text-white  text-[16px] md:text-2xl font-bold leading-tight">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-white mt-[3px] sm:mt-0 text-[12px] md:text-xl font-bold leading-tight">
                    {profile.dialCode} {profile.phoneNumber}
                  </p>
                  <span className="flex justify-start mr-1 mt-[3px] sm:mt-0 ">
                    <img
                      src={location_icon}
                      alt="location_icon"
                      className="w-fit"
                    />
                    <p className="text-white text-[12px] md:text-xl font-bold leading-tight">
                      {profile.countryName}
                    </p>
                  </span>
                </aside>
              </aside>
            </div>

            <nav className="font-['Gilroy-Regular'] h-full">
              <div className="flex justify-between flex-col h-3/4 ">
                <ul className="flex flex-col px-1 py-4 text-gray-800 font-semibold mt-1">
                  <Link to="/vendor-dashboard-order">
                    <li
                      onClick={() => {
                        hideNav();
                      }}
                      className={`font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400 duration-500 ${
                        pathname == "/vendor-dashboard-order"
                          ? "bg-[#EBFFDD] rounded-lg mr-[4px] ml-[4px]"
                          : ""
                      }`}
                    >
                      <img
                        src={orders}
                        alt="home-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Orders
                      </span>
                    </li>
                  </Link>
                  <Link to="/vendor-dashboard">
                    <li
                      onClick={() => {
                        hideNav();
                      }}
                      className={`font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 ${
                        pathname == "/vendor-dashboard"
                          ? "bg-[#EBFFDD] rounded-lg mr-[4px] ml-[4px]"
                          : ""
                      } `}
                    >
                      <img
                        src={home_icon}
                        alt="home-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Homepage
                      </span>
                    </li>
                  </Link>

                  <Link to={"/aboutUs"}>
                    <li
                      onClick={hideNav}
                      className={`font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 ${
                        pathname == "/aboutUs"
                          ? "bg-[#EBFFDD] rounded-lg mr-[4px] ml-[4px]"
                          : ""
                      } `}
                    >
                      <img
                        src={about_icon}
                        alt="about-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />

                      <span className="text-base md:text-xl text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        About Us
                      </span>
                    </li>
                  </Link>
                  <Link to="/contactUs">
                    <li
                      onClick={hideNav}
                      className={`font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 ${
                        pathname == "/contactUs"
                          ? "bg-[#EBFFDD] rounded-lg mr-[4px] ml-[4px]"
                          : ""
                      } `}
                    >
                      {/* <TfiHeadphoneAlt
                        className="mx-3 mr-3 w-7 md:w-12"
                        size={22}
                      /> */}

                      <TfiHeadphoneAlt
                        className="mx-3 mr-3 w-7 md:w-12 text-zinc-500"
                        size={22}
                      />
                      <span className="text-base md:text-xl text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Contact Us
                      </span>
                    </li>
                  </Link>
                  <Link to="/history">
                    <li
                      onClick={hideNav}
                      className={`font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 ${
                        pathname == "/history"
                          ? "bg-[#EBFFDD] rounded-lg mr-[4px] ml-[4px]"
                          : ""
                      } `}
                    >
                      <img
                        src={pickup_icon}
                        alt="pickup-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Pickup History
                      </span>
                    </li>
                  </Link>
                  <Link to="/Settings">
                    <li
                      onClick={hideNav}
                      className={`font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 ${
                        pathname == "/Settings"
                          ? "bg-[#EBFFDD] rounded-lg mr-[4px] ml-[4px]"
                          : ""
                      } `}
                    >
                      <img
                        src={setting_icon}
                        alt="pickup-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Settings
                      </span>
                    </li>
                  </Link>
                </ul>

                <section>
                  <div
                    onClick={handleLogOut}
                    className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-red-300  duration-500 pl-2"
                  >
                    <img
                      src={logout_icon}
                      alt="logout-icon"
                      className="mx-3 mr-3 w-7 md:w-12"
                    />
                    <span className="text-center   text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                      Logout
                    </span>
                  </div>
                </section>
              </div>
            </nav>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default VendorDashboardNav;
