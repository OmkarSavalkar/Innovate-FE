import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ForgetComponent from "../../../components/forgetComponent";

const ResetPassword = () => {
  const router = useRouter();
  const [urlResetToken, setUrlResetToken] = useState<String>("");
  useEffect(() => {
    if (router.isReady) setUrlResetToken(String(router.query.token));
  }, [router.isReady, router.query.token]);
  return urlResetToken && urlResetToken ? (
    <ForgetComponent urlResetToken={urlResetToken} />
  ) : (
    <></>
  );
};
export default ResetPassword;
