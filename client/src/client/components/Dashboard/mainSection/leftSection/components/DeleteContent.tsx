export const DeleteContent = ({ isClick, setIsClick, setIsOpen }: { isClick: boolean, setIsClick: Function, setIsOpen: Function }) => {
  return (
    <div className="p-5">
      <p className="font-bold text-2xl">Confirm Deletion!</p>
      <p className="mt-2 text-sm">
        Are you sure you want to delete this request? <br /> This action cannot
        be undone.
      </p>
      <div className="flex items-center justify-end mt-8 rounded-lg space-x-2">
        <button
          onClick={() => {setIsOpen(false); setIsClick(!isClick)}}
          className="font-bold bg-red-600 rounded-lg text-white text-sm py-2 px-3"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="font-bold bg-gray-400 rounded-lg text-white text-sm py-2 px-3"
        >
          No, Cancel
        </button>
      </div>
    </div>
  );
};
