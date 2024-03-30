import { Button } from "@heathmont/moon-core-tw";
import Link from "next/link";
import React from "react";

const AuthButton = ({
  text,
  type,
}: {
  text: string;
  type: "button" | "submit" | "reset" | undefined; 
}) => {
  return (
    <div className="mt-10">
      <Button
        type={type}
        className="flex w-full justify-center rounded-xl bg-green-500 h-12 text-md font-semibold leading-6 text-white shadow-md"
      >
        {text}
      </Button>
    </div>
  );
};

export default AuthButton;
