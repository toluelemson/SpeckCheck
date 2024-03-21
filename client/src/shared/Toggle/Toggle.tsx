import React, { useState } from 'react';

type ToggleProps = {
	onToggle?: (isChecked: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({ onToggle }) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleToggle = () => {
        const newState = !isChecked;
        
		setIsChecked(newState);
		if (onToggle) {
			onToggle(newState);
		}
	};

	return (
    <label
      style={{
        position: "relative",
        display: "inline-block",
        width: "60px",
        height: "23px",
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          position: "absolute",
          cursor: "pointer",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isChecked ? "#22C55E" : "#ccc",
          transition: "0.4s",
          borderRadius: "34px",
        }}
      >
        <span
          style={{
            position: "absolute",
            content: '""',
            height: "15px",
            width: "15px",
            left: "4px",
            bottom: "4px",
            backgroundColor: "white",
            transition: "0.4s",
            borderRadius: "50%",
            transform: `translateX(${isChecked ? "20px" : "0"})`,
          }}
        />
      </span>
    </label>
  );
};

export default Toggle;
