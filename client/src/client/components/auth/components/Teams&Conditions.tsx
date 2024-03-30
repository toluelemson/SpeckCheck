import React from "react";

const TeamsAndConditions = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-400 text-xs cursor-pointer">
        By creating an account means you agree to the
        <span className="font-bold text-green-500">
          {" "}
          Terms & Conditions
        </span>{" "}
        and our
        <span className="font-bold text-green-500"> Privacy Policy</span>
      </p>
    </div>
  );
};

export default TeamsAndConditions;
