import React, { useEffect, useState } from "react";
import UserCard from "../../components/common/userCard";
import LayoutComponent from "../../components/layout";
import ProfileComponent from "../../components/profileComponent";

const Profile = () => {
  const [userData, setUserData] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    let userdata: any = sessionStorage.getItem("user");
    userdata = JSON.parse(userdata);
    setUserData(userdata);
  }, [refresh]);

  return !!userData ? (
    <>
      <LayoutComponent
        secondaryLayout={true}
        sideBarList={[{ sideBarName: "Profile", secondaryLayout: true }]}
        sideBarNavigationList={[{ page: "Dashboard", pageUrl: "/dashboard" }]}
        main={[
          <ProfileComponent
            userData={userData}
            setUserData={setUserData}
            setRefresh={setRefresh}
            refresh={refresh}
            key={0}
          />,
        ]}
        // rightTop={[<>Top Tech Stack</>, <>Top Manage Expert</>]}
        // rightBottom={[<>Bottom Tech Stack</>, <>Bottom Manage Expert</>]}
      />
    </>
  ) : (
    <></>
  );
};
export default Profile;
