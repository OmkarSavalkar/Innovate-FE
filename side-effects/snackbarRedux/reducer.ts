import { createReducer } from "@reduxjs/toolkit";
import { setSnackbar, setSnackbarClose } from "./actions";

const initialState: any = {
  snackbar: {
    isSnackbarOpen: false,
    snackbarMessage: "",
    snackbarType: "",
  },
};

export const SnackBarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSnackbar, (state, { payload }) => {
      state.snackbar = payload;
    })
    .addCase(setSnackbarClose, (state, { payload }) => {
      state.snackbar = {
        isSnackbarOpen: false,
        snackbarMessage: "",
        snackbarType: "",
      };
    });
});
