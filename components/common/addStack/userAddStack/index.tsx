import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { postRequestAddStack } from "../../../../apis/dashboardApis";
import { useAppDispatch } from "../../../../side-effects/hooks";
import { FormButtons } from "../../../../styledComponents/loginSignupStyled";
import { setSnackbar } from "../../../../side-effects/snackbarRedux";

const UserAddStack = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<any>();
  const [addstackname, setAddStackName] = useState("");
  const handleAddClick = () => {
    if (userData && addstackname) {
      let payload = {
        userName: userData?.fullName,
        managerEmpId: userData?.managerEmpId,
        techName: addstackname,
      };
      postRequestAddStack(payload)
        .then((res) => {
          dispatch(
            setSnackbar({
              isSnackbarOpen: true,
              snackbarMessage:
                "Sent Email request to Manager, Please wait for sometime.",
              snackbarType: "Success",
            })
          );
        })
        .catch((err) => {
          dispatch(
            setSnackbar({
              isSnackbarOpen: true,
              snackbarMessage:
                "Error in sending request mail, try connecting to your manager.",
              snackbarType: "Error",
            })
          );
        });
    }
    setAddStackName("");
  };

  useEffect(() => {
    let userdata: any = sessionStorage.getItem("user");
    userdata = JSON.parse(userdata);
    setUserData(userdata);
  }, []);

  return (
    <div>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "235px",
          overflow: "auto",
          padding: "1px",
        }}
      >
        <Grid item md={11} xs={12}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Not getting your TechStack?
          </Typography>
        </Grid>
        <Grid item md={11} xs={12}>
          <Typography variant="subtitle1">
            Enter new stack name and click on button. An email will be sent to
            your manager to add your stack.
          </Typography>
        </Grid>
        <Grid item md={11} xs={12}>
          <TextField
            label="Add Your Stack"
            value={addstackname}
            variant="standard"
            required
            fullWidth
            onChange={(e) => setAddStackName(e.target.value)}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <FormButtons onClick={handleAddClick}>Send Request</FormButtons>
        </Grid>
      </Grid>
    </div>
  );
};
export default UserAddStack;
