import { Button } from '@heathmont/moon-core-tw';
import React from 'react'

const ButtonItem = ({handleClick}: {handleClick?: () => void}) => {
  return (
    <Button
      onClick={handleClick}
      className="text-white font-bold bg-green-600 rounded-lg shadow-3xl py-2 px-5 w-full mt-3"
    >
      Create Card
    </Button>
  );
}

export default ButtonItem