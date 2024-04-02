// SignUp.tsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SocialLogin from "../components/SocialHandle";
import OrContinueWith from "../components/OrContinueWith";
import SideSection from "../components/SideSection";
import Input from "@/src/client/shared/Input";
import {
  GenericUser,
  MailEnvelope,
  SecurityPassword,
} from "@heathmont/moon-icons-tw";
import TeamsAndConditions from "../components/Teams&Conditions";
import AuthButton from "../components/Button";

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // form submission
        console.log(values);
        setSubmitting(false);
      }}
    >
      <div className="flex items-center justify-center w-full">
        <SideSection />
        <div className="px-6 py-12 lg:w-1/2 w-full">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-col">
              <h1 className="font-bold mb-2 text-xl">Sign Up for an Account</h1>
            </div>
            <Form className="space-y-4 mt-7">
              <Input
                name="username"
                placeHolder="Username"
                icon={GenericUser}
                inputType="text"
              />
              <Input
                name="password"
                placeHolder="Password"
                icon={SecurityPassword}
                inputType="password"
              />
              <Input
                name="email"
                placeHolder="Email"
                icon={MailEnvelope}
                inputType="email"
              />
              <p className="text-md text-gray-400 -mt-2 text-xs">
                Your password must have at least 8 characters
              </p>
              <TeamsAndConditions />
              <AuthButton text="Submit" type="submit" />
            </Form>

            <OrContinueWith text="Or sign up with" />
            <SocialLogin
              text="Already have an account?"
              link="/"
              linkText="Sign In"
            />
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default SignUp;
