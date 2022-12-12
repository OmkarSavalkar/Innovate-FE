import React from "react";
import ChatComponent from "../../components/common/chatComponent";
import LayoutComponent from "../../components/layout";
const ChatScreen = () => {
  return (
    <LayoutComponent
      secondaryLayout={true}
      secondaryLayoutTitle={"Welcome to Q&A forum"}
      sideBarList={[{ sideBarName: "Q&A Forum", secondaryLayout: true }]}
      sideBarNavigationList={[{ page: "Dashboard", pageUrl: "/dashboard" }]}
      main={[<ChatComponent key={0} />]}
    />
  );
};
export default ChatScreen;
