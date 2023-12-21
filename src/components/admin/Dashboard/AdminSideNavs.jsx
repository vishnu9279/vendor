import logo from "../../../assets/PNG/dashboard/junk_bazar_logo.png";
import dashboard from "../../../assets/SVG/admin-dashboard/mobile/dashboard.svg";
import cartbag from "../../../assets/SVG/admin-dashboard/mobile/cart-bag.svg";
import flags from "../../../assets/SVG/admin-dashboard/mobile/flags.svg";
import customers from "../../../assets/SVG/admin-dashboard/mobile/customers.svg";
import I_C from "../../../assets/SVG/admin-dashboard/mobile/I vs C.svg";
import location from "../../../assets/SVG/admin-dashboard/mobile/location.svg";
import notify from "../../../assets/SVG/admin-dashboard/mobile/notify.svg";
import settings from "../../../assets/SVG/admin-dashboard/mobile/settings.svg";
import users_plus from "../../../assets/SVG/admin-dashboard/mobile/users-plus.svg";
import logout from "../../../assets/SVG/admin-dashboard/mobile/logout.svg";
import arrow from "../../../assets/SVG/admin-dashboard/mobile/arrow-down.svg";
import cancel_icon from "../../../assets/SVG/admin-dashboard/mobile/cancel_icon.svg";
import user_img from "../../../assets/SVG/admin-dashboard/mobile/user-icon.svg";

import { Link, useNavigate } from "react-router-dom";

