import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

const ProfileComponent = (props: any) => {
  const { userData } = props;

  return (
    <Grid
      container
      sx={{
        display: "flex",
        paddingTop: "5%",
        backgroundColor: "#F6F3EE",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Grid item md={4}>
        <Card
          sx={{
            maxWidth: "83%",
            marginLeft: "8%",
            boxShadow: "8px 8px #bcbcbc",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              alt="pic"
              width="45%"
              style={{ padding: "20px 0px" }}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography gutterBottom variant="h5" fontWeight="bold">
                {userData?.fullName}
              </Typography>
              <Typography gutterBottom variant="h6" color="text.secondary">
                {userData.role}
              </Typography>
              <Typography
                gutterBottom
                variant="inherit"
                color="text.secondary"
                fontWeight="bold"
              >
                Signed Up As
              </Typography>
              <Typography gutterBottom variant="overline" fontWeight="bold">
                {userData.signupRole}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Grid>
      <Grid item md={8}>
        <Card
          sx={{
            maxWidth: "97%",

            // border: "1px solid gray",
            boxShadow: "8px 8px #bcbcbc",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Email
            </Typography>
            <Typography
              gutterBottom
              variant="inherit"
              component="div"
              color="text.secondary"
            >
              {userData.email}
            </Typography>
            <Divider variant="middle" sx={{ margin: "10px" }} />
            <Typography gutterBottom variant="h6" component="div">
              Your Manager
            </Typography>
            <Typography
              gutterBottom
              variant="inherit"
              component="div"
              color="text.secondary"
            >
              {userData.managerEmpId}
            </Typography>
            <Divider variant="middle" sx={{ margin: "10px" }} />
            <Typography gutterBottom variant="h6" component="div">
              Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData?.summary}
            </Typography>
            <Divider variant="middle" sx={{ margin: "10px" }} />
            <Typography gutterBottom variant="h6" component="div">
              Technology Stack
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              {userData?.techStackId?.map((item: any, key: number) => {
                return (
                  <span
                    key={key}
                    style={{
                      backgroundColor: "#341e73",
                      borderRadius: "10px",
                      margin: "5px 8px",
                      padding: "5px",
                      color: "white",
                    }}
                  >
                    {item}
                  </span>
                );
              })}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default ProfileComponent;
