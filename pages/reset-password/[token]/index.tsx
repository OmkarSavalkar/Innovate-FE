import { useRouter } from "next/router";
import React from "react";
import ForgetComponent from "../../../components/forgetComponent";

const ResetPassword = () => {
  const router = useRouter();
  console.log("router token value", router.query.token);
  return (
    <>
      <ForgetComponent />
    </>
  );
};
export default ResetPassword;
