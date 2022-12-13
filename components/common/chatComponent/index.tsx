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
  Paper,
} from "@mui/material";
import { getTechStackById } from "../../../apis/techStack";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import SendIcon from "@mui/icons-material/Send";
import { getChat, postChat } from "../../../apis/chat";
import moment from "moment";
import DashboardImage from "../../../public/ChatQ&A.png";
import Image from "next/image";
import { useAppDispatch } from "../../../side-effects/hooks";
import { setSnackbar } from "../../../side-effects/snackbarRedux";
const ChatComponent = () => {
  const router = useRouter();
  const [expertList, setExpertList] = useState<any>([]);
  const [selectedExpert, setSelectedExpert] = useState<any>([]);
  const [chat, setChat] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<String>("");
  const [refreshChat, setRefreshChat] = useState<boolean>(false);
  const [user, setUser] = useState<any>(
    router.query.from === "expertTechUser"
      ? JSON.parse(sessionStorage.getItem("expertTechUser") || "")
      : JSON.parse(sessionStorage.getItem("user") || "")
  );
  const [loggedInUser, setLoggedInUser] = useState<any>(
    JSON.parse(sessionStorage.getItem("user") || "")
  );
  const [techName, setTechName] = useState<String>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    router.query.techId &&
      getTechStackById(router.query.techId)
        .then((response) => {
          setExpertList(response.data.techExperts);
          setSelectedExpert(response.data.techExperts[0]);
          setTechName(response.data.techName);
        })
        .catch((error) => {
          dispatch(
            setSnackbar({
              isSnackbarOpen: true,
              snackbarMessage: "Something went wrong, please try again later.",
              snackbarType: "Error",
            })
          );
        });
  }, [router.query.techId]);
  useEffect(() => {
    router.query.techId &&
      user._id &&
      getChat(user._id, router.query.techId)
        .then((response) => {
          response?.data?.chatData && setChat(response.data.chatData);
        })
        .catch((error) => {
          dispatch(
            setSnackbar({
              isSnackbarOpen: true,
              snackbarMessage: "Something went wrong, please try again later.",
              snackbarType: "Error",
            })
          );
        });
  }, [refreshChat, router.query.techId, user]);
  const handleSelectedExpert = (expert: any) => {
    setSelectedExpert(expert);
  };
  const handleSendChat = () => {
    let tempChat = chat;
    tempChat.push({
      userName: loggedInUser.fullName,
      date: new Date(),
      chatData: currentChat,
    });
    let payload = {
      userId: user._id,
      techId: router.query.techId,
      chatData: tempChat,
      sentAs: router.query.from,
    };
    postChat(payload)
      .then((response) => {
        setRefreshChat(!refreshChat);
        setCurrentChat("");
      })
      .catch((error) => {
        dispatch(
          setSnackbar({
            isSnackbarOpen: true,
            snackbarMessage: "Something went wrong, please try again later.",
            snackbarType: "Error",
          })
        );
      });
  };
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          paddingTop: "5%",
          overflow: "auto",
          listStyle: "none",
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
        <Grid item xs={12}>
          <Paper
            sx={{
              backgroundColor:
                router.query.from === "expertTechUser" ? "#D3F5CE" : "#b0d3d7",
              height: "150px",
              overflow: "auto",
              marginBottom: "20px",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={9}>
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "fantasy", padding: "20px 0px 0px 20px" }}
                >
                  {router.query.from === "expertTechUser"
                    ? `User: ${user.fullName}, `
                    : ""}
                  {`Technology: ${techName}`}
                </Typography>
                <Typography variant="h6" sx={{ padding: "0px 0px 0px 20px" }}>
                  {router.query.from === "expertTechUser"
                    ? `Help users to solve their issues...`
                    : `Ask your doubts here and get it resolve from experts...`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ textAlign: "end" }}
                className={styles["user-image"]}
              >
                <Image
                  src={DashboardImage}
                  alt="dashboard image"
                  height={130}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
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
                          router.query.from === "expertTechUser"
                            ? selectedExpert._id === expert._id
                              ? "#00AFB9"
                              : "#9ae2e6"
                            : selectedExpert._id === expert._id
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
                  backgroundColor:
                    router.query.from === "expertTechUser"
                      ? "#D3F5CEbb"
                      : "#b0d3d793",
                  height: "300px",
                  width: "300px",
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      router.query.from === "expertTechUser"
                        ? "#D3F5CEd8"
                        : "#b0d3d7c0",
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                    transform: "translate(25%, 25%)",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      backgroundColor:
                        router.query.from === "expertTechUser"
                          ? "#D3F5CE"
                          : "#b0d3d7",
                      backgroundImage:
                        router.query.from === "expertTechUser"
                          ? `url(https://connectwell-5f9f8.web.app/expertGroupChat.png)`
                          : `url(https://connectwell-5f9f8.web.app/ChatExperts.jpg)`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      transform: "translate(48%, 46%)",
                    }}
                  ></Box>
                </Box>
                <Box
                  className={styles["box1"]}
                  sx={{
                    backgroundColor:
                      router.query.from === "expertTechUser"
                        ? "#D3F5CE"
                        : "#b0d3d7",
                  }}
                >
                  <Typography variant="h5" fontFamily="fantasy">
                    {selectedExpert.fullName}
                  </Typography>
                  <Typography variant="h5" fontFamily="fantasy">
                    {selectedExpert.role}
                  </Typography>
                </Box>
                <Box
                  className={styles["box2"]}
                  sx={{
                    backgroundColor:
                      router.query.from === "expertTechUser"
                        ? "#D3F5CE"
                        : "#b0d3d7",
                  }}
                >
                  <Typography variant="h5" fontFamily="fantasy">
                    Email
                  </Typography>
                  <Tooltip title={selectedExpert.email}>
                    <Typography variant="body1">
                      {selectedExpert.email}
                    </Typography>
                  </Tooltip>
                </Box>
                <Box
                  className={styles["box3"]}
                  sx={{
                    backgroundColor:
                      router.query.from === "expertTechUser"
                        ? "#D3F5CE"
                        : "#b0d3d7",
                  }}
                >
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
              <Box
                className={styles["chat-box"]}
                sx={{
                  backgroundColor:
                    router.query.from === "expertTechUser"
                      ? "#9ae2e6"
                      : "#e4dbff",
                  maxHeight: "450px",
                  overflow: "auto",
                  listStyle: "none",
                  "&::-webkit-scrollbar": {
                    width: "0.4em",
                  },
                  "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rebeccapurple",
                    outline: "1px solid slategrey",
                  },
                }}
              >
                <Grid container>
                  {chat &&
                    chat.map((chatItem: any, index: number) => {
                      return (
                        <Grid item xs={12} sx={{ margin: "10px" }} key={index}>
                          <Box
                            key={index}
                            sx={{
                              float:
                                chatItem.userName === loggedInUser.fullName
                                  ? "right"
                                  : "left",
                              backgroundColor:
                                router.query.from === "expertTechUser"
                                  ? chatItem.userName === loggedInUser.fullName
                                    ? "#00AFB9"
                                    : "white"
                                  : chatItem.userName === loggedInUser.fullName
                                  ? "#bca9f5"
                                  : "white",
                              borderRadius: "20px",
                              padding: "10px",
                              textAlign: "left",
                              maxWidth: "75%",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: "bold",
                                color: "rebeccapurple",
                              }}
                            >
                              {chatItem.userName}
                            </Typography>
                            <Typography variant="body2">
                              {chatItem.chatData}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: "bold",
                                color: "rebeccapurple",
                              }}
                            >
                              {moment.utc(chatItem.date).local().format("L LT")}
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}

                  <Grid
                    item
                    xs={10}
                    sx={{ display: "inline-block", alignSelf: "flex-end" }}
                  >
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
                      <SendIcon sx={{ color: "#3d156b" }} />
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
