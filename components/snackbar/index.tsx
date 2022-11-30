import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useDispatch } from "react-redux";
import {
  selectSnackbar,
  setSnackbarClose,
} from "../../side-effects/snackbarRedux";
import { useAppSelector } from "../../side-effects/hooks";
const SnackbarComponent = (props: any) => {
  const snackBar = useAppSelector(selectSnackbar);
  const isSnackbarOpen = snackBar.isSnackbarOpen;
  const message = snackBar.snackbarMessage;
  const messageType = snackBar.snackbarType;
  const dispatch = useDispatch();
  const handleSnackbarClose = () => {
    dispatch(setSnackbarClose());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <div>
        {messageType === "Success" && (
          <MuiAlert onClose={handleSnackbarClose} severity="success">
            {message ? message : "Action successful"}
          </MuiAlert>
        )}
        {messageType === "Error" && (
          <MuiAlert onClose={handleSnackbarClose} severity="error">
            {message ? message : "Action failed"}
          </MuiAlert>
        )}
        {messageType === "" && <div></div>}
      </div>
    </Snackbar>
  );
};

export default SnackbarComponent;
