import { useRouter } from "next/router";

export const UrlPathname = () => {
  const router = useRouter();
  const { asPath } = router;

  const extractedPath = asPath.split("/")[1];
  const capitalizedPath =
    extractedPath.charAt(0).toUpperCase() + extractedPath.slice(1);

  return capitalizedPath;
};
