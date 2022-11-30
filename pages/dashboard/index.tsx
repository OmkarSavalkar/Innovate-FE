import React, { useEffect, useState } from "react";
import TechStack from "../../components/common/techStack";
import UserCard from "../../components/common/userCard";
import LayoutComponent from "../../components/layout";
import ExpertApprovalComponent from "../../components/manager/expertApproval";

const Dashboard = () => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    let userdata: any = sessionStorage.getItem("user");
    userdata = JSON.parse(userdata);
    setUserData(userdata);
  }, []);

  return (
    <>
      {userData?.role === "Manager" && (
        <LayoutComponent
          profileLayout={false}
          sideBarList={["Techstacks", "Manage Experts"]}
          topCard={<UserCard />}
          main={[
            <div key={0}>
              <TechStack />
            </div>,
            <div key={1}>
              {" "}
              <ExpertApprovalComponent />
            </div>,
          ]}
          rightTop={[<>Top Tech Stack</>, <>Top Manage Expert</>]}
          rightBottom={[<>Bottom Tech Stack</>, <>Bottom Manage Expert</>]}
        />
      )}
      {userData?.role === "Expert" && (
        <LayoutComponent
          profileLayout={false}
          sideBarList={["Techstacks", "Discuss Forum"]}
          topCard={<UserCard />}
          main={[
            <div key={0}>
              <TechStack />
            </div>,
            <>Sidebar Discuss Form</>,
          ]}
          rightTop={[<>Top Tech Stack</>, <>Top Manage Expert</>]}
          rightBottom={[<>Bottom Tech Stack</>, <>Bottom Manage Expert</>]}
        />
      )}
      {userData?.role === "User" && (
        <LayoutComponent
          profileLayout={false}
          sideBarList={["Techstacks"]}
          topCard={<UserCard />}
          main={[
            <div key={0}>
              <TechStack />
            </div>,
            <>Sidebar Discuss Form</>,
          ]}
          rightTop={[<>Top Tech Stack</>, <>Top Manage Expert</>]}
          rightBottom={[<>Bottom Tech Stack</>, <>Bottom Manage Expert</>]}
        />
      )}
    </>
  );
};
export default Dashboard;
