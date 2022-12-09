import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import ManagerImg from "../../public/reset.jpg";

const DiscussComponent = () => {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        margin: 0,
        padding: 2,
        overflow: "auto",
        display: "flex",
      }}
      spacing={2}
    >
      <Grid item md={12} sx={{ backgroundColor: "red" }}>
        <Card
          elevation={10}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item md={2} sx={{ backgroundColor: "green" }}>
            <CardMedia
              component="img"
              image={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png?20221017173631"
              }
              alt="Tech stack image"
              sx={{
                backgroundColor: "blue",
                width: "70%",
                padding: "20px",
                float: "left",
              }}
            />
          </Grid>
          <Grid item md={8}>
            <Typography variant="h4">Azure</Typography>
          </Grid>
          <Grid item md={2} sx={{ backgroundColor: "green" }}>
            <CardMedia
              component="img"
              image={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png?20221017173631"
              }
              alt="Tech stack image"
              sx={{
                backgroundColor: "blue",
                width: "70%",
                padding: "20px",
                float: "right",
              }}
            />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
export default DiscussComponent;
