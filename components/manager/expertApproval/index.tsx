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
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../../side-effects/hooks";
import { getManager } from "../../../side-effects/manager";
const ExpertApprovalComponent = () => {
  const [toggleExpert, setToggleExpert] = React.useState<string | null>(
    "pending"
  );
  const [nextIndex, setnextIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.manager);
  useEffect(() => {
    if (Object.keys(data).length === 0) dispatch(getManager());
  }, [dispatch]);
  const handleToggleExpert = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setToggleExpert(newAlignment);
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
      >
        <ToggleButton value="pending" aria-label="pending approvals">
          Pending Approvals
        </ToggleButton>
        <ToggleButton value="approved" aria-label="approved experts">
          Approved Experts
        </ToggleButton>
      </ToggleButtonGroup>

      {toggleExpert === "pending" ? (
        <Card sx={{ marginTop: "15px" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                {data?.data?.pendingApproval[nextIndex].fullName[0]}
              </Avatar>
            }
            title={<h1>{data?.data?.pendingApproval[nextIndex].fullName}</h1>}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data?.data?.pendingApproval[nextIndex].summary}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card>approved</Card>
      )}
      <Grid container>
        <Grid item xs={12} md={4}>
          <Button
            aria-label="add to favorites"
            startIcon={<HowToRegIcon />}
            color="success"
          >
            Approve
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            aria-label="add to favorites"
            startIcon={<CancelIcon />}
            color="error"
          >
            Rejct
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button aria-label="add to favorites" endIcon={<NavigateNextIcon />}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ExpertApprovalComponent;
