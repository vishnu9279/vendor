/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { CgDanger } from "react-icons/cg";
import Button from "../components/auth/Button";
import { useState } from "react";
import {deleteAccountService,logOutService} from "../services/dashBoard";
import showSuccessMessage from "../utils/SwalPopup";

const SettingsModal = ({ openModal, handleClick, handleClose }) => {
  const [deletionReason, setDeletionReason] = useState("");
console.log("deletionReason",deletionReason);
const deleteAccount = async()=>{
  try {
    const resp = await deleteAccountService(deletionReason);
    if(resp) await logOutService()
  } catch (error) {
    console.error("error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showSuccessMessage(errorMessage, "error");
  }
}
  return (
    <Modal
      openModal={openModal}
      id="deleteModal"
      handleClick={handleClick}
      title=""
    >
      
      <div className="flex flex-col justify-center items-center">
        <CgDanger size="130px" className="text-[#E33629]" />
        <h2 className="text-[28px] text-[#4A4A4A] font-semibold mt-2 mb-2 text-center">
          Do you want to delete your account?
        </h2>
        <p className="text-[18px] text-[#4A4A4A] text-center">
          If you delete your account you will not be able to recover the account
        </p>
        
          <div className="items-center w-full mt-5 border rounded-md bg-[#80d7421c]">
            <input
              required
              onChange={(e) => {
                setDeletionReason(e.target.value);
              }}
              type ="text"
              placeholder="Enter Your Reason"
              className="w-full p-5 ml-3 text-black outline-none bg-transparent"
            />
          </div>
       
        <div className="mt-12 mb-10 w-[399px] flex justify-center">
          <Button
            label="Delete"
            handleClick={deleteAccount}
            classname="text-white font-semibold text-[14px] bg-[#E33629] w-[180px] h-[48px] rounded-[8px] mr-6"
          />
          <Button
            label="Cancel"
            classname="text-white font-semibold text-[14px] bg-[#ABABAB] w-[180px] h-[48px] rounded-[8px]"
            handleClick={handleClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
