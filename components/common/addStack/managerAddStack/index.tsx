import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormButtons } from "../../../../styledComponents/loginSignupStyled";
import CreateNewStackDialog from "./createTechStackDialog";

const ManagerAddStack = () => {
  const [openNewStackDialog, setOpenNewStackDialog] = useState<boolean>(false);

  const handleDialogClose = () => {
    setOpenNewStackDialog(false);
  };

  const handleAddClick = () => {
    setOpenNewStackDialog(true);
  };
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
          padding: "3px 1px",
        }}
      >
        <Grid item md={11} xs={12}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Check for mail request to add new Tech Stack!
          </Typography>
        </Grid>
        <Grid item md={11} xs={12}>
          <Typography variant="subtitle1">
            Click below button and fill up all the details as instructed to add
            new technology to stack feed.
          </Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <FormButtons onClick={handleAddClick}>Add New Technology</FormButtons>
        </Grid>
      </Grid>
      <CreateNewStackDialog
        openNewStackDialog={openNewStackDialog}
        handleDialogClose={handleDialogClose}
      />
    </div>
  );
};
export default ManagerAddStack;
