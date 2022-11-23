import React, { useEffect, useState } from "react";
import AskToLoginMsg from "../../components/askToLoginMsg";
import FooterComponent from "../../components/layout/footerComponent";
import HeaderComponent from "../../components/layout/headerComponent";
import ProfileComponent from "../../components/profileComponent";

const Profile = () => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    let userdata: any = sessionStorage.getItem("user");
    userdata = JSON.parse(userdata);
    setUserData(userdata);
  }, []);

  return !!userData ? (
    <div style={{ backgroundColor: "#F6F3EE", height: "100vh" }}>
      <HeaderComponent userData={userData} />
      <ProfileComponent userData={userData} />
      <FooterComponent />
    </div>
  ) : (
    <>
      <HeaderComponent />
      <FooterComponent />
    </>
  );
};
export default Profile;
