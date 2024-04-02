import { useRouter } from "next/router";

function ConditionalRenderer({
  content,
  sPContent,
}: {
  content?: React.JSX.Element;
  sPContent?: React.JSX.Element;
}) {
  const router = useRouter();
  const renderContent = () => {
    if (router.asPath.split("/")[1] === "chooseTemplate") {
      return content;
    }
    return sPContent;
  };
  return renderContent();
}

export default ConditionalRenderer;
