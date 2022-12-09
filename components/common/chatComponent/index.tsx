import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Toolbar,
  Avatar,
  Typography,
  Tooltip,
  InputBase,
  IconButton,
} from "@mui/material";
import { getTechStackById } from "../../../apis/techStack";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import SendIcon from "@mui/icons-material/Send";
import { getChat, postChat } from "../../../apis/chat";
import moment from "moment";

const ChatComponent = () => {
  const [expertList, setExpertList] = useState<any>([]);
  const [selectedExpert, setSelectedExpert] = useState<any>([]);
  const [chat, setChat] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<String>("");
  const [refreshChat, setRefreshChat] = useState<boolean>(false);
  const [user, setUser] = useState<any>(
    JSON.parse(sessionStorage.getItem("user") || "")
  );
  const router = useRouter();

  useEffect(() => {
    router.query.techId &&
      getTechStackById(router.query.techId)
        .then((response) => {
          setExpertList(response.data.techExperts);
          setSelectedExpert(response.data.techExperts[0]);
        })
        .catch((error) => {});
  }, [router.query.techId]);
  useEffect(() => {
    router.query.techId &&
      user._id &&
      getChat(user._id, router.query.techId)
        .then((response) => {
          response?.data?.chatData && setChat(response.data.chatData);
        })
        .catch((error) => {});
  }, [refreshChat, router.query.techId, user]);
  const handleSelectedExpert = (expert: any) => {
    setSelectedExpert(expert);
  };
  const handleSendChat = () => {
    let tempChat = chat;
    tempChat.push({
      userName: user.fullName,
      date: new Date(),
      chatData: currentChat,
    });
    let payload = {
      userId: user._id,
      techId: router.query.techId,
      chatData: tempChat,
    };
    postChat(payload)
      .then((response) => {
        setRefreshChat(!refreshChat);
        setCurrentChat("");
      })
      .catch((error) => {});
  };
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          paddingTop: "5%",
          overflow: "auto",
          minHeight:
            expertList === undefined || expertList.length === 0
              ? "100vh"
              : null,
          backgroundImage:
            expertList !== undefined && expertList.length !== 0
              ? `url(https://connectwell-5f9f8.web.app/ChatBox.png)`
              : `url(https://connectwell-5f9f8.web.app/NoExpertsFound.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          textAlign: "center",
        }}
        columnSpacing={2}
      >
        {expertList !== undefined && expertList.length !== 0 ? (
          <>
            <Grid item xs={12} md={5} className={styles["expert-list"]}>
              {expertList &&
                expertList.map((expert: any, index: number) => {
                  return (
                    <Toolbar
                      key={index}
                      className={styles["expert-toolbar"]}
                      sx={{
                        backgroundColor:
                          selectedExpert._id === expert._id
                            ? "#bca9f5"
                            : "#e4dbff",
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
                marginBottom: "70px",
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
                    <Typography variant="body1">
                      {selectedExpert.email}
                    </Typography>
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
            <Grid item xs={12}>
              <Box className={styles["chat-box"]}>
                <Grid container>
                  {chat &&
                    chat.map((chatItem: any, index: number) => {
                      return (
                        <Grid item xs={12} sx={{ margin: "10px" }}>
                          <Box
                            key={index}
                            sx={{
                              float:
                                chatItem.userName === user.fullName
                                  ? "right"
                                  : "left",
                              backgroundColor:
                                chatItem.userName === user.fullName
                                  ? "#bca9f5"
                                  : "wihte",
                              borderRadius: "20px",
                              padding: "10px",
                              textAlign: "left",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {chatItem.userName}
                            </Typography>
                            <Typography variant="h6">
                              {chatItem.chatData}
                            </Typography>
                            <Typography variant="caption">
                              {moment.utc(chatItem.date).local().format("L LT")}
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}

                  <Grid item xs={10}>
                    <InputBase
                      id="message"
                      placeholder="Enter message"
                      sx={{
                        ml: 1,
                        flex: 1,
                        backgroundColor: "white",
                        borderRadius: "30px",
                        border: "0px",
                        padding: "8px",
                      }}
                      value={currentChat}
                      onChange={(e) => {
                        setCurrentChat(e.target.value);
                      }}
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      justifyContent: "flex-end",
                      display: "flex",
                    }}
                  >
                    <IconButton onClick={handleSendChat}>
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4">
              Hmm, it looks like there are no experts present. Need to grab
              them!...
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default ChatComponent;
