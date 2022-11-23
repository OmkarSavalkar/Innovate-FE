import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const RouteGuard = ({ children }: any) => {
  const router = useRouter();
  const [pathAllowed, setPathAllowed] = useState(false);

  let isPublicPath = (path: any) => {
    const publicPaths = ["/", "/login", "/recoverPassword", "/signup"];
    return publicPaths.includes(path);
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("token");

    if (!!authToken) {
      let url = router.asPath;
      setPathAllowed(true);
    } else {
      let url = router.asPath;
      let path = url.split("?")[0];
      if (isPublicPath(path)) {
        setPathAllowed(true);
      } else {
        setPathAllowed(false);
        router.replace("/login");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return pathAllowed && children;
};
