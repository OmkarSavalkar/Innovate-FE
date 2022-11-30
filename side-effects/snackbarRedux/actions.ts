import { createAction } from "@reduxjs/toolkit";

export const setSnackbar = createAction(
  "snackbarRedux/setSnackbar",
  (snackbar: any) => ({ payload: snackbar })
);

export const setSnackbarClose = createAction(
  "snackbarRedux/setSnackbarClose",
  () => ({
    payload: null,
  })
);
