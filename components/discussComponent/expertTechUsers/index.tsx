import {
  Avatar,
  Box,
  Card,
  Grid,
  Pagination,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import usePagination from "../../common/pagination";
import { getTechExpertUsers } from "../../../apis/chat";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../side-effects/hooks";
import { setSnackbar } from "../../../side-effects/snackbarRedux";

const ExpertTechUsers = (props: any) => {
  const { item, currentTechObjId, firstItemTechObjId } = props;
  const router = useRouter();
  const [searchUser, setSearchUser] = useState<string>("");
  const [techUsers, setTechUsers] = useState<any>([]);

  //for pagination on FE level
  let [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const count = Math.ceil(techUsers?.length / PER_PAGE);
  const newDATA = usePagination(techUsers, PER_PAGE);
  const dispatch = useAppDispatch();
  const handleChange = (e: any, p: any) => {
    setPage(p);
    newDATA.jump(p);
  };

  useEffect(() => {
    let payload = {};
    if (searchUser != "") {
      payload = { fullName: searchUser };
    }
    if (currentTechObjId == null) {
      firstItemTechObjId &&
        getTechExpertUsers(firstItemTechObjId, payload)
          .then((res) => {
            setTechUsers(res?.data);
          })
          .catch((error) => {
            dispatch(
              setSnackbar({
                isSnackbarOpen: true,
                snackbarMessage:
                  "Something went wrong, please try again later.",
                snackbarType: "Error",
              })
            );
          });
    } else {
      currentTechObjId &&
        getTechExpertUsers(currentTechObjId, payload)
          .then((res) => {
            setTechUsers(res?.data);
          })
          .catch((error) => {
            dispatch(
              setSnackbar({
                isSnackbarOpen: true,
                snackbarMessage:
                  "Something went wrong, please try again later.",
                snackbarType: "Error",
              })
            );
          });
    }
  }, [currentTechObjId, searchUser]);

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        listStyle: "none",
        "&::-webkit-scrollbar": {
          width: "0.4em",
          height: "0.4em",
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
      <Toolbar>
        <img
          src={item?.techImgUrl}
          alt="tech icon"
          className={style["discuss-techlogo"]}
        />
        <Stack
          className={style["searchBox"]}
          direction={{ xs: "column", sm: "row" }}
        >
          <Typography
            variant="h5"
            sx={{
              padding: "0px 16px 0px 16px",
              marginRight: "10px",
              backgroundImage: "linear-gradient(to bottom, #ea636c, #faab7b)",
              borderRadius: "10px",
            }}
          >
            {item?.techName} Users
          </Typography>
          <TextField
            variant="standard"
            placeholder={`Search ${item?.techName} Users`}
            className={style["searchInput"]}
            onChange={(e) => {
              setSearchUser(e.target.value);
            }}
            sx={{
              backgroundColor: "#e4dbff",
              border: "2px solid white",
              padding: "0px 8px",
              "& ::placeholder": {
                color: "black",
                fontWeight: "bold",
              },
              float: "right",
              opacity: 0.7,
            }}
          />
          <FindInPageIcon
            fontSize="large"
            sx={{ color: "black", cursor: "pointer" }}
          />
        </Stack>
        <Typography
          variant="subtitle1"
          sx={{
            padding: "0px 5px",
            marginRight: "5px",
            marginLeft: "4%",
            color: "purple",
            border: "1px solid purple",
            borderRadius: "10px",
          }}
        >
          Total: {techUsers?.length}
        </Typography>
      </Toolbar>
      <Grid container spacing={1} direction={"column"} p={1}>
        {techUsers?.length > 0 ? (
          <>
            <Grid sx={{ margin: "1px 1px" }} container spacing={3}>
              {newDATA?.currentData()?.map((item: any, index: number) => {
                return (
                  <Grid key={index} item lg={3} md={3} sm={6} xs={12}>
                    <Card
                      sx={{
                        borderRadius: "15px",
                        border: "1px solid gray",
                        backgroundColor: "black",
                        opacity: "0.8",
                        cursor: "pointer",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                      elevation={12}
                      onClick={() => {
                        router.push({
                          pathname: "/chatScreen",
                          query: {
                            techId:
                              currentTechObjId == null
                                ? firstItemTechObjId
                                : currentTechObjId,
                            from: "expertTechUser",
                          },
                        });
                        sessionStorage.setItem(
                          "expertTechUser",
                          JSON.stringify(item)
                        );
                      }}
                    >
                      <div className={style["card-content"]}>
                        <div className={style["avatar-background"]}>
                          <Avatar
                            sx={{
                              backgroundColor: "#3d156b",
                              margin: "0 auto",
                            }}
                          >
                            {item?.fullName[0]}
                          </Avatar>
                        </div>
                        <Typography
                          variant="h5"
                          component={"p"}
                          sx={{
                            color: "white",
                            marginTop: "10px",
                            marginBottom: 0,
                            padding: "0 2px",
                            textAlign: "center",
                          }}
                        >
                          {item?.fullName}
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          component={"span"}
                          sx={{
                            color: "white",
                            marginTop: "6px",
                            marginBottom: 0,
                            padding: "0 2px",
                            textAlign: "center",
                          }}
                        >
                          {item?.role}
                        </Typography>
                        <div style={{ width: "100%" }}>
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <em>Signup Role: {item?.signupRole}</em>
                                <br></br>
                                <em>Summary: {item?.summary}</em>
                              </React.Fragment>
                            }
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                float: "left",
                                margin: "10px 0px 10px 10px",
                                color: "blue",
                                fontWeight: 300,
                              }}
                            >
                              Know me
                            </Typography>
                          </HtmlTooltip>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{
                margin: "20px auto",
                color: "white",
                backgroundColor: "#3d156b",
                padding: "8px",
                borderRadius: "20px",
              }}
            >
              No Data of Users for this technology ! Check Later....
            </Typography>
          </>
        )}
        <Grid
          item
          md={12}
          xs={12}
          sx={{
            display: "flex",
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <Pagination
            count={count}
            size="large"
            page={page}
            color="primary"
            onChange={handleChange}
            sx={{
              button: { color: "white", backgroundColor: "black" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ExpertTechUsers;
