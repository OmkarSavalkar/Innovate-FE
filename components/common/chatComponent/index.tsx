import React from "react";
import { Card, Grid, CardMedia } from "@mui/material";
const ChatComponent = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        paddingTop: "5%",
        height: "100vh",
        overflow: "auto",
        backgroundImage: `url(https://connectwell-5f9f8.web.app/ChatBox.png)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></Grid>
  );
};
export default ChatComponent;
