import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MailEnvelope, SecurityPassword } from "@heathmont/moon-icons-tw";
import OrContinueWith from "../components/OrContinueWith";
import Link from "next/link";
import Checkbox from "@/src/client/shared/Checkbox";
import SideSection from "../components/SideSection";
import SocialHandle from "../components/SocialHandle";
import AuthButton from "../components/Button";
import { Input } from "@/src/client/shared/Input";

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // form submission
        console.log(values);
        setSubmitting(false);
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <SideSection />
        <div className="px-6 py-12 lg:w-1/2 w-full">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-col">
              <h1 className="font-bold mb-2 text-xl">
                Sign In to your Account
              </h1>
              <p className="text-gray-500">
                Welcome back! please enter your detail
              </p>
            </div>

            <Form className="space-y-4 mt-7" action="#" method="POST">
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
              <div className="flex items-center justify-between">
                <Checkbox text="Remember me" />
                <div className="text-sm">
                  <Link href="#" className="font-bold text-green-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <AuthButton text="Submit" type="submit" />
            </Form>

            <OrContinueWith text="Or sign up with" />
            <SocialHandle
              text="Don`t have an account?"
              link="/register"
              linkText="Register"
            />
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Login;
