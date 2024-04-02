import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Successfull from "./../assets/congrat.gif";
import Image from "next/image";

const SuccessfullyCreated = () => {
  const router = useRouter();
  // useEffect(() => {
  //   const redirectTimer = setTimeout(() => {
  //     router.push("/dashboard");
  //   }, 2000);

  //   return () => clearTimeout(redirectTimer);
  // }, [router]);

  return (
    <div className="flex flex-col items-center justify-center pb-10 bg-white">
      <Image src={Successfull} alt="successfult alt" />
      <p className="font-bold text-2xl -mt-10">Congratulations!</p>
      <p>Great job 👍, your work here is done</p>
    </div>
  );
};

export default SuccessfullyCreated;
