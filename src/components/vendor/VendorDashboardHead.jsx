/* eslint-disable react/prop-types */
// import toggle_icon from "../../assets/SVG/dashboard/Toggle.svg";
import bell_icon from "../../assets/SVG/dashboard/Bell.svg";
import bell_icon_black from "../../assets/SVG/dashboard/bell_black.svg";
// import user_img from "../../assets/SVG/dashboard/User Img.svg";
import location_icon from "../../assets/SVG/dashboard/location.svg";
import menu from "../../assets/SVG/dashboard/jam_menu.svg";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import {getCurrentUser,changeUserActiveStatusTogggleButtonService} from "../../services/user"
const VendorDashboardHead = ({ showNav, handleNavClick }) => {
  const [user, setUser] = useState({});
  const [userActiveStatus, setUserActiveStatus] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0);
    const getCurrentUserService = async ()=>{
      const user =  await getCurrentUser();
      setUserActiveStatus(user.isActive);
      setUser(user);
    }
    getCurrentUserService();
  }, []);

  const changeUserActiveStatusTogggleButton = async (userActiveStatus) => {
    console.log("userActiveStatus",userActiveStatus);
    try {
      const response = await changeUserActiveStatusTogggleButtonService(userActiveStatus);
      console.log("update isActive Status", response);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <nav>
      <main className="ml-[18%] lg:flex justify-between shadow-md h-[10%] items-center px-3 py-10 fixed top-0 right-0 left-0 bg-white mb-[20%] hidden ">
        <section>
          <div className="flex pl-4">
            <Switch
              onChange={changeUserActiveStatusTogggleButton}
              checked={userActiveStatus}
              className="react-switch"
              id="normal-switch"
            />
            <span className="ml-3">
              <h1 className="text-neutral-700 text-2xl font-['Gilroy-Bold']">
                Hi, {user.firstName} {user.lastName}
              </h1>
              <p className="text-center text-neutral-500 text-sm font-normal font-['Gilroy-Regular'] tracking-tight">
                You are {userActiveStatus ? 'online' : 'offline'}
              </p>
            </span>
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
              src={user.profileUrl}
              alt="user_img"
              className="w-14 h-14 mr-2 cursor-pointer rounded-full"
            />
            <span className="text-neutral-700 font-normal font-['Gilroy-Regular']">
              {user.firstName} {}
              <span className="flex">
                <img
                  src={location_icon}
                  alt="location_icon"
                  className=" w-4 mr-.5 cursor-pointer"
                />
                <p className="text-center text-neutral-600  font-normal font-['Gilroy-Regular'] leading-[15.18px]">
                  {user.countryName}
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
            ? "fixed top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-lg z-40 duration-700 overflow-y-scroll overflow"
            : "fixed top-full left-0 w-screen h-screen bg-black/80 backdrop-blur-lg z-40 duration-700 overflow-y-scroll delay-700 overflow"
        }
      ></div>

      {/* Your navigation content goes here */}

      <main className="lg:hidden relative z-30">
        <section className="p-2 md:p-3 fixed top-0 right-0 left-0 bg-white">
          <aside className="flex justify-between items-center">
            <div className="flex">
              <img
                src={user.profileUrl}
                alt="user_img"
                className="mr-1 md:mr-4 w-14 h-14 md:w-[4.5rem] cursor-pointer rounded-full"
              />
              <span>
                <p className="font-semibold text-lg md:text-2xl md:mb-.5">
                  Hi {user.firstName} {user.lastName}
                </p>
                <div className="flex mr-1">
                  <img
                    src={location_icon}
                    alt="location_icon"
                    className="w-4 md:w-7 cursor-pointer"
                  />
                  <p className="font-semibold text-base md:text-xl">{user?.countryName}</p>
                </div>
              </span>
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
        <aside className="bg-zinc-600 rounded-lg mt-20 md:mt-28 mx-3 p-3 absolute left-0 right-0 -z-30">
          <div className="flex justify-between items-center">
            <section>
              <h1 className="text-lg text-white font-bold">{user.firstName} {user.lastName}</h1>
              <p className="text-white text-sm leading-none">You are {userActiveStatus ? 'online' : 'offline'}</p>
            </section>
            <section>
              <Switch
                onChange={changeUserActiveStatusTogggleButton}
                checked={userActiveStatus}
                className="react-switch"
                id="normal-switch"
              />
            </section>
          </div>
        </aside>
      </main>
    </nav>
  );
};

export default VendorDashboardHead;
