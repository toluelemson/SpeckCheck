import { useState } from "react";

function HandleCopyText(href: string) {
  const [link, setLink] = useState(`${href}`);
  const [isCopy, setIsCopy] = useState(false);

  const handleCopyCode = () => {
    if (link.length > 1) {
      setIsCopy(true);
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log("Link copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy link: ", error);
        });
    }
  };

  return { link, isCopy, setLink, setIsCopy, handleCopyCode };
}

export default HandleCopyText;
