import React, { useState } from "react";
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
import Layout from "./Layout";
import SideBarSection from "./ChooseTemplate/components/SideBarSection";
import PagesHeader from "@/src/shared/header/PagesHeader";
import Image from "next/image";
import SuccessfullyCreated from "./ChooseTemplate/components/SuccessfullyCreated";

const SelectedFeedbackCard = () => {
  const [email, setEmail] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { isOpen, setIsOpen, handleClick } = useVisibilityControl();
  const {
    isOpen: isSend,
    setIsOpen: setIsSend,
    handleClick: handleSendFeedbackCard,
  } = useVisibilityControl();
  const handleEventListener = () => {
    setEmail(true);
  };

  return (
    <>
      <PagesHeader />
      <div className="flex items-center justify-center bg-gray-200 py-16">
        <div className="space-y-4 bg-white w-7/12">
          <div className="px-12 pt-12 pb-5">
            <p className="text-gray-700 font-bold text-3xl">
              Personal Data Card
            </p>
            <p className="text-gray-500 font-semibold">
              Enter details on the form below
            </p>
          </div>

          <hr />

          <div className="p-12 space-y-10">
            <div className="space-y-2">
              <label className="font-bold teext-gray-500">Name</label>
              <div className="flex space-x-3 w-full">
                <InputCard type="text" placeholder="Abu" label="First Name" />
                <InputCard
                  type="text"
                  placeholder="Godwin"
                  label="Second Name"
                />
              </div>
            </div>

            <div className="flex space-x-3 w-full">
              <div className="space-y-2 w-full">
                <label className="font-bold teext-gray-500">Phone Number</label>
                <div className="flex space-x-3 w-full">
                  <InputCard
                    type="text"
                    placeholder="(000) 000-0000"
                    label="Phone Number"
                  />
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label className="font-bold teext-gray-500">Email</label>
                <div className="flex space-x-3 w-full">
                  <InputCard type="email" placeholder="Abu" label="Email" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold teext-gray-500">Address</label>
              <div className="space-y-3 w-full">
                <InputCard
                  type="text"
                  placeholder="Abu"
                  label="Street Address"
                />
                <InputCard
                  type="text"
                  placeholder="Godwin"
                  label="Street Address Line1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex space-x-3 w-full">
                <div className="space-y-2 w-full">
                  <div className="flex space-x-3 w-full">
                    <InputCard type="text" label="City" />
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex space-x-3 w-full">
                    <InputCard type="email" label="State / Province" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 w-full">
                <div className="space-y-2 w-full">
                  <div className="flex space-x-3 w-full">
                    <InputCard type="text" label="Postal / Zip Code" />
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex space-x-3 w-full">
                    <InputCard
                      type="email"
                      placeholder="United Kingdom"
                      label="Country"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex w-full space-x-3">
                <div className="space-y-2 w-full">
                  <label className="font-bold teext-gray-500">Gender</label>
                  <InputCard type="text" />
                </div>
                <div className="space-y-2 w-full">
                  <label className="font-bold teext-gray-500">Birth Date</label>
                  <div className="flex space-x-2">
                    <InputCard type="email" placeholder="09" label="Date" />
                    <InputCard type="email" placeholder="11" label="Country" />
                    <InputCard
                      type="email"
                      placeholder="2024"
                      label="Country"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold teext-gray-500">Add Some Additional Info</label>
              <Textarea className="h-44 width-full border"></Textarea>
            </div>

            <Button
              onClick={handleClick}
              className="text-white font-bold bg-green-600 rounded-lg shadow-3xl py-2 px-5 w-full mt-3"
            >
              Create Card
            </Button>
          </div>

          <Modal
            openModal={isOpen}
            setOpenModal={setIsOpen}
            modalContent={
              <div className="h-max w-[600px] space-y-2 pb-6">
                <div className="flex items-center justify-between pt-3">
                  <p className="font-bold text-black text-xl pl-3">
                    Share Card
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
                        <SecurityVerified
                          color="green"
                          width={25}
                          height={25}
                        />
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

                          <Button
                            onClick={handleSendFeedbackCard}
                            className="bg-green-600 text-white px-5 py-1 shadow-2xl"
                          >
                            SEND CARD
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
      </div>

      {isSend && (
        <Modal
          openModal={isSend}
          setOpenModal={setIsSend}
          modalContent={<SuccessfullyCreated />}
        />
      )}
    </>
  );
};

export default SelectedFeedbackCard;

const InputCard = ({
  type,
  label,
  placeholder,
}: {
  type?: string;
  label?: string;
  placeholder?: string;
}) => {
  return (
    <div className="w-full space-y-2">
      <input
        type={type}
        placeholder={placeholder}
        className="flex items-center border w-full h-10 p-2 borderless-input"
      />
      <p className="font-thin text-[12px] text-gray-600">{label}</p>
    </div>
  );
};
