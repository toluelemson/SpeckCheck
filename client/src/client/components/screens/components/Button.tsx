import { Button } from "@heathmont/moon-core-tw";
import { useRouter } from "next/router";
import React from "react";

const ButtonItem = ({ handleClick }: { handleClick?: () => void }) => {
  const router = useRouter();

  return (
    <Button
      onClick={
        router.asPath.split("/")[1] === "chooseTemplate"
          ? handleClick
          : undefined
      }
      className="text-white font-bold bg-green-600 rounded-lg shadow-3xl py-2 px-5 w-full mt-3"
    >
      {router.asPath.split("/")[1] === "chooseTemplate"
        ? "Create Card"
        : "Submit"}
    </Button>
  );
};

export default ButtonItem;
