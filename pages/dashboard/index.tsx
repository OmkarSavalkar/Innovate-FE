import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TechStack from "../../components/common/techStack";
import UserCard from "../../components/common/userCard";
import LayoutComponent from "../../components/layout";
import ExpertApprovalComponent from "../../components/manager/expertApproval";
import ExpertChart from "../../components/manager/expertChart";
import { useAppDispatch, useAppSelector } from "../../side-effects/hooks";
import { getManager } from "../../side-effects/manager";

const Dashboard = () => {
  const [userData, setUserData] = useState<any>();
  const [managerChartData, setManagerChartData] = useState<Object>({
    labels: ["Pending", "Approved"],
    datasets: [],
  });
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: any) => state.manager
  );
  useEffect(() => {
    let tempUserdata: any = sessionStorage.getItem("user");
    tempUserdata = JSON.parse(tempUserdata);
    setUserData(tempUserdata);
    console.log("^^");
    if (tempUserdata?.role === "Manager") {
      dispatch(getManager());
    }
  }, [dispatch]);
  useEffect(() => {
    console.log("^^", data?.data?.pendingApproval, data?.data?.approvedExperts);
    let totalExpert =
      data?.data?.pendingApproval && data?.data?.approvedExperts
        ? [...data?.data?.pendingApproval, ...data?.data?.approvedExperts]
        : [];

    let tempManagerData =
      totalExpert &&
      totalExpert.map((expert) => {
        return {
          id: expert._id,
          status: expert.isApproved ? "Approved" : "Pending",
        };
      });
    console.log("^^", tempManagerData);
    setManagerChartData({
      ...managerChartData,
      datasets: {
        label: "Expert Status",
        data: tempManagerData,
      },
    });
  }, [data]);
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
          rightBottom={[
            <>Bottom Tech Stack</>,
            <></>,
            // <ExpertChart chartData={managerChartData} key={1} />,
          ]}
        />
      )}
      {userData?.signupRole === "Expert" && (
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
      {userData?.signupRole === "User" && (
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
