import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cool from "../../../public/cool-badge.gif";
import Rank2 from "../../../public/second-place-badge.gif";
import Rank3 from "../../../public/third-place-badge.gif";
import Coin from "../../../public/coinIcon.png";
import { getExpertLeaderBoardList } from "../../../apis/expert";
import { getAllRolesCount } from "../../../apis/dashboardApis";
import ExpertChart from "../../manager/expertChart";

const ExpertBoard = (props: any) => {
  const { userData, flag } = props;
  const [expertLeaderList, setExpertLeaderList] = useState<any>();
  const [loggedInExpert, setLoggedInExpert] = useState<any>();
  const [winners, setWinners] = useState<any>();
  const [contributorChart, setContributorChart] = useState<any>();

  useEffect(() => {
    getExpertLeaderBoardList()
      .then((res) => {
        setWinners([
          res.data.response[1],
          res.data.response[0],
          res.data.response[2],
        ]);
        setExpertLeaderList(res.data.response);
        if (flag === "expert") {
          let currentExpertObj = res?.data?.response.find(
            (loggedInExpert: any) => loggedInExpert._id === userData._id
          );
          let index = res?.data?.response.findIndex(
            (loggedInExpert: any) => loggedInExpert._id === userData._id
          );
          currentExpertObj.index = index > 2 ? index + 4 : index + 1;
          setLoggedInExpert(currentExpertObj);
        }
      })
      .catch((error) => {});

    if (flag != "expert") {
      getAllRolesCount().then((res) => {
        setContributorChart({
          labels: ["User", "Managers", "Experts"],
          datasets: [
            {
              label: "All Contributors",
              data: [
                res.data.userCount,
                res.data.managerCount,
                res.data.expertCount,
              ],
              backgroundColor: ["#3d156b", "blue", "purple"],
            },
          ],
        });
      });
    }
  }, [flag, userData._id]);

  return (
    <Grid container p={1}>
      <Grid item md={12}>
        <Grid
          container
          sx={{
            backgroundImage:
              "url(https://cliply.co/wp-content/uploads/2019/08/371908020_CONFETTI_400px.gif)",
            backgroundRepeat: "repeat",
            borderRadius: "35px",
            overflow: "hidden",
          }}
        >
          <Grid
            item
            md={12}
            sx={{
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: 0,
              border: "6px solid",
              borderImage: "linear-gradient(#00C853, #B2FF59) 50",
            }}
          >
            <Grid item md={2}></Grid>
            {winners?.length > 0 ? (
              winners?.map((item: any, index: number) => {
                return (
                  <Grid
                    key={index}
                    item
                    md={3}
                    sm={6}
                    xs={12}
                    sx={{ margin: "0 2%" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        backgroundImage:
                          // "linear-gradient(54.7deg,  #960ead 12%,#0ad8c7 100%)",
                          "linear-gradient(to right, #fc00ff, #00dbde)",
                        color: "white",
                        borderRadius: "10px 10px 0 0",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 0,
                      }}
                      component={"p"}
                    >
                      {expertLeaderList ? item?.fullName : "No Expert"}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        backgroundImage:
                          // "linear-gradient(54.7deg,  #960ead 12%,#0ad8c7 100%)",
                          "linear-gradient(to right, #fc00ff, #00dbde)",
                        color: "white",
                        borderRadius: "0 0 10px 10px",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 0,
                      }}
                      component={"p"}
                    >
                      <Image
                        src={Coin}
                        alt={"points"}
                        width="25"
                        style={{ marginLeft: "3%" }}
                      />
                      Points :{" "}
                      {expertLeaderList
                        ? item?.appreciationCount
                        : "No points!"}
                    </Typography>
                    <div
                      style={{
                        width: "77%",
                        position: "relative",
                        marginLeft: "8%",
                      }}
                    >
                      {index == 1 ? (
                        <img
                          src={
                            "https://media.tenor.com/lbJXQL_diL0AAAAi/ahmeteroll.gif"
                          }
                          alt={"first rank"}
                          width="100%"
                          style={{ marginTop: "8px" }}
                        />
                      ) : (
                        <Image
                          alt="Mountains"
                          src={index == 0 ? Rank2 : Rank3}
                          layout="responsive"
                          objectFit="contain"
                        />
                      )}
                    </div>
                  </Grid>
                );
              })
            ) : (
              <>
                <h4>No Winners yet...</h4>
              </>
            )}
            <Grid item md={2}></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Grid container p={1}>
          <Grid
            item
            md={8}
            sx={{
              height: "70vh",
              overflow: "auto",
              borderRadius: "25px",
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
            <Grid
              item
              md={12}
              sx={{ margin: "10px 0px 5px 0px", padding: "0px 10px" }}
            >
              <Card
                elevation={8}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "5px 0px",
                  backgroundImage:
                    "linear-gradient(to bottom, #ea636c, #faab7b)",

                  color: "white",
                  border: "4px inset rgb(173, 4, 173)",
                }}
              >
                <Typography
                  variant="h5"
                  component={"p"}
                  sx={{ fontWeight: "bold" }}
                >
                  All Supporting Experts
                </Typography>
              </Card>
            </Grid>

            {expertLeaderList?.length > 0 ? (
              expertLeaderList?.slice(3)?.map((item: any, index: number) => {
                return (
                  <Grid
                    key={index}
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ margin: "8px 0px", padding: "0px 10px" }}
                  >
                    <Card
                      elevation={8}
                      sx={{
                        display: "flex",
                        borderRadius: "12px",
                      }}
                    >
                      <Grid
                        item
                        md={1}
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, #fc00ff, #00dbde)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {index + 4}
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          variant="h6"
                          sx={{
                            padding: "5px 0px",
                            fontWeight: "bold",
                            margin: "0px 20px",
                            color: "rgb(173, 4, 173)",
                          }}
                          component="p"
                        >
                          {item?.fullName}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={3}
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, #fc00ff, #00dbde)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            padding: "4px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={Coin}
                            alt={"points"}
                            width="30"
                            style={{ marginRight: "5px" }}
                          />
                          Points: {item?.appreciationCount}
                        </Typography>
                      </Grid>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <>
                <h4>No more experts yets...</h4>
              </>
            )}
          </Grid>

          <Grid item md={4} sm={12} xs={12}>
            <Grid item md={12} sm={12} xs={12} sx={{ margin: "3% 2%" }}>
              {flag == "expert" ? (
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundImage:
                        "linear-gradient(to right, #fc00ff, #00dbde)",
                      color: "white",
                      borderRadius: "10px 10px 0 0",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 0,
                    }}
                    component={"p"}
                  >
                    {loggedInExpert
                      ? loggedInExpert?.fullName
                      : userData?.fullName}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundImage:
                        "linear-gradient(to right, #fc00ff, #00dbde)",
                      color: "white",
                      borderRadius: "0 0 10px 10px",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 0,
                    }}
                    component={"p"}
                  >
                    Your Rank :{" "}
                    {loggedInExpert ? loggedInExpert?.index : "Rank Error!"}
                    <Image
                      src={Coin}
                      alt={"points"}
                      width="25"
                      style={{ marginLeft: "3%" }}
                    />
                    Points :{" "}
                    {loggedInExpert
                      ? loggedInExpert?.appreciationCount
                      : userData?.appreciationCount}
                  </Typography>

                  <div
                    style={{
                      width: "80%",
                      position: "relative",
                      marginLeft: "8%",
                    }}
                  >
                    <Image
                      alt="Mountains"
                      src={Cool}
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "1%",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    component={"p"}
                  >
                    There is no exercise better for the heart than reaching down
                    and lifting people up...
                  </Typography>
                </>
              ) : (
                <>
                  {contributorChart && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, #fc00ff, #00dbde)",
                          color: "white",
                          borderRadius: "20px ",
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "4%",
                        }}
                        component={"p"}
                      >
                        All Contributors
                      </Typography>
                      <ExpertChart chartData={contributorChart} />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "black",
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "1%",
                          textAlign: "center",
                          fontStyle: "italic",
                        }}
                        component={"p"}
                      >
                        Coming together is a beginning; keeping together is
                        progress; working together is success. ...
                      </Typography>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ExpertBoard;
