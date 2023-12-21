import { useEffect, useState } from "react";
import AdminDashboardHeader from "../../AdminDashboardHeader";
import AdminSideNavs from "../../AdminSideNavs";
import { ImCancelCircle } from "react-icons/im";
import menu from "../../../../../assets/SVG/admin-dashboard/chats/menu.svg";
import check from "../../../../../assets/SVG/admin-dashboard/chats/checkbox.svg";
import white_check from "../../../../../assets/SVG/admin-dashboard/chats/white_checkbox.png";
import camera from "../../../../../assets/SVG/admin-dashboard/chats/camera.svg";
import send from "../../../../../assets/SVG/admin-dashboard/chats/send.png";
import data from "./chatsData/ChatsData";

const BusinessIndustryChats = () => {
  const [adminNav, setAdminNav] = useState(false);
  const handleAdminNav = () => setAdminNav(true);
  const closeAdminNav = () => setAdminNav(false);
  const [showOption, setShowOption] = useState(false);
  const [changeBackgroundColor, setChangeBackgroundColor] = useState(null);
  const [chatPage, setChatPage] = useState(data);
  const [isActive, setIsActive] = useState(true);
  const [inputValue, setInputValue] = useState("");

  

  const handleClick = (content) => {
    setInputValue(content);
    setShowOption(false)
  }

  return (
    <main>
      <AdminSideNavs showNav={adminNav} hideNav={closeAdminNav} />
      <AdminDashboardHeader
        handleNavClick={handleAdminNav}
        showNav={adminNav}
      />
      <section className="lg:ml-[18%] pt-[4.2rem] md:pt-[11%] lg:pt-[7%] md:bg-zinc-100 h-screen">
        <aside className="max-w-[1100px] mx-auto ">
          <div className="hidden md:flex justify-between mx-5 items-center  bg-white p-6 rounded-lg relative">
            <div>
              <h2 className="font-bold text-xl text-neutral-700">
                Business/Industry
              </h2>
            </div>

            <div className="flex ">
              <div className="relative mr-2 w-10/12">
                <div className="flex relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border-2 border-zinc-400 rounded-md px-2 py-1 outline-none tracking-wide"
                    placeholder="filter"
                  />
                  <div
                    className={`${
                      !showOption
                        ? "absolute bottom-3 right-3 "
                        : "absolute bottom-2 right-2 "
                    }`}
                  >
                    <img
                      src={menu}
                      alt="menu-icon"
                      className={`${
                        showOption ? "hidden" : "block"
                      } cursor-pointer `}
                      onClick={() => setShowOption(true)}
                    />
                    <ImCancelCircle
                      className={`${
                        !showOption ? "hidden" : "block"
                      } text-zinc-500 text-lg cursor-pointer`}
                      onClick={() => setShowOption(false)}
                    />
                  </div>
                </div>
                <div
                  className={`absolute right-0 pt-1 z-10 ${
                    showOption ? "block" : "hidden"
                  }`}
                >
                  <ul>
                    <li
                      onClick={() => handleClick("Option 1")}
                      className="border-2 border-zinc-400 rounded-md px-10 py-3 mt-1 cursor-pointer text-gray-500 bg-white text-lg font-semibold"
                    >
                      Option 1
                    </li>
                    <li
                      onClick={() => handleClick("Option 2")}
                      className="border-2 border-zinc-400 rounded-md px-10 py-3 mt-1 cursor-pointer text-gray-500 bg-white text-lg font-semibold"
                    >
                      Option 2
                    </li>
                    <li
                      onClick={() => handleClick("Option 3")}
                      className="border-2 border-zinc-400 rounded-md px-10 py-3 mt-1 cursor-pointer text-gray-500 bg-white text-lg font-semibold"
                    >
                      Option 3
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <select
                  name="options"
                  id="options"
                  className="border-2 text-zinc-500 text-sm border-zinc-400 rounded-md p-[.4rem] outline-none tracking-wide cursor-pointer"
                >
                  <option
                    value="oldest"
                    className="text-zinc-500 px-2 py-1 outline-none tracking-wide"
                  >
                    Oldest
                  </option>
                  <option value="option-1">Option 1</option>
                  <option value="option-1">Option 2</option>
                  <option value="option-1">Option 3</option>
                </select>
              </div>
            </div>
          </div>

          <section className=" hidden lg:block fixed top-48 max-h-[400px] overflow overflow-y-scroll ">
            {data.map((item, index) => (
              <aside
                key={index}
                onClick={() => {
                  changeBackgroundColor
                    ? setChangeBackgroundColor(null)
                    : setChangeBackgroundColor((prevIndex) =>
                        prevIndex === index ? null : index
                      );
                }}
                className={`max-w-[300px] p-5  border-b-[1px] border-zinc-400 mx-5 cursor-pointer ${
                  changeBackgroundColor === index ? "bg-lime-600" : "bg-white"
                } ${
                  index === 0 ? " rounded-tl-lg rounded-tr-lg" : " rounded-none"
                } ${
                  isActive
                    ? "bg-lime-600 text-white"
                    : "bg-white text-neutral-600"
                }`}
              >
                <div>
                  <div className="flex items-center">
                    <img
                      src={check}
                      alt="check-icon"
                      className={`${
                        changeBackgroundColor === index ? "hidden" : "block"
                      }`}
                    />
                    <img
                      src={white_check}
                      alt="check-icon"
                      className={`${
                        changeBackgroundColor === index ? "block" : "hidden"
                      }`}
                    />
                    <h1
                      className={`text-lg font-semibold ${
                        changeBackgroundColor === index
                          ? "text-white"
                          : "text-neutral-700"
                      }`}
                    >
                      {item.name}
                    </h1>
                  </div>
                  <div className="ml-6 text-white leading-6">
                    <p
                      className={`${
                        changeBackgroundColor === index
                          ? "text-white"
                          : "text-neutral-700"
                      }`}
                    >
                      {item.description}
                    </p>
                    <p
                      className={`${
                        changeBackgroundColor === index
                          ? "text-white"
                          : "text-neutral-700"
                      } text-sm`}
                    >
                      {item.chatGlimpse}
                    </p>
                  </div>
                </div>
              </aside>
            ))}
          </section>


          <section className="md:fixed md:top-48 lg:max-h-[400px] md:max-w-[700px] md:mx-auto md:max-h-[700px]  md:h-full overflow overflow-y-scroll w-full bg-white md:bg-white/50 text-neutral-700 rounded-xl md:right-16 lg:right-8 lg:max-w-[750px] p-5 text-base lg:text-sm">
            <aside className=" ">
              {chatPage.length > 0 && (
                <div className="border-[1px] bg-white max-w-[360px] border-zinc-400 p-3 rounded-md flex justify-start items-center">
                  <p> {chatPage[0].uploader}</p>
                </div>
              )}

              <div className="flex justify-end items-center w-full">
                {chatPage.length > 0 && (
                  <div className="p-3 max-w-[360px]  rounded-md bg-lime-100 mt-3 ">
                    <p className=""> {chatPage[0].responder}</p>
                  </div>
                )}
              </div>

              {chatPage.length > 0 && (
                <div className="border-[1px] bg-white max-w-[360px] border-zinc-400 p-3 rounded-md  mt-3">
                  <p> {chatPage[0].uploaderChat}</p>
                </div>
              )}
              
            </aside>

            <section className=" flex items-center  mt-5">
              <aside className="absolute left-2  md:left-4 bottom-5 md:bottom-3 w-5/6 ">
                <div className="flex relatve">
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="w-full p-3 rounded-full outline-none bg-lime-100"
                  />
                  <div className="absolute md:right-4 right-6 bottom-3 flex items-center">
                    <img
                      src={camera}
                      alt="camera-icon"
                      className="w-6 cursor-pointer"
                    />
                  </div>
                </div>
              </aside>
              <aside className="absolute bottom-6 md:bottom-4 ml-4  right-2 md:right-8">
                <img
                  src={send}
                  alt="send-icon"
                  className="bg-lime-600 p-2 w-10 rounded-full"
                />
              </aside>
            </section>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default BusinessIndustryChats;
