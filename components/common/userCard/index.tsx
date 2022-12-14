import {
  FormControlLabel,
  Typography,
  Grid,
  Switch,
  Alert,
  AlertTitle,
} from "@mui/material";
import React from "react";
import { setAvailability } from "../../../apis/expert";
import { useAppDispatch } from "../../../side-effects/hooks";
import { setSnackbar } from "../../../side-effects/snackbarRedux";
const UserCard = () => {
  const [userData, setUserData] = React.useState(
    JSON.parse(sessionStorage.getItem("user") || "")
  );
  const [checked, setChecked] = React.useState(
    JSON.parse(sessionStorage.getItem("user") || "").availability
  );
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setAvailability(userData._id, event.target.checked)
      .then((response) => {
        dispatch(
          setSnackbar({
            isSnackbarOpen: true,
            snackbarMessage: "Your availability changed successfully.",
            snackbarType: "Success",
          })
        );
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
    let tempUserData = userData;
    tempUserData.availability = event.target.checked;
    setUserData(tempUserData);
    sessionStorage.setItem("user", JSON.stringify(tempUserData || ""));
  };
  return (
    <Grid container>
      <Grid item md={6}>
        <Typography
          variant="h3"
          sx={{ fontFamily: "fantasy", padding: "20px 0px 0px 20px" }}
        >{`Hi, ${userData.fullName}`}</Typography>
        <Typography variant="h6" sx={{ padding: "0px 0px 0px 20px" }}>
          Welcome to connect well
        </Typography>
      </Grid>
      {userData.signupRole === "Expert" && (
        <>
          <Grid item md={6} sx={{ paddingTop: "20px" }}>
            <FormControlLabel
              value="top"
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  color="secondary"
                />
              }
              label={
                <Typography variant="h6">
                  Set Availability{" "}
                  {`(${checked ? "Available" : "Unavailable"})`}
                </Typography>
              }
              labelPlacement="top"
            />
          </Grid>
          {!checked && (
            <Grid item xs={12} sx={{ margin: "10px" }}>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                Your current status unavailable—{" "}
                <strong>
                  You will not recieve any mail of technical discussions.
                </strong>
              </Alert>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
export default UserCard;
