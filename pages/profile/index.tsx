import React, { useEffect, useState } from "react";
import UserCard from "../../components/common/userCard";
import LayoutComponent from "../../components/layout";
import ProfileComponent from "../../components/profileComponent";

const Profile = () => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    let userdata: any = sessionStorage.getItem("user");
    userdata = JSON.parse(userdata);
    setUserData(userdata);
  }, []);

  return !!userData ? (
    <>
      <LayoutComponent
        profileLayout={true}
        sideBarList={["Profile"]}
        main={[<ProfileComponent userData={userData} key={0} />]}
        // rightTop={[<>Top Tech Stack</>, <>Top Manage Expert</>]}
        // rightBottom={[<>Bottom Tech Stack</>, <>Bottom Manage Expert</>]}
      />
    </>
  ) : (
    <></>
  );
};
export default Profile;
