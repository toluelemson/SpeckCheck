export const InputCard = ({
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
