import logo from "../../assets/PNG/dashboard/junk_bazar_logo.png";
import orders from "../../assets/SVG/dashboard/solar_bag-check-bold.svg";
import home_icon from "../../assets/SVG/dashboard/Home.svg";
import about_icon from "../../assets/SVG/dashboard/About.svg";
import contact_icon from "../../assets/SVG/dashboard/Contact.svg";
import price_list_icon from "../../assets/SVG/dashboard/Price list.svg";
import pickup_icon from "../../assets/SVG/dashboard/Pickup history.svg";
import setting_icon from "../../assets/SVG/dashboard/Settings.svg";
import logout_icon from "../../assets/SVG/dashboard/logout.svg";
import cancel_icon from "../../assets/SVG/dashboard/cancel.svg";
import user_img from "../../assets/SVG/dashboard/User Img.svg";
import location_icon from "../../assets/SVG/dashboard/location.svg";
import { TfiHeadphoneAlt } from "react-icons/tfi";

import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const VendorDashboardNav = ({
  showNav,
  hideNav,
  onScrap,
  showHistory,
  showSettings,
  Pricing,
  AcceptOrder

}) => {

  const navigate = useNavigate();

  const handlehome = () => {
    navigate("https://junkbaazar-user.netlify.app/")
  }


  const [profile, setProfileData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getCurrentUser");
      console.log("get User data", response);
      const data = JSON.parse(response.data.data);
      setProfileData(data);
      console.log("get Profile of user ", data)
      localStorage.setItem("fullname", profile.firstName)
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance.get("/logout");
      console.log("logout", response);
      const data = response.data;
      if (data.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: true,
          timer: 2500,
          title: "Successfully Logout"
        });
        localStorage.clear();
        navigate("/vendor-signIn")
      }

    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <div>
      <nav className="fixed h-screen w-[18%] shadow-xl left-0 bg-white hidden lg:block">
        <main className="flex flex-col justify-between h-full">
          <section className=" ">
            <div className="flex justify-center items-center h-[15%]">
              <img
                src={logo}
                alt="bazar-logo"
                className="w-36 cursor-pointer p-3"
              />
            </div>

            <div className="flex flex-col justify-center ">
              <Link to="/vendor-dashboard-order">
                <div
                  className=" w-[90%] h-[3.25rem] active:bg-lime-200 hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer ml-2"
                  onClick={onScrap}
                >
                  <img src={orders} alt="order-icon" />
                  <span className="text-center text-lime-600 text-base font-normal font-['Gilroy-Bold'] tracking-tight ml-3">
                    Orders
                  </span>
                </div>
              </Link>
              <Link to="/accept-order">
                <div
                  className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">

                  <img src={price_list_icon} alt="price-list-icon" />

                  <span className="text-center text-neutral-500 text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Accept Order
                  </span>

                </div>
              </Link>
              <Link to="/vendor-dashboard">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={home_icon} alt="home-icon" />

                  <span className="text-center text-neutral-500 text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Homepage
                  </span>

                </div>
              </Link >
              <Link to={"/aboutUs"} >
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={about_icon} alt="about-icon" />

                  <span className="text-center text-neutral-500 text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    About
                  </span>

                </div>
              </Link>
              <Link to="/contactUs">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">

                  <img src={contact_icon} alt="contact-icon" />

                  <span className="text-center text-neutral-500 text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Contact
                  </span>

                </div>
              </Link>
              {/* <Link to={"/price"}>
                <div
                  className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">

                  <img src={price_list_icon} alt="price-list-icon" />
                  <a href="https://junkbaazar-user.netlify.app/" target="_blank" rel="noreferrer">
                    <span className="text-center text-neutral-500 text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                      Price List
                    </span>
                  </a>
                </div>
              </Link> */}
              <Link to="/history">
                <div
                  className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2"
                  onClick={showHistory}
                >
                  <img src={pickup_icon} alt="pickup-icon" />
                  <span className="text-center text-neutral-500 text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Pickup History
                  </span>
                </div>
              </Link>
              <Link to="/Settings">
                <div
                  className=" w-[90%] h-[3.25rem] hover:bg-lime-200 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2"

                >
                  <img src={setting_icon} alt="setting-icon" />
                  <span className="text-center text-neutral-500 text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Settings
                  </span>
                </div>
              </Link>
            </div>

          </section>
          <section>
            <div onClick={handleLogOut} className=" w-[90%] h-[3.25rem] hover:bg-red-300 mb-3 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2 text-neutral-500 hover:text-neutral-800">
              <img src={logout_icon} alt="logout-icon" />
              <span className="text-center   text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                Logout
              </span>
            </div>
          </section>
        </main>
      </nav>

      {/* Mobile Nav */}
      <main className="lg:hidden relative">
        <section>
          <aside
            className={
              showNav
                ? "fixed top-0 left-0 w-[65%] md:w-[50%] h-screen bg-white  duration-700 overflow-y-scroll delay-700 rounded-br-3xl overflow z-50"
                : "fixed top-[-100%] left-0 w-screen h-screen bg-white z-50 duration-700 overflow-y-scroll opacity-0 overflow"
            }
          >
            <div className="py-10 pl-2 md:pl-10 bg-lime-600 rounded-br-[40px] w-full">
              <img
                src={cancel_icon}
                alt="close-icon"
                className="absolute right-4 w-7 md:w-10 top-3 cursor-pointer"
                onClick={hideNav}
              />
              <aside className="flex items-center ">
                <img
                  src={user_img}
                  alt="useImg"
                  className="mr-2 w-16 md:w-20"
                />
                <aside>
                  <h1 className="text-white text-lg md:text-2xl font-bold leading-tight">
                    {profile.firstName}
                  </h1>
                  <p className="text-white text-sm md:text-xl font-bold leading-tight">
                    {profile.dialCode}{" "} {profile.phoneNumber}
                  </p>
                  <span className="flex mr-1">
                    <img src={location_icon} alt="location_icon" />
                    <p className="text-white text-sm md:text-xl font-bold leading-tight">
                      India
                    </p>
                  </span>
                </aside>
              </aside>
            </div>

            <nav className="font-['Gilroy-Regular'] h-full">
              <div className="flex justify-between flex-col h-3/4 ">
                <ul className="flex flex-col px-1 py-4 text-gray-800 font-semibold mt-1">
                  <Link to="/vendor-dashboard">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
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
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
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
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
                    >
                      {/* <TfiHeadphoneAlt
                        className="mx-3 mr-3 w-7 md:w-12"
                        size={22}
                      /> */}

                      <TfiHeadphoneAlt className="mx-3 mr-3 w-7 md:w-12 text-zinc-500" size={22} />
                      <span className="text-base md:text-xl text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Contact Us
                      </span>
                    </li>
                  </Link>
                  {/* <Link to={"/price"}>
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
                    >
                      <img
                        src={price_list_icon}
                        alt="price-list-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Price List
                      </span>
                    </li>
                  </Link> */}

                  {/* <Link to="/history">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
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
                  </Link> */}

                  <Link to="/Settings">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
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
                  <div onClick={handleLogOut} className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-red-300  duration-500 pl-2">
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
    </div >
  );
};

export default VendorDashboardNav;
