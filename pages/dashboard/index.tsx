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
import DiscussComponent from "../../components/discussComponent";
import NewsComponent from "../../components/common/newsComponent";
import TrendingChat from "../../components/common/trendingChat";
import ExpertBoard from "../../components/common/expertBoard";

const Dashboard = () => {
  const [userData, setUserData] = useState<any>();
  const [managerChartData, setManagerChartData] = useState<Object>({});
  const [pendingData, setPendingData] = useState<any>();
  const [approvedData, setApprovedData] = useState<any>();
  const [directExpertOpen, setDirectExpertOpen] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: any) => state.manager
  );
  const [toggleExpert, setToggleExpert] = React.useState<string | null>(
    "pending"
  );

  useEffect(() => {
    let tempUserdata: any = sessionStorage.getItem("user");
    tempUserdata = JSON.parse(tempUserdata);
    setUserData(tempUserdata);
    if (tempUserdata?.role === "Manager") {
      dispatch(getManager());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("data", data);
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
      if (data?.data?.pendingApproval?.length > 0) {
        setPendingData(data?.data?.pendingApproval);
        setToggleExpert("pending");
      } else {
        setApprovedData(data?.data?.approvedExperts);
        setToggleExpert("approved");
      }
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
          secondaryLayout={false}
          sideBarList={[
            { sideBarName: "Techstacks", secondaryLayout: false },
            { sideBarName: "Manage Experts", secondaryLayout: false },
            { sideBarName: "Expert Board", secondaryLayout: true },
            { sideBarName: "News", secondaryLayout: true },
          ]}
          topCard={<UserCard />}
          main={[
            <div key={0}>
              <TechStack />
            </div>,
            <div key={1}>
              {" "}
              <ExpertApprovalComponent
                directExpertOpen={directExpertOpen}
                toggleExpert={toggleExpert}
                setToggleExpert={setToggleExpert}
              />
            </div>,
            <ExpertBoard key={2} userData={userData} flag={"Non-expert"} />,
            <NewsComponent key={3} />,
          ]}
          rightTop={[
            <TrendingChat key={0} />,
            <PendingList
              pendingData={pendingData}
              approvedData={approvedData}
              setDirectExpertOpen={setDirectExpertOpen}
              key={1}
            />,
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
          secondaryLayout={false}
          sideBarList={[
            { sideBarName: "Techstacks", secondaryLayout: false },
            { sideBarName: "Discuss Forum", secondaryLayout: true },
            { sideBarName: "Expert Board", secondaryLayout: true },
            { sideBarName: "News", secondaryLayout: true },
          ]}
          topCard={<UserCard />}
          main={[
            <TechStack key={0} />,
            <DiscussComponent key={1} userData={userData} />,
            <ExpertBoard key={2} userData={userData} flag={"expert"} />,
            <NewsComponent key={3} />,
          ]}
          rightTop={[<TrendingChat key={0} />]}
          rightBottom={[<UserAddStack key={0} />, <>Bottom Manage Expert</>]}
        />
      )}
      {userData?.signupRole === "User" && (
        <LayoutComponent
          secondaryLayout={false}
          sideBarList={[
            { sideBarName: "Techstacks", secondaryLayout: false },
            { sideBarName: "Expert Board", secondaryLayout: true },
            { sideBarName: "News", secondaryLayout: true },
          ]}
          topCard={<UserCard />}
          main={[
            <TechStack key={0} />,
            <ExpertBoard key={1} userData={userData} flag={"Non-expert"} />,
            <NewsComponent key={2} />,
          ]}
          rightTop={[<TrendingChat key={0} />]}
          rightBottom={[<UserAddStack key={0} />, <>Bottom Manage Expert</>]}
        />
      )}
    </>
  );
};
export default Dashboard;
