import React, { useState, useEffect } from "react";
import { Grid, Box, Toolbar, Avatar, Typography, Tooltip } from "@mui/material";
import { getTechStackById } from "../../../apis/techStack";
import { useRouter } from "next/router";
import styles from "./index.module.css";
const ChatComponent = () => {
  const [expertList, setExpertList] = useState<any>([]);
  const [selectedExpert, setSelectedExpert] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    router.query.techId &&
      getTechStackById(router.query.techId)
        .then((response) => {
          setExpertList(response.data.techExperts);
          setSelectedExpert(response.data.techExperts[0]);
        })
        .catch((error) => {});
  }, []);

  const handleSelectedExpert = (expert: any) => {
    setSelectedExpert(expert);
  };
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          paddingTop: "5%",
          overflow: "auto",
          backgroundImage: `url(https://connectwell-5f9f8.web.app/ChatBox.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          textAlign: "center",
        }}
        columnSpacing={2}
      >
        <Grid item xs={12} md={5} className={styles["expert-list"]}>
          {expertList &&
            expertList.map((expert: any, index: number) => {
              return (
                <Toolbar
                  key={index}
                  className={styles["expert-toolbar"]}
                  sx={{
                    backgroundColor:
                      selectedExpert._id === expert._id ? "#bca9f5" : "#e4dbff",
                  }}
                  onClick={() => handleSelectedExpert(expert)}
                >
                  <Avatar sx={{ backgroundColor: "#3d156b" }}>
                    {expert.fullName[0]}
                  </Avatar>
                  <Typography
                    variant="h6"
                    className={styles["expert-toolbar-name"]}
                  >
                    {expert.fullName}
                  </Typography>
                </Toolbar>
              );
            })}
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            paddingTop: "50px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#b0d3d793",
              height: "300px",
              width: "300px",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#b0d3d7c0",
                height: "200px",
                width: "200px",
                borderRadius: "50%",
                transform: "translate(25%, 25%)",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#666666",
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  backgroundImage: `url(https://connectwell-5f9f8.web.app/ChatExperts.jpg)`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  transform: "translate(48%, 46%)",
                }}
              ></Box>
            </Box>
            <Box className={styles["box1"]}>
              <Typography variant="h5" fontFamily="fantasy">
                {selectedExpert.fullName}
              </Typography>
              <Typography variant="h5" fontFamily="fantasy">
                {selectedExpert.role}
              </Typography>
            </Box>
            <Box className={styles["box2"]}>
              <Typography variant="h5" fontFamily="fantasy">
                Email
              </Typography>
              <Tooltip title={selectedExpert.email}>
                <Typography variant="body1">{selectedExpert.email}</Typography>
              </Tooltip>
            </Box>
            <Box className={styles["box3"]}>
              <Typography variant="h5" fontFamily="fantasy">
                Summary
              </Typography>
              <Tooltip title={selectedExpert.summary}>
                <Typography variant="body1">
                  {selectedExpert.summary}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};
export default ChatComponent;
