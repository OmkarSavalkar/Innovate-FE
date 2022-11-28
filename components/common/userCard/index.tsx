import { Box, Typography } from "@mui/material";
import React from "react";
const UserCard = () => {
  const UserData = JSON.parse(sessionStorage.getItem("user") || "");
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontFamily: "fantasy", padding: "20px 0px 0px 20px" }}
      >{`Hi, ${UserData.fullName}`}</Typography>
      <Typography variant="h6" sx={{ padding: "0px 0px 0px 20px" }}>
        Welcome to connect well
      </Typography>
    </Box>
  );
};
export default UserCard;
