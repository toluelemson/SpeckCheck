import React from "react";
import Layout from "./../../dashboard/Layout";
import { Other3DotsHorizontal } from "@heathmont/moon-icons-tw";
import Image from "next/image";
import Checkbox from "@/src/client/shared/Checkbox";
import useTheme from "@/src/context/themeContext/useTheme";
import { PROJECTS_DATA } from "../../dashboard/mainSection/constant/data";
import Link from "next/link";

const Inbox = () => {
  const { theme, colorTheme } = useTheme();

  return (
    <Layout>
      <div className="flex flex-col space-y-5 w-full">
        {PROJECTS_DATA.map((value: any, index: number) => (
          <Link href={`/inbox/${value.id}`} key={index}>
            <div>
              <div
                className={`flex items-center justify-between px-4 py-3 text-xs ${colorTheme.bgColor} rounded-xl font-bold shadow-lg`}
              >
                <div className="flex space-x-1">
                  <Checkbox text="" />
                  <p className={colorTheme.textColor}>{value.title}</p>
                </div>

                <div className="flex space-x-8">
                  <div className="flex items-center bg-yellow-100 px-2 rounded-xl">
                    <p className="text-yellow-500 font-semibold">{`Inbox: ${value.inbox}`}</p>
                  </div>
                  <div className="relative">
                    <Image
                      src={value.pic}
                      alt="pic alt"
                      height={25}
                      width={25}
                      className="border-white border-2 rounded-full"
                    />

                    <Image
                      src={value.pic}
                      alt="pic alt"
                      height={25}
                      width={25}
                      className="absolute left-4 top-0 border-white border-2 rounded-full"
                    />
                  </div>

                  <Other3DotsHorizontal
                    width={30}
                    height={25}
                    className={colorTheme.textColor}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Inbox;
