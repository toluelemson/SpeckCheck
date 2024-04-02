import React, { useState } from "react";
import { InputCard } from "../components/Input";
import ButtonItem from "../components/Button";
import { Textarea } from "@heathmont/moon-core-tw";

const FeedbackDataCard = ({ handleClick }: { handleClick?: () => void }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    console.log(`Selected feedback type: ${event.target.value}`);

  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-12 pt-12 pb-5">
        <p className="flex items-center font-bold text-center text-xl">
          Feedback Form
        </p>
        <p className="text-gray-500 font-semibold text-center">
          We would love to hear your thoughts, suggestions, concerns or problems
          with anything so we can improve!
        </p>
      </div>

      <hr />

      <div className="p-12 space-y-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="comments"
              value="comments"
              checked={selectedOption === "comments"}
              onChange={handleOptionChange}
            />
            <label htmlFor="comments">Comments</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="suggestions"
              value="suggestions"
              checked={selectedOption === "suggestions"}
              onChange={handleOptionChange}
            />
            <label htmlFor="suggestions">Suggestions</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="questions"
              value="questions"
              checked={selectedOption === "questions"}
              onChange={handleOptionChange}
            />
            <label htmlFor="questions">Questions</label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold teext-gray-500">
            Describe your feedback
          </label>
          <Textarea className="h-64 w-full border"></Textarea>
        </div>

        <div className="space-y-2">
          <label className="font-bold teext-gray-500">Name</label>
          <div className="flex space-x-3 w-full">
            <InputCard type="text" label="First Name" />
            <InputCard type="text" label="Middle Name" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold teext-gray-500">Email</label>
          <div className="flex space-x-3 w-full">
            <InputCard type="email" label="example@example.com" />
          </div>
        </div>

        <ButtonItem handleClick={handleClick} />
      </div>
    </div>
  );
};

export default FeedbackDataCard;
