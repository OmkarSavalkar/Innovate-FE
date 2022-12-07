import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { postAddStack } from "../../../../../apis/dashboardApis";
import { useAppDispatch } from "../../../../../side-effects/hooks";
import { setSnackbar } from "../../../../../side-effects/snackbarRedux";

const CreateNewStackDialog = (props: any) => {
  const { openNewStackDialog, handleDialogClose } = props;
  const dispatch = useAppDispatch();
  const [techName, setTechName] = useState<string>("");
  const [techUrl, setTechUrl] = useState<string>("");
  const [techDescription, setTechDescription] = useState<string>("");

  const clearDialogFields = () => {
    setTechName("");
    setTechUrl("");
    setTechDescription("");
    handleDialogClose();
  };

  const handleSubmit = () => {
    let payload = {
      techId: 17,
      techName: techName,
      techDescription: techDescription,
      techImgUrl: techUrl,
    };
    if (techName && techUrl && techDescription) {
      postAddStack(payload)
        .then((res) => {
          dispatch(
            setSnackbar({
              isSnackbarOpen: true,
              snackbarMessage: "Successfully Added Technology !",
              snackbarType: "Success",
            })
          );
        })
        .catch((error) => {
          dispatch(
            setSnackbar({
              isSnackbarOpen: true,
              snackbarMessage: "Error in Adding TechStack !",
              snackbarType: "Error",
            })
          );
        });
    } else {
      dispatch(
        setSnackbar({
          isSnackbarOpen: true,
          snackbarMessage: "Please add all fields !",
          snackbarType: "Warning",
        })
      );
    }
    clearDialogFields();
  };

  return (
    <>
      <Dialog
        open={openNewStackDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Add New Technology Stack
          <Button onClick={handleDialogClose} sx={{ float: "right" }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <>
            <Grid container rowSpacing={2} columnGap={2}>
              <Grid item md={7} sx={{ marginTop: "5px" }}>
                <TextField
                  label="New Technology Name"
                  fullWidth
                  required
                  value={techName}
                  onChange={(e) => setTechName(e.target.value)}
                />
                <Typography variant="subtitle2" color={"secondary"}>
                  Please check if the technology all ready exists by using
                  search on dashboard
                </Typography>
              </Grid>
              <Grid item md={11}>
                <TextField
                  required
                  label="New Technology Logo Image URL"
                  fullWidth
                  value={techUrl}
                  onChange={(e) => setTechUrl(e.target.value)}
                />
                <Typography variant="subtitle2" color={"secondary"}>
                  Instructions : <br></br>
                  1. Search for technology logo on google with transparent
                  background (.png image) <br></br> 2. Right Click on logo image
                  and select - copy image address <br></br> 3. Now verify the
                  image by pasting the copied url in new tab. Note:- Only image
                  should open with that url in new tab. <br></br> 4. If above
                  step is correct then paste that image in the above given
                  field.
                </Typography>
              </Grid>
              <Grid item md={12}>
                <TextField
                  required
                  label="Technology Description"
                  role="textbox"
                  multiline
                  rows={3}
                  fullWidth
                  value={techDescription}
                  onChange={(e) => setTechDescription(e.target.value)}
                />
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>cancel</Button>
          <Button onClick={handleSubmit}>submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateNewStackDialog;
