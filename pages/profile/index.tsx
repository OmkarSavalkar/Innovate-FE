import React, { useEffect, useState } from "react";
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
      <ProfileComponent userData={userData} />
    </div>
  ) : (
    <></>
  );
};
export default Profile;
