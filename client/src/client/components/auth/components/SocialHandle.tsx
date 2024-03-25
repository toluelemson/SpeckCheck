import { Button } from "@heathmont/moon-core-tw";
import React from "react";
import Link from "next/link";
import GoogleIcon from "../../svg/google";
import FacebookIcon from "../../svg/Facebook";

const SocialHandle = ({
  text,
  link,
  linkText,
}: {
  text: string;
  link: string;
  linkText: string;
}) => {
  return (
    <div>
      <div className="flex items-center mt-8 w-full space-x-3">
        <Button className="flex justify-center w-full  rounded-xl border h-12">
          <GoogleIcon width="20" height="20" />
          <p className="text-black font-bold">Google</p>
        </Button>
        <Button className="flex w-full justify-center rounded-xl border h-12">
          <FacebookIcon width="20" height="20" color="blue" />
          <p className="text-black font-bold">Facebook</p>
        </Button>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500">
        {text}
        <Link href={link} className="font-bold leading-6 text-green-500 pl-1">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default SocialHandle;
