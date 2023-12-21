import React from "react";
import UploadComponent from "./UploadComponent";

const StepThree = () => {
  return (
    <div className="mb-7">
      <UploadComponent label="Upload Adhar Card" />
      <UploadComponent label="Upload Pan Card" />
      <UploadComponent label="Upload Photo" />
    </div>
  );
};

export default StepThree;
