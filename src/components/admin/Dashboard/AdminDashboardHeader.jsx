import search from "../../../assets/SVG/admin-dashboard/mobile/search.svg";
import bell_icon from "../../../assets/SVG/dashboard/Bell.svg";
import bell_icon_black from "../../../assets/SVG/dashboard/bell_black.svg";
import user_img from "../../../assets/SVG/dashboard/User Img.svg";
import location_icon from "../../../assets/SVG/dashboard/location.svg";
import menu from "../../../assets/SVG/dashboard/jam_menu.svg";
import logo from "../../../assets/PNG/junkbazar.png";
import search_icon from "../../../assets/SVG/Search Icon.svg";
import "../Dashboard/adminDashboardHead.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboardHeader = ({ showNav, handleNavClick }) => {
  const [searchBar, setSearchBar] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setSearchBar(true);
    console.log("clicke");
  };

  return (
    <nav>
      <main className="ml-[18%] lg:flex justify-between shadow-md h-[10%] items-center px-3 py-10 fixed top-0 right-0 left-0 bg-white mb-[20%] hidden z-50 ">
        <section className="flex items-center w-full">
          <div className="flex mr-2">
            <img
              src={search}
              alt="search_icon"
              className="w-8 cursor-pointer mr-3"
              onClick={handleClick}
            />
            <span
              className={`text-zinc-500 text-base ${searchBar && "hidden"}`}
            >
              Click icon to show search bar
            </span>
          </div>
          <div
            className={`${
              searchBar ? "flex scale-in-center  items-center w-full" : "hidden"
            }`}
          >
            <input
              type="search"
              name="search"
              id="search"
              className=" p-2 bg-white/60 shadow-sm border-2 border-zinc-300 shadow-zinc-300 outline-none w-full rounded-tl-lg rounded-bl-lg"
            />
            <div className="  p-2 py-[.67rem] rounded-tr-lg rounded-br-lg bg-zinc-300">
              <img src={search_icon} alt="search_icon" className="w-6" />
            </div>
          </div>
        </section>
        <section className="flex px-2 items-center h-full justify-center w-1/4">
          <aside className="mr-2">
            <img
              src={bell_icon}
              alt="bell_icon"
              className="w-10 cursor-pointer"
            />
          </aside>
          <aside className="flex mr-1 items-center ml-1">
            <img
              src={user_img}
              alt="user_img"
              className="w-12 mr-2 cursor-pointer"
            />
            <span className="text-neutral-700 font-normal font-['Gilroy-Regular']">
              Andy
              <span className="flex">
                <img
                  src={location_icon}
                  alt="location_icon"
                  className=" w-4 mr-.5 cursor-pointer"
                />
                <p className="text-center text-neutral-600  font-normal font-['Gilroy-Regular'] leading-[15.18px]">
                  India
                </p>
              </span>
            </span>
          </aside>
        </section>
      </main>

      {/* Mobile Nav */}

      <div
        className={
          showNav
            ? "fixed top-0 right-0 w-[100%]  h-screen bg-black/90 z-40 duration-700 overflow-y-scroll"
            : "fixed top-0 right-[-100%] w-[100%] h-screen bg-black/80 z-40 duration-700 overflow-y-scroll delay-200"
        }
      >
        {/* Your navigation content goes here */}
      </div>

      <main className="lg:hidden relative z-30">
        <section className="p-2 md:p-3 fixed top-0 right-0 left-0 bg-white">
          <aside className="flex justify-between items-center">
            <div className="flex">
              <img
                src={logo}
                alt="logo-icon"
                className="w-28 md:w-32 pl-3"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="">
              <span className="flex mr-3">
                <img
                  src={bell_icon_black}
                  alt="bell_icon"
                  className="mr-3 w-8 md:w-12 cursor-pointer"
                />
                <img
                  src={menu}
                  alt="menu_icon"
                  className="w-12 md:w-[4.5rem] cursor-pointer"
                  onClick={handleNavClick}
                />
              </span>
            </div>
          </aside>
        </section>
        {/* <aside className="bg-zinc-600 rounded-lg mt-20 md:mt-28 mx-3 p-3 absolute left-0 right-0 -z-30">
          <div className="flex justify-between items-center">
            <section>
              <h1 className="text-lg text-white font-bold">Hammed</h1>
              <p className="text-white text-sm leading-none">You are online</p>
            </section>
            <section>
              <img
                src={toggle_icon}
                alt="toggle_icon"
                className="w-[3.5rem] md:w-[4.5rem] cursor-pointer"
              />
            </section>
          </div>
        </aside> */}
      </main>
    </nav>
  );
};

export default AdminDashboardHeader;
