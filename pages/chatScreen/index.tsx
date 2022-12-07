import React from "react";
import ChatComponent from "../../components/common/chatComponent";
import LayoutComponent from "../../components/layout";
const ChatScreen = () => {
  return (
    <LayoutComponent
      secondaryLayout={true}
      secondaryLayoutTitle={"Welcome to discuss forum"}
      sideBarList={["Discuss Forum"]}
      sideBarNavigationList={[{ page: "Dashboard", pageUrl: "/dashboard" }]}
      main={[<ChatComponent key={0} />]}
    />
  );
};
export default ChatScreen;
