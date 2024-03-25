import ForgetPassword from "@/src/client/components/auth/ForgetPassword/ForgetPassword";
import type { NextPage } from "next";

const ResetPassword: NextPage = (props) => (
  <div>
    <ForgetPassword {...props} />
  </div>
);

export default ResetPassword;
