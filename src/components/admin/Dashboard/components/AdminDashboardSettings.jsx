import React, { useState } from "react";
import AdminDashboardHeader from "../AdminDashboardHeader";
import AdminSideNavs from "../AdminSideNavs";
import user_img from "../../../../assets/SVG/admin-dashboard/user-icon.svg";
import delete_icon from "../../../../assets/SVG/admin-dashboard/delete-icon.svg";
import copy_icon from "../../../../assets/SVG/admin-dashboard/copy-icon.svg";
import edit_icon from "../../../../assets/SVG/admin-dashboard/edit-icon.svg";
import roles from "../components/roles/Roles";
import location from "../../../../assets/SVG/admin-dashboard/mobile/location.svg";
import mobile_edit_icon from "../../../../assets/SVG/admin-dashboard/mobile/mobile_edit.svg";

const AdminDashboardSettings = () => {
  const [adminNav, setAdminNav] = useState(false);
  const handleAdminNav = () => setAdminNav(true);
  const closeAdminNav = () => setAdminNav(false);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const previewUrl = URL.createObjectURL(file);

    setImage(file);
    setPreview(previewUrl);
    console.log(preview);
  };

  return (
    <main>
      <AdminSideNavs showNav={adminNav} hideNav={closeAdminNav} />
      <AdminDashboardHeader
        handleNavClick={handleAdminNav}
        showNav={adminNav}
      />
      <section className="lg:ml-[18%] pt-[4.2rem] md:pt-[11%] lg:pt-[8%] h-full ">
        <aside className="lg:p-9 p-1 md:p-5 md:bg-lime-50 md:mx-5 mx-2 rounded-xl">
          <div className="p-2 md:hidden flex items-center">
            <img
              src={user_img}
              alt="user_img"
              className="mr-1 md:mr-4 w-12 md:w-[4.5rem] cursor-pointer"
            />
            <span>
              <p className="font-semibold text-lg md:text-2xl md:mb-.5">
                Hammed Ragu
              </p>
              <div className="flex mr-1">
                <img
                  src={location}
                  alt="location_icon"
                  className="w-4 md:w-7 cursor-pointer"
                />
                <p className="font-semibold text-base md:text-xl">India</p>
                <img
                  src={mobile_edit_icon}
                  alt="edit_icon"
                  className="w-5 md:w-7 cursor-pointer"
                />
              </div>
            </span>
          </div>{" "}
          <hr className="md:hidden" />
          <div className="hidden md:block">
            <h1 className=" text-neutral-600 font-normal font-['Gilroy-Bold'] tracking-loose text-2xl">
              Setting
            </h1>
            <h2 className="text-neutral-500 text-base font-normal font-['Gilroy-Medium'] tracking-loose">
              Real time information about your account
            </h2>
          </div>
          <div className="md:flex mt-6 items-center justify-between hidden">
            <div className="flex items-center">
              <div>
                <img src={user_img} alt="user_icon" className="w-20 mr-3" />
              </div>
              <div>
                <h1 className="text-neutral-700 text-lg font-normal font-['Gilroy-Medium']">
                  Ragesh Sahim
                </h1>
                <p>Admin</p>
              </div>
            </div>
            <div className="relative flex ">
              <label
                htmlFor="pix"
                className={`cursor-pointer mr-4 block bg-white border border-gray-300 hover:border-gray-400 p-3 text-center shadow-md ${
                  preview ? "rounded-xl" : "rounded-md"
                }`}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="admin-pic"
                    className="mx-auto h-20 object-cover rounded-sm mb-4"
                  />
                ) : (
                  <span className="text-gray-500 ">Upload New Picture</span>
                )}
              </label>
              <input
                id="pix"
                type="file"
                className="hidden"
                onChange={handleImage}
              />
              <button className="w-[83.36px] h-[50.88px] bg-zinc-400 bg-opacity-40 rounded-md shadow p-3">
                Delete
              </button>
            </div>
          </div>
          <h1 className="text-neutral-700 text-xl font-normal font-['Gilroy-Bold'] pt-7">
            Full Name
          </h1>
          <p className="text-sm hidden md:flex text-neutral-500 font-normal font-['Gilroy-Medium'] tracking-tight">
            Edit your name
          </p>
          <form action="" className="flex flex-col md:flex-row mt-4 w-full">
            <div className="mr-5  w-full md:w-1/3">
              <label
                className="font-semibold mb-2 box-border"
                htmlFor="firstName"
              >
                First Name
              </label>{" "}
              <br />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="first name"
                className="px-6 py-4 mt-3 md:mt-0 md:py-3 bg-lime-50 md:bg-white rounded-full md:rounded-lg w-full md:shadow-xl"
              />
            </div>
            <div className="w-full md:w-1/3 mt-2 md:mt-0">
              <label
                className="font-semibold mb-2 box-border"
                htmlFor="lastName"
              >
                last Name
              </label>{" "}
              <br />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="last name"
                className="px-6 py-4 mt-3 md:mt-0 md:py-3 bg-lime-50 md:bg-white rounded-full md:rounded-lg w-full md:shadow-xl"
              />
            </div>
          </form>
        </aside>

        <aside className="p-2 md:p-9 md:bg-lime-50 mx-2 md:mx-5 rounded-xl mt-10 mb-5">
          <div>
            <h1 className=" text-neutral-600 text-2xl font-normal font-['Gilroy-Bold'] tracking-tight">
              Privacy and Security
            </h1>
            <p className="text-neutral-700 pt-2 font-semibold">
              Modify Password
            </p>
            <p className="pt-1 text-neutral-500 text-sm font-normal font-['Gilroy-Medium'] tracking-tight">
              Modify your current password
            </p>
          </div>

          <form
            action=""
            className="flex flex-col md:flex-row mt-5 md:mt-20 w-full"
          >
            <div className="mr-5 w-full md:w-1/3 mb-3 md:mb-0">
              <label
                className="font-semibold mb-2 box-border"
                htmlFor="currentPassword"
              >
                Curent Password
              </label>{" "}
              <br />
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="current password"
                className="px-6 py-4 mt-3 md:mt-0 md:py-3 bg-white rounded-lg w-full shadow-md shadow-zinc-200"
              />
            </div>
            <div className="w-full md:w-1/3">
              <label
                className="font-semibold mb-2 box-border"
                htmlFor="newPassword"
              >
                New Password
              </label>{" "}
              <br />
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="new password"
                className=" px-6 py-4 mt-3 md:mt-0 md:py-3 bg-white rounded-lg w-full shadow-md shadow-zinc-200"
              />
            </div>
          </form>

          <div className="mt-12">
            <h1 className=" text-neutral-600 text-2xl font-normal font-['Gilroy-Bold'] tracking-tight">
              Roles
            </h1>
            <p className="pt-1 text-neutral-500 text-sm font-normal font-['Gilroy-Medium'] tracking-tight">
              List of Roles
            </p>
          </div>

          <div>
            <table className="w-full text-start mt-6">
              <tbody className="text-gray-600 ">
                {roles.map((role, index) => (
                  <tr key={index} className="">
                    <td className="font-bold md:px-6 py-3 whitespace-nowrap">
                      {role.role}
                    </td>
                    <td className="md:px-6 py-3 whitespace-nowrap ">
                      {role.name}
                    </td>
                    <td className="md:px-6 py-3 whitespace-nowrap flex justify-between  items-center">
                      {role.user} User
                      <div className="flex">
                        <img
                          src={delete_icon}
                          alt="delete-icon"
                          className="mr-2"
                        />
                        <img src={copy_icon} alt="copy-icon" className="mr-2" />
                        <img src={edit_icon} alt="edit-icon" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
          <div className="flex flex-col md:flex-row justify-center md:justify-end lg:items-center lg:ml-4">
            <button
              //   onClick={() => navigate("/vendor-dashboard")}
              className="text-center text-white text-base font-normal tracking-tight border-2 border-lime-400 bg-lime-400 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-[.5rem] md:px-[1rem] py-[.65rem] md:font-bold w-full md:w-1/3 lg:w-1/6 md:mb-5"
            >
              Save
            </button>
            <button
              //   onClick={() => navigate("upload-scrap")}
              className="text-center text-zinc-500 text-base font-normal tracking-tight border-2 h border-zinc-500 hover:bg-lime-400 hover:text-white hover:border-2 hover:border-lime-400 duration-200 flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-[.5rem] md:px-[1rem] py-[.65rem] md:font-bold w-full md:w-1/3 lg:w-1/6 mb-5"
            >
              Cancel
            </button>
          </div>
      </section>
    </main>
  );
};

export default AdminDashboardSettings;
