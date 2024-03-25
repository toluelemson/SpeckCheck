import SignUp from "@/src/client/components/auth/SignUp";
import type { NextPage } from "next";

const SignUpPage: NextPage = (props) => (
  <div>
    <SignUp {...props} />
  </div>
);

export default SignUpPage;
