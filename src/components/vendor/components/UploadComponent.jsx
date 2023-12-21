import React from "react";
import Input from "../../auth/Input";

const UploadComponent = ({ label }) => {
  return (
    <>
      <p className="text-[#666666] text-[16px]">{label}</p>
      <div className="border border-[#66666659] rounded-[12px] p-3 w-full cursor-pointer mb-2">
        <label htmlFor="upload">
          <span className="rounded-[8px] bg-[#DFDFDF] font-[400] text-[16px] text-[#666666] p-2 hidden lg:inline">
            Choose an image
          </span>
          <span className="ml-2 text-[#D9D9D9] text-[16px] font-[400]">
            No files selected
          </span>
          <Input type="file" classname="hidden w-full" id="upload" />
        </label>
      </div>
    </>
  );
};

export default UploadComponent;
