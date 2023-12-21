import React from "react";
import LabeledInput from "../../auth/LabeledInput";

const StepOne = ({ inputs, handleChange }) => {
  return (
    <>
      {inputs.map((input, index) => (
        <LabeledInput
          name={input.name}
          type={input.type}
          value={input.value}
          handleChange={handleChange}
          label={input.label}
          key={index}
        />
      ))}
    </>
  );
};

export default StepOne;
