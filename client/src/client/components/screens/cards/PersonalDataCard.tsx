import React from "react";
import { Textarea } from "@heathmont/moon-core-tw";
import { InputCard } from "../components/Input";
import ButtonItem from "../components/Button";

const PersonalDataCard = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center px-12 pt-12 pb-5">
        <p className="text-black font-bold text-3xl">Personal Data Card</p>
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
            <InputCard type="text" placeholder="Godwin" label="Second Name" />
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
            <InputCard type="text" placeholder="Abu" label="Street Address" />
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
                <InputCard type="email" placeholder="2024" label="Country" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold teext-gray-500">
            Add Some Additional Info
          </label>
          <Textarea className="h-44 width-full border"></Textarea>
        </div>

        <ButtonItem handleClick={handleClick} />
      </div>
    </div>
    
  );
};

export default PersonalDataCard;
