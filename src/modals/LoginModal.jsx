import React from "react";
import Modal from "./Modal";
import success from "../assets/PNG/download.png";
import Button from "../components/auth/Button";

const LoginModal = ({ openModal, loader, handleClick }) => {
  return (
    <Modal
      id="alert-dialog-title"
      title=""
      children={
        <div>
          <img src={success} className="w-[100px] h-[100px] mx-auto -mb-8" />
          <Button
            label={loader ? "loading..." : "Continue"}
            classname="w-[200px] sm:w-[400px] input-content btn"
            handleClick={handleClick}
          />
        </div>
      }
      openModal={openModal}
    />
  );
};

export default LoginModal;
