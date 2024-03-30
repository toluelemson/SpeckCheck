// Input.tsx
import React, { useState } from "react";
import { useField } from "formik";
import { ControlsEye, ControlsEyeCrossed } from "@heathmont/moon-icons-tw";

type InputProps = {
  placeHolder: string;
  inputType: string;
  icon: React.ComponentType<{
    height: number;
    width: number;
    color: string;
    className: string;
  }>;
  name: string;
};

const Input: React.FC<InputProps> = ({
  icon: IconComponent,
  inputType,
  placeHolder,
  name,
}) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div
        className={`flex bg-white items-center justify-center border rounded-lg h-12 ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
      >
        {IconComponent && (
          <IconComponent height={35} width={35} color="gray" className="mx-2" />
        )}

        <input
          {...field}
          type={inputType === "password" && !showPassword ? "password" : "text"}
          autoComplete={inputType}
          placeholder={placeHolder}
          className="h-10 w-full borderless-input"
        />

        {inputType === "password" && (
          <button
            type="button"
            onClick={handleToggleVisibility}
            className="focus:outline-none"
          >
            {showPassword ? (
              <ControlsEye
                height={35}
                width={35}
                color="gray"
                className="m-1"
              />
            ) : (
              <ControlsEyeCrossed
                height={35}
                width={35}
                color="gray"
                className="m-1"
              />
            )}
          </button>
        )}
      </div>

      {meta.touched && meta.error ? (
        <div className="error text-red-500 text-[11px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
