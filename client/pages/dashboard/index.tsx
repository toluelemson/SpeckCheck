import Dashboard from "@/src/client/components/dashboard";
import type { NextPage } from "next";

const Dashboards: NextPage = (props) => (
  <div>
    <Dashboard {...props} />
  </div>
);

export default Dashboards;
