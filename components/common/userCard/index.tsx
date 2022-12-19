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
import { styled } from "@mui/material/styles";

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

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  return (
    <Grid container>
      <Grid item md={7}>
        <Typography
          variant="h3"
          sx={{ fontFamily: "fantasy", padding: "20px 0px 0px 20px" }}
        >{`Hi, ${userData.fullName}`}</Typography>
        <Typography variant="h6" sx={{ padding: "0px 0px 0px 20px" }}>
          Welcome to Connect Well
        </Typography>
      </Grid>
      {userData.signupRole === "Expert" && (
        <>
          <Grid item md={5} sx={{ paddingTop: "20px" }}>
            <FormControlLabel
              value="top"
              control={
                <Android12Switch checked={checked} onChange={handleChange} />
                // <Switch
                //   checked={checked}
                //   onChange={handleChange}
                //   color="secondary"
                // />
              }
              label={
                <Typography variant="h6">
                  You are {`(${checked ? "Available" : "Unavailable"})`} to all
                </Typography>
              }
              labelPlacement="top"
            />
          </Grid>
          {!checked && (
            <Grid
              item
              xs={12}
              sx={{
                margin: "8px",
                position: "relative",
              }}
            >
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