const AdminSideNavs = ({ showNav, hideNav }) => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="fixed h-screen w-[18%] shadow-xl left-0 bg-lime-600 hidden lg:block">
        <main className="flex flex-col justify-between h-full">
          <section className="">
            <div className="flex justify-center items-center h-[15%] bg-white ">
              <img
                src={logo}
                alt="bazar-logo"
                className="w-36 cursor-pointer p-3"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="flex flex-col justify-center mt-6  text-white hover:tex-black">
              <Link to="/admin-dashboard">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 text-white hover:text-black  hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer ml-2">
                  <img src={dashboard} alt="order-icon" />
                  <span className="text-center  text-base font-normal font-['Gilroy-Bold'] tracking-tight ml-3">
                    Dashboard
                  </span>
                </div>
              </Link>

              <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 text-white hover:text-black  hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                <img src={cartbag} alt="home-icon" />
                <span className="text-center  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                  Orders
                </span>
              </div>

              <Link to="/admin-dashboard/customer_details">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 text-white hover:text-black  hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={customers} alt="about-icon" />
                  <span className="text-center  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Customers
                  </span>
                </div>
              </Link>

              <Link to="/admin-dashboard/vendor">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 text-white hover:text-black  hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={users_plus} alt="contact-icon" />
                  <span className="text-center  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Vendor
                  </span>
                </div>
              </Link>

              <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 text-white hover:text-black  hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                <img src={notify} alt="price-list-icon" />
                <span className="text-center  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                  Notification
                </span>
              </div>

              <Link to="/business-industry-chats">
                <div className=" w-[90%] h-[3.25rem] hover:bg-lime-200 text-white hover:text-black  hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={I_C} alt="pickup-icon" />
                  <span className="text-center  text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Industry/Cooperate
                  </span>
                </div>
              </Link>
              <Link to="/admin-dashboard-settings">
                <div className=" w-[90%] h-[3.25rem] bg-lime-100 rounded-lg flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2">
                  <img src={settings} alt="setting-icon" />
                  <span className="text-center text-lime-600 text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                    Settings
                  </span>
                </div>
              </Link>
            </div>
          </section>
          <section>
            <div className=" w-[90%] h-[3.25rem] text-white hover:bg-red-300 mb-3 hover:rounded-[9px] flex items-center pl-4 duration-300 cursor-pointer mt-1 ml-2  hover:text-neutral-800">
              <img src={logout} alt="logout-icon" />
              <span className="text-center text-base font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                Logout
              </span>
            </div>
            <div className=" flex bg-white/80 rounded-md w-[50%] h-[2.5rem] justify-around mb-2 items-center  cursor-pointer  ml-2">
              <img src={flags} alt="logout-icon" className="w-4" />
              <span className="text-center text-zinc-500 text-sm font-normal font-['Gilroy-Medium'] tracking-tight ml-3">
                ENG
              </span>
              <img src={arrow} alt="arrow-down" className="w-4" />
            </div>
          </section>
        </main>
      </nav>

      {/* Mobile Nav */}
      <main className="lg:hidden relative h-full">
        <section>
          <aside
            className={
              showNav
                ? "fixed top-0 left-0 w-[65%] md:w-[50%] h-screen bg-lime-600  duration-700 overflow-y-scroll delay-700 rounded-br-3xl overflow z-50"
                : "fixed top-[-100%] left-0 w-screen h-screen bg-lime-600 z-50 duration-700 overflow-y-scroll opacity-0 overflow"
            }
          >
            <div className="py-10 pl-2 md:pl-10 text-zinc-600 bg-white lg:bg-lime-600 rounded-br-[40px] w-full">
              <img
                src={cancel_icon}
                alt="close-icon"
                className="absolute right-4 w-7 md:w-10 top-3 cursor-pointer"
                onClick={hideNav}
              />
              <aside className="flex items-center ">
                <img
                  src={user_img}
                  alt="user-Img"
                  className="mr-2 w-16 md:w-20"
                />
                <aside>
                  <h1 className="lg:text-white text-lg md:text-2xl font-bold leading-tight">
                    Andy Cophra
                  </h1>
                  <p className="lg:text-white text-sm md:text-xl font-bold leading-tight">
                    +91 23940839400
                  </p>
                  <span className="flex mr-1">
                    <img src={location} alt="location_icon" />
                    <p className="lg:text-white text-sm md:text-xl font-bold leading-tight">
                      India
                    </p>
                  </span>
                </aside>
              </aside>
            </div>

            <nav className="font-['Gilroy-Regular'] h-full">
              <div className="flex justify-between flex-col h-3/4 ">
                <ul className="flex flex-col px-1 py-4 text-gray-800 font-semibold mt-1">
                  <Link to="/admin-dashboard">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
                    >
                      <img
                        src={dashboard}
                        alt="home-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-white lg:text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Dashboard
                      </span>
                    </li>
                  </Link>

                  <Link to="/about">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
                    >
                      <img
                        src={cartbag}
                        alt="about-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />

                      <span className="text-base md:text-xl text-white lg:text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Orders
                      </span>
                    </li>
                  </Link>
                  <Link to="/admin-dashboard/customer_details">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
                    >
                      <img
                        src={customers}
                        alt="customers-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-white lg:text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Customers
                      </span>
                    </li>
                  </Link>
                  <Link to="/pricing">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
                    >
                      <img
                        src={users_plus}
                        alt="price-list-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-white lg:text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Vendor
                      </span>
                    </li>
                  </Link>

                  <Link to="/vendor-dashboard-order">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
                    >
                      <img
                        src={notify}
                        alt="pickup-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-white lg:text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Notification
                      </span>
                    </li>
                  </Link>

                  <Link to="/business-industry-chats">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500 "
                    >
                      <img
                        src={I_C}
                        alt="pickup-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl text-white lg:text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose">
                        Industry/Cooperate
                      </span>
                    </li>
                  </Link>

                  <Link to="/">
                    <li
                      onClick={hideNav}
                      className=" font-bold cursor-pointer py-2 flex items-center hover:border-l-4 hover:border-lime-400  duration-500  bg-lime-100 rounded-lg pl-2 lg:pl-4 mx-2 mt-1 ml-2 "
                    >
                      <img
                        src={settings}
                        alt="pickup-icon"
                        className="mx-3 mr-3 w-7 md:w-12"
                      />
                      <span className="text-base md:text-xl  lg:text-zinc-400  hover:text-lime-400 font-normal font-['Gilroy-Medium'] leading-loose ">
                        Settings
                      </span>
                    </li>
                  </Link>
                </ul>

                <section>
                  <div className=" font-bold cursor-pointer text-white py-2 flex items-center hover:border-l-4 hover:border-red-300  duration-500 pl-2">
                    <img
                      src={logout}
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

export default AdminSideNavs;
