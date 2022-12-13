import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  FormBox,
  FormButtons,
  FormTitle,
  LoginBox,
  LoginSignupContainer,
} from "../../styledComponents/loginSignupStyled";
import Image from "next/image";
import resetImage from "../../public/reset.jpg";
import { postVerifyEmail } from "../../apis/loginSignup";
import { useAppDispatch } from "../../side-effects/hooks";
import { setSnackbar } from "../../side-effects/snackbarRedux";

const RecoverPassword = () => {
  const dispatch = useAppDispatch();
  const [verifyEmail, setVerifyEmail] = useState<String>("");

  const handleVerifyEmail = () => {
    let payload = { email: verifyEmail };
    if (verifyEmail != "") {
      verifyEmail &&
        postVerifyEmail(payload).then(() => {
          dispatch(
            setSnackbar({
              isSnackbarOpen: true,
              snackbarMessage:
                "Reset password link sent over email Please check else try again.",
              snackbarType: "Success",
            })
          );
        });
    } else {
      dispatch(
        setSnackbar({
          isSnackbarOpen: true,
          snackbarMessage: "Enter username or Email",
          snackbarType: "Error",
        })
      );
    }
  };

  return (
    <LoginSignupContainer>
      <LoginBox>
        <FormBox>
          <Grid container spacing={{ md: 4 }}>
            <Grid
              item
              md={6}
              sx={{
                backgroundImage: `url(https://connectwell-5f9f8.web.app/reset.jpg)`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></Grid>
            <Grid item md={6}>
              <FormTitle>Email Verification</FormTitle>
              <Typography>
                Please Enter Your Email and Click on Verify Button. An Email
                will be sent to you. Follow the instructions in emai to reset
                your password.
              </Typography>
              <Grid item md={12}>
                <TextField
                  label="Username or Email"
                  type={"email"}
                  aria-label="verify email Input"
                  variant="standard"
                  required
                  fullWidth
                  value={verifyEmail}
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  sx={{
                    marginBottom: "15px",
                    marginTop: "15px",
                  }}
                />
              </Grid>
              <FormButtons onClick={handleVerifyEmail}>
                Verify Email
              </FormButtons>
            </Grid>
          </Grid>
        </FormBox>
      </LoginBox>
    </LoginSignupContainer>
  );
};
export default RecoverPassword;
