import React, { useEffect, useState } from "react";
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
          sideBarList={["Techstacks", "Manage Experts"]}
          topCard={<UserCard />}
          main={[<>Main Tech Stack</>, <ExpertApprovalComponent />]}
          rightTop={[<>Top Tech Stack</>, <>Top Manage Expert</>]}
          rightBottom={[<>Bottom Tech Stack</>, <>Bottom Manage Expert</>]}
        />
      )}
    </>
  );
};
export default Dashboard;
