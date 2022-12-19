import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
  Paper,
  Grid,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Button,
  Toolbar,
  Chip,
  Divider,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../../side-effects/hooks";
import { getManager } from "../../../side-effects/manager";
import approvedExperts from "../../../public/Approved.png";
import Image from "next/image";
import { approveExperts } from "../../../apis/manager";
import { setSnackbar } from "../../../side-effects/snackbarRedux";
import { colorScheme } from "../../../utils/constant";

const ExpertApprovalComponent = (props: any) => {
  const { directExpertOpen, toggleExpert, setToggleExpert } = props;
  // const [toggleExpert, setToggleExpert] = React.useState<string | null>(
  //   "pending"
  // );
  const [nextIndex, setnextIndex] = useState<number>(0);
  const [refershExpertList, setRefreshExpertList] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: any) => state.manager
  );

  useEffect(() => {
    dispatch(getManager());
    directExpertOpen && setnextIndex(directExpertOpen);
  }, [dispatch, refershExpertList, directExpertOpen]);

  const handleToggleExpert = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setToggleExpert(newAlignment);
    setnextIndex(0);
  };

  const handleApproveExperts = (expertData: any) => {
    approveExperts(data.data._id, expertData.email, expertData)
      .then((response) => {
        dispatch(
          setSnackbar({
            isSnackbarOpen: true,
            snackbarMessage: "Expert approved successfully.",
            snackbarType: "Success",
          })
        );
        setRefreshExpertList(!refershExpertList);
        setnextIndex(nextIndex - 1);
      })
      .catch((error) => {
        dispatch(
          setSnackbar({
            isSnackbarOpen: true,
            snackbarMessage: "Unable to approve expert.",
            snackbarType: "Error",
          })
        );
      });
  };
  const handleNext = (arrayLength: number) => {
    if (arrayLength - 1 === nextIndex) {
      setnextIndex(0);
    } else {
      setnextIndex(nextIndex + 1);
    }
  };
  return (
    <Paper className={styles["main-card"]}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Manage Experts
      </Typography>

      <ToggleButtonGroup
        value={toggleExpert}
        exclusive
        onChange={handleToggleExpert}
        aria-label="toogle expert"
        sx={{
          border: "2px solid white",
        }}
      >
        <ToggleButton
          value="pending"
          aria-label="pending approvals"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              color: colorScheme.color1,
              backgroundColor: "white",
            },
          }}
        >
          Pending Approvals
        </ToggleButton>
        <ToggleButton
          value="approved"
          aria-label="approved experts"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              color: colorScheme.color1,
              backgroundColor: "white",
            },
          }}
        >
          Approved Experts
        </ToggleButton>
      </ToggleButtonGroup>

      {toggleExpert === "pending" ? (
        data?.data?.pendingApproval &&
        data?.data?.pendingApproval.length > 0 ? (
          <Card sx={{ marginTop: "15px", height: "260px", overflow: "auto" }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  {data?.data?.pendingApproval[nextIndex]?.fullName[0]}
                </Avatar>
              }
              title={
                <Toolbar
                  sx={{
                    backgroundColor: colorScheme.color9,
                    fontFamily: "fantasy",
                    textAlign: "center",
                  }}
                >
                  {data?.data?.pendingApproval[nextIndex]?.fullName}
                </Toolbar>
              }
            />
            <CardContent>
              <Grid container rowSpacing={1}>
                {data?.data?.pendingApproval[nextIndex]?.techStackId.map(
                  (techStack: any, index: number) => {
                    return (
                      <Grid item xs={4} key={index}>
                        <Chip label={techStack.techName} />
                      </Grid>
                    );
                  }
                )}
              </Grid>
              <br />
              <Typography variant="body2" color="text.secondary">
                {data?.data?.pendingApproval[nextIndex]?.summary}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ marginTop: "15px", overflow: "auto", height: "300px" }}>
            <Image src={approvedExperts} alt="" width={350} height={200} />
            <Typography variant="h6" color="text.secondary">
              Nothing here for now, comeback later!!
            </Typography>
          </Card>
        )
      ) : data?.data?.approvedExperts &&
        data?.data?.approvedExperts.length > 0 ? (
        <Card sx={{ marginTop: "15px", height: "260px", overflow: "auto" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                {data?.data?.approvedExperts[nextIndex]?.fullName[0]}
              </Avatar>
            }
            title={
              <Toolbar
                sx={{
                  backgroundColor: "#e4dbff",
                  fontFamily: "fantasy",
                  textAlign: "center",
                }}
              >
                {data?.data?.approvedExperts[nextIndex]?.fullName}
              </Toolbar>
            }
          />
          <CardContent>
            <Grid container rowSpacing={1}>
              {data?.data?.approvedExperts[nextIndex]?.techStackId.map(
                (techStack: any, index: number) => {
                  return (
                    <Grid item xs={4} key={index}>
                      <Chip label={techStack.techName} />
                    </Grid>
                  );
                }
              )}
            </Grid>
            <br />
            <Typography variant="body2" color="text.secondary">
              {data?.data?.approvedExperts[nextIndex]?.summary}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ marginTop: "15px", overflow: "auto", height: "300px" }}>
          <Image src={approvedExperts} alt="" width={350} height={200} />
          <Typography variant="h6" color="text.secondary">
            Nothing here for now, comeback later!!
          </Typography>
        </Card>
      )}
      <Grid container sx={{ marginTop: "20px" }}>
        {toggleExpert === "pending" && (
          <>
            <Grid item xs={12} md={4} sx={{ backgroundColor: "#d8f0e3" }}>
              <Button
                aria-label="add to favorites"
                startIcon={<HowToRegIcon />}
                color="success"
                onClick={() =>
                  handleApproveExperts(data?.data?.pendingApproval[nextIndex])
                }
              >
                Approve
              </Button>
            </Grid>
            <Grid item xs={12} md={4} sx={{ backgroundColor: "#ffeaee" }}>
              <Button
                aria-label="add to favorites"
                startIcon={<CancelIcon />}
                color="error"
              >
                Reject
              </Button>
            </Grid>
          </>
        )}
        <Grid item xs={12} md={4} sx={{ backgroundColor: "#eee6ff" }}>
          <Button
            aria-label="add to favorites"
            endIcon={<NavigateNextIcon />}
            onClick={() =>
              handleNext(
                toggleExpert === "pending"
                  ? data?.data?.pendingApproval.length
                  : data?.data?.approvedExperts.length
              )
            }
            disabled={
              toggleExpert === "pending"
                ? data?.data?.pendingApproval.length === 1
                : data?.data?.approvedExperts.length === 1
            }
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ExpertApprovalComponent;
