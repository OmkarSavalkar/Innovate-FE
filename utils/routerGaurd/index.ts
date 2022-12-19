import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const RouteGuard = ({ children }: any) => {
  const router = useRouter();
  const [pathAllowed, setPathAllowed] = useState(false);

  let isPublicPath = (path: any) => {
    const publicPaths = [
      "/",
      "/login",
      "/recoverPassword",
      "/signup",
      "/chatScreen",
    ];
    return publicPaths.includes(path);
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("token");

    if (!!authToken) {
      let url = router.asPath;
      setPathAllowed(true);
      console.log("auth1**");
    } else {
      let url = router.asPath;
      console.log("auth2**");
      let checkResetUrl = url.split("/")[1];
      if (checkResetUrl == "reset-password") {
        setPathAllowed(true);
        console.log("auth3**");
      } else {
        let path = url.split("?")[0];
        console.log("auth4**");
        if (isPublicPath(path)) {
          setPathAllowed(true);
          console.log("auth5**");
        } else {
          setPathAllowed(false);
          router.replace("/login");
          console.log("auth6**");
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return pathAllowed && children;
};
