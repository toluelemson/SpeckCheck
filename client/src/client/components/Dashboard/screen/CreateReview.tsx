import React, { useState } from "react";
import Layout from "../Layout";
import { Button, Textarea } from "@heathmont/moon-core-tw";
import { useVisibilityControl } from "@/src/hooks/useDeviceVisibility";
import Modal from "@/src/shared/modal/Modal";
import {
  ArrowsUpdate,
  GenericLink,
  MailEnvelope,
  SecurityLock,
  SecurityVerified,
} from "@heathmont/moon-icons-tw";
import { truncateText } from "@/src/shared/utils/TruncateText";

const CreateReview = () => {
  const [email, setEmail] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { isOpen, setIsOpen, handleClick } = useVisibilityControl();

  const handleEventListener = () => {
    setEmail(true);
  };

  return (
    <Layout>
      <div className="bg-white h-max w-full rounded-lg space-y-4 p-4">
        <div>
          <label className="text-black font-bold pl-2">Review Title</label>
          <Textarea className="flex items-center border w-full h-10 p-2"></Textarea>
        </div>
        <div>
          <label className="text-black font-bold pl-2">Review</label>
          <Textarea className="border w-full h-44"></Textarea>
        </div>

        <Button
          onClick={handleClick}
          className="text-white font-bold bg-green-600 rounded-lg shadow-3xl py-2 px-5 w-full mt-3"
        >
          Proceed
        </Button>

        <Modal
          openModal={isOpen}
          setOpenModal={setIsOpen}
          modalContent={
            <div className="h-max w-[600px] space-y-2 pb-6">
              <div className="flex items-center justify-between py-2">
                <p className="font-bold text-black text-xl pl-3">
                  Share Review
                </p>
              </div>
              <hr />
              <div className="px-6">
                <div className="flex flex-col items-start justify-start pb-6 space-y-2 pt-5">
                  <div className="flex items-center">
                    <p className="font-bold">Link To Share</p>
                    <Button
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className="flex items-center border border-green-400 ml-3 rounded-full bg-green-100 font-bold text-[12px]"
                    >
                      <SecurityLock color="black" height={25} width={25} />
                      <p>Send Anonymously</p>
                    </Button>
                    {isAnonymous && (
                      <SecurityVerified color="green" width={25} height={25} />
                    )}
                  </div>

                  <div className="flex items-center justify-start w-full space-x-3 pt-2">
                    <div className="flex items-center justify-between h-11 bg-gray-200 w-max rounded-lg">
                      <GenericLink height={30} width={30} className="ml-2" />
                      <div className="text-start px-2">
                        {truncateText(
                          "https://www.jotform.com/inbox/240826703216048?st=VnF0SWRwQ1M4YmxVRGR1UXU5TnJDcXBIWWo0NW54TGdGeXcwNGhIUjdES3lhWlFiZjAyb25ZYU1palZuL0hHdUxkYy9uTXNxemJzcDhIZ1lCNmd4S2g2QTdiVXdDNW9VWXBXTTJiVHNtRkZOQTJPdkNlalhlb0RDZko4RTdYQXI=",
                          42
                        )}
                      </div>
                      <div className=" border-l border-gray-300 p-1">
                        <ArrowsUpdate height={30} width={30} />
                      </div>
                    </div>
                    <button className="bg-green-600 text-white px-3 py-2 w-max font-bold rounded-lg">
                      Copy Link
                    </button>
                  </div>
                </div>

                <hr />

                <div className="flex flex-col pt-3 space-y-3">
                  <p className="font-bold text-black">Invite by email</p>
                  <div className="flex items-center space-x-2 border pl-1">
                    <MailEnvelope color="green" height={35} width={35} />
                    <p>To:</p>
                    <input
                      type="text"
                      placeholder="Enter email address to send review by permission"
                      onClick={handleEventListener}
                      className="flex items-center w-full h-10 p-2 borderless-input"
                    />
                  </div>

                  {email && (
                    <>
                      <Textarea className="h-44 w-full border"></Textarea>
                      <div className="flex items-center justify-between">
                        <Button
                          onClick={() => setIsOpen(false)}
                          className="text-black bg-gray-300 px-5 py-1 shadow-2xl"
                        >
                          CANCEL
                        </Button>

                        <Button className="bg-green-600 text-white px-5 py-1 shadow-2xl">
                          SEND INVITATION
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          }
        />
      </div>
    </Layout>
  );
};

export default CreateReview;
