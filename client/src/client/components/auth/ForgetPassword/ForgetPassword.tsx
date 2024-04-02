import React from "react";
import { MailEnvelope } from "@heathmont/moon-icons-tw";
import LoginButton from "../components/Button";
import Link from "next/link";
import Input from "@/src/client/shared/Input";
import SideSection from "../components/SideSection";

const ForgetPassword = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <SideSection />
      <div className="flex flex-col items-center justify-center px-6 lg:w-1/2 w-full">
        <div className="items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-col">
            <h1 className="font-bold mb-2 text-xl">Reset Your Password</h1>
            <p className="mt-1 text-gray-500">
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </p>
          </div>

          <div className="w-full mt-7"></div>
          <Input placeHolder="Email" icon={MailEnvelope} inputType="email" />
          <LoginButton text="Continue" link="/login" />
          <p className="mt-5 text-center text-sm">
            <Link
              href="/register"
              className="font-bold leading-6 text-black pl-1"
            >
              Back to Sign In
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center lg:mt-48">
          <p className="text-start text-sm text-gray-500">
            {`Don't receive an account?`}
            <Link
              href="/forgetpassword"
              className="font-bold leading-6 text-green-500 pl-1"
            >
              Resend
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
