import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TechStack from "../../components/common/techStack";
import UserCard from "../../components/common/userCard";
import LayoutComponent from "../../components/layout";
import ExpertApprovalComponent from "../../components/manager/expertApproval";
import ExpertChart from "../../components/manager/expertChart";
import { useAppDispatch, useAppSelector } from "../../side-effects/hooks";
import { getManager } from "../../side-effects/manager";
import UserAddStack from "../../components/common/addStack/userAddStack";
import ManagerAddStack from "../../components/common/addStack/managerAddStack";
import PendingList from "../../components/manager/pendingList";

const Dashboard = () => {
  const [userData, setUserData] = useState<any>();
  const [managerChartData, setManagerChartData] = useState<Object>({});
  const [pendingData, setPendingData] = useState<any>();
  const [approvedData, setApprovedData] = useState<any>();
  const [directExpertOpen, setDirectExpertOpen] = useState<number>();
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
    if (data) {
      data?.data?.pendingApproval.length > 0
        ? setPendingData(data?.data?.pendingApproval)
        : setApprovedData(data?.data?.approvedExperts);
    }

    setManagerChartData({
      labels: ["Pending", "Approved"],
      datasets: [
        {
          label: "Expert Status",
          data: [
            data?.data?.pendingApproval.length,
            data?.data?.approvedExperts.length,
          ],
          backgroundColor: ["#e4dbff", "#3d156b"],
        },
      ],
    });
  }, [data, directExpertOpen]);

  return (
    <>
      {userData?.role === "Manager" && (
        <LayoutComponent
          profileLayout={false}
          sideBarList={["Techstacks", "Manage Experts", "News"]}
          topCard={<UserCard />}
          main={[
            <div key={0}>
              <TechStack />
            </div>,
            <div key={1}>
              {" "}
              <ExpertApprovalComponent directExpertOpen={directExpertOpen} />
            </div>,
          ]}
          rightTop={[
            <>Top Tech Stack</>,
            <>
              <PendingList
                pendingData={pendingData}
                approvedData={approvedData}
                setDirectExpertOpen={setDirectExpertOpen}
              />
            </>,
          ]}
          rightBottom={[
            <div key={0}>
              <ManagerAddStack />
            </div>,
            <ExpertChart chartData={managerChartData} key={1} />,
          ]}
        />
      )}
      {userData?.signupRole === "Expert" && (
        <LayoutComponent
          profileLayout={false}
          sideBarList={["Techstacks", "Discuss Forum", "News"]}
          topCard={<UserCard />}
          main={[
            <div key={0}>
              <TechStack />
            </div>,
            <>Sidebar Discuss Form</>,
          ]}
          rightTop={[<>Top Tech Stack</>, <>Top Manage Expert</>]}
          rightBottom={[
            <div key={0}>
              <UserAddStack />
            </div>,
            <>Bottom Manage Expert</>,
          ]}
        />
      )}
      {userData?.signupRole === "User" && (
        <LayoutComponent
          profileLayout={false}
          sideBarList={["Techstacks", "News"]}
          topCard={<UserCard />}
          main={[
            <div key={0}>
              <TechStack />
            </div>,
            <>Sidebar Discuss Form</>,
          ]}
          rightTop={[<>Top Tech Stack</>, <>Top Manage Expert</>]}
          rightBottom={[
            <div key={0}>
              <UserAddStack />
            </div>,
            <>Bottom Manage Expert</>,
          ]}
        />
      )}
    </>
  );
};
export default Dashboard;
