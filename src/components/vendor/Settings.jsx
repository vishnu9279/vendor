import  { useEffect, useState } from "react";
// import singh from "../../assets/PNG/singh.png";
import edit from "../../assets/PNG/edit.png";
import location from "../../assets/PNG/location.png";
import add from "../../assets/PNG/add.png";
// import Button from "../auth/Button";
import SettingsInput from "./components/SettingsInput";
// import delete_ from "../../assets/PNG/delete.png";
// import SettingsModal from "../../modals/SettingsModal";
import axiosInstance from "../../api-config/axiosInstance";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";

const Settings = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);

  const [profile, setProfileData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/vendor/getCurrentUser");
      const data = JSON.parse(response.data.data);
      setProfileData(data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main>
      <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <VendorDashboardHead
        handleNavClick={handleVendorNav}
        showNav={vendorNav}
      />
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] bg-green-50 h-full p-5">
        <div className="pb-4 border-b border-b-[rgba(149, 152, 154, 0.5)]">
          <h2 className="text-[24px] font-semibold text-[#4A4A4A]">Setting</h2>
          <p className="text-[#707070] text-[16px] pt-1">
            Real time information about your account
          </p>
        </div>
        <div className="pb-5 pt-4 border-b border-b-[rgba(149, 152, 154, 0.5)]">
          <div className="flex justify-between">
            <div className="flex">
              <img src={profile.profileUrl} className="w-[138px] h-[138px] mr-4 rounded-full" alt="" />
              <span className="mt-8">
                <h2 className="font-semibold text-[#343434] text-[24px]">
                  {profile.firstName}{" "}{profile.lastName}
                </h2>
                <span className="flex">
                  <img
                    src={location}
                    alt=""
                    className="w-[11.85px] h-[16.93px] mt-2"
                  />
                  <p className="font-[400] text-[20.32px] text-[#4A4A4A] mr-2 ml-2">
                    {profile.countryName}
                  </p>
                  <img
                    src={edit}
                    alt=""
                    className="w-[11.88px] h-[11.88px] mt-[10px] cursor-pointer"
                  />
                </span>
              </span>
            </div>
            {/* <div className="flex mt-8">
              <Button
                label="Upload New Picture"
                classname="text-[14px] font-[600] text-[#4A4A4A] bg-white rounded-[8px] w-[186px] h-[45px] mr-4 btn-shadow"
              />
              <Button
                label="Delete"
                classname="rounded-[8px] text-[#4A4A4A] text-[14px] font-[600] w-[102px] h-[45px] bg-[#B6B6B673]"
              />
            </div> */}
          </div>
          <div className="mt-5 w-full">
            <p className="text-[24px] font-semibold mb-2">Full Name</p>
            <form className="flex">
              <SettingsInput label="First Name" value={profile.firstName} />
              <SettingsInput label="Last Name" value={profile.lastName} />
            </form>
          </div>
        </div>
        <div className="pt-4 pb-6 border-b border-b-[rgba(149, 152, 154, 0.5)]">
          <h2 className="font-semibold text-[24px] text-[#343434]">
            Contact Details
          </h2>
          <p className="text-[16px] text-[#707070]">
            Edit your contact information from here
          </p>
          <span className="flex justify-between mt-2">
            <p></p>
            <span>
              <img
                src={add}
                alt=""
                className="w-[20px] h-[20px] absolute mt-4 ml-4"
              />
              {/* <Button
              label="Add Another Number"
              classname="text-[#4A4A4A] btn-shadow text-[14px] font-semibold rounded-[8px] w-[231px] p-4 bg-white"
            /> */}
            </span>
          </span>
          <p className="font-[400] text-[18px] text-[#343434] flex">
            +91-{profile.phoneNumber}{" "}
            {/* <img
            src={edit}
            alt=""
            className="w-[11.88px] h-[11.88px] mt-2 ml-1 cursor-pointer"
          /> */}
          </p>
          <p className="font-[500] text-[18px] text-[#343434] flex">
            {profile.address}{" "}
            <img
              src={edit}
              alt=""
              className="w-[11.88px] h-[11.88px] mt-2 ml-1 cursor-pointer"
            />
          </p>
        </div>
        {/* <div className="pt-4 pb-6 border-b border-b-[rgba(149, 152, 154, 0.5)]">
        <h2 className="font-semibold text-[24px] text-[#343434]">
          Modify Password
        </h2>
        <p className="text-[#707070] text-[16px] mb-8">
          Modify your current password
        </p>
        <form className="flex">
          <SettingsInput
            label="Current Password"
            type="password"
            value={state.currentPassword}
          />
          <SettingsInput
            label="New Password"
            value={state.newPassword}
            type="password"
          />
        </form>
      </div> */}
        {/* <div className="pt-4 pb-6 border-b border-b-[rgba(149, 152, 154, 0.5)]">
          <h2 className="font-semibold text-[24px] text-[#343434]">
            Delete Account
          </h2>
          <p className="text-[16px] text-[#707070] mb-8">
            Would you like to delete your account? Please note that deleting your
            account will remove all information associated with it.
          </p>
          <img
            src={delete_}
            alt=""
            className="w-[16.5px] h-[17.19px] absolute m-[14px] ml-12"
          />
          <Button
            label="Delete Account"
            classname="text-[15px] p-3 w-[246px] text-[#E33629] font-semibold rounded-[8px] bg-white btn-shadow mb-4 hover:bg-[#E33629] hover:text-white"
            handleClick={() => setOpenModal(true)}
          />
        </div> */}
        {/* <SettingsModal
          handleClose={() => setOpenModal(false)}
          openModal={openModal}
        /> */}
      </section>
    </main>
  );
};

export default Settings;
