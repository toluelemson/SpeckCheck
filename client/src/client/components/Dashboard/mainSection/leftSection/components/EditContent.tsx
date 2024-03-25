import { Textarea } from "@heathmont/moon-core-tw";

export const EditContent = ({
  isClick,
  setIsClick,
  setIsOpen,
}: {
  isClick: boolean;
  setIsClick: Function;
  setIsOpen: Function;
}) => {
  return (
    <div className="p-5">
      <p className="font-bold text-2xl">Edit Content</p>
      <p className="mt-2 text-sm">Edit Request Card</p>
      <Textarea className="w-96 h-max border rounded-lg mt-7 text-sm"></Textarea>
      <div className="flex items-center justify-end mt-8 rounded-lg space-x-2">
        <button
          onClick={() => {setIsOpen(false); setIsClick(!isClick)}}
          className="font-bold bg-red-600 rounded-lg text-white text-sm py-2 px-3"
        >
          Edit
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="font-bold bg-gray-400 rounded-lg text-white text-sm py-2 px-3"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
