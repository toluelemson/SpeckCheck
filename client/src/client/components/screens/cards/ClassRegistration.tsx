import React from 'react'
import { InputCard } from '../components/Input';
import ButtonItem from '../components/Button';

const ClassRegistration = ({handleClick}: {handleClick?: () => void}) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center px-12 pt-12 pb-5">
        <p className="flex items-center font-bold text-xl">
          Class Registration
        </p>
        <p className="text-gray-500 font-semibold">
          Fill out the form carefully for registration
        </p>
      </div>

      <hr />

      <div className="p-12 space-y-16">
        <div className="space-y-2">
          <label className="font-bold teext-gray-500">Student Name</label>
          <div className="flex space-x-3 w-full">
            <InputCard type="text" label="First Name" />
            <InputCard type="text" label="Middle Name" />
            <InputCard type="text" label="Last Name" />
          </div>
        </div>

        <div className="flex items-start justify-between space-x-3">
          <div className="space-y-2 w-full">
            <label className="font-bold teext-gray-500">Gender</label>
            <div className="flex space-x-3 w-full">
              <InputCard type="text" label="" />
            </div>
          </div>
          <div className="space-y-2 w-full">
            <label className="font-bold teext-gray-500">Student E-mail</label>
            <div className="flex space-x-3 w-full">
              <InputCard
                type="text"
                label="example@example.com"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between space-x-3">
          <div className="space-y-2 w-full">
            <label className="font-bold teext-gray-500">Stedent ID</label>
            <div className="flex space-x-3 w-full">
              <InputCard type="text" label="" />
            </div>
          </div>
          <div className="space-y-2 w-full">
            <label className="font-bold teext-gray-500">List of Classes</label>
            <div className="flex space-x-3 w-full">
              <InputCard
                type="text"
                label=""
              />
            </div>
          </div>
        </div>

        <ButtonItem handleClick={handleClick}/>
      </div>
    </div>
  );
}

export default ClassRegistration