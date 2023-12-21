import React from "react";
import Modal from "./Modal";
import { CgDanger } from "react-icons/cg";
import Button from "../components/auth/Button";

const SettingsModal = ({ openModal, handleClick, handleClose }) => {
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
        <div className="mt-12 mb-10 w-[399px] flex justify-center">
          <Button
            label="Delete"
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
