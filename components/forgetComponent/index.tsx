import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  FormBox,
  FormButtons,
  FormLinks,
  FormTitle,
  LoginBox,
  LoginSignupContainer,
} from "../../styledComponents/loginSignupStyled";
import Image from "next/image";
import resetImage from "../../public/reset.jpg";
import { postResetPasswordEmail } from "../../apis/loginSignup";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../side-effects/hooks";
import { setSnackbar } from "../../side-effects/snackbarRedux";

const ForgetComponent = (props: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { urlResetToken } = props;
  const [newPass, setNewPass] = useState<String>("");
  const [confirmPass, setConfirmPass] = useState<String>("");

  const handleReset = (e: any) => {
    if (newPass === confirmPass) {
      let payload = {
        password: newPass,
      };
      newPass &&
        postResetPasswordEmail(String(urlResetToken), payload)
          .then((result) => {
            console.log(result.data);
            dispatch(
              setSnackbar({
                isSnackbarOpen: true,
                snackbarMessage: "Password reset successful !",
                snackbarType: "Error",
              })
            );
            router.push("/login");
          })
          .catch((error) => {
            dispatch(
              setSnackbar({
                isSnackbarOpen: true,
                snackbarMessage: error.message, //error.response.data.message
                snackbarType: "Error",
              })
            );
          });
    } else {
      dispatch(
        setSnackbar({
          isSnackbarOpen: true,
          snackbarMessage: "New password and confirm password should be same !",
          snackbarType: "Error",
        })
      );
    }
  };

  return (
    <>
      <LoginSignupContainer>
        <LoginBox>
          <FormBox>
            <Grid container spacing={{ md: 4 }}>
              <Grid item md={6}>
                <FormTitle>Reset Password</FormTitle>
                <Grid item md={12}>
                  <TextField
                    label="New Password"
                    type={"password"}
                    aria-label="new password Input"
                    variant="standard"
                    required
                    fullWidth
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    sx={{ color: "white", marginBottom: "15px" }}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Confirm Password"
                    type={"password"}
                    aria-label="confirm password Input"
                    variant="standard"
                    required
                    fullWidth
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    sx={{ color: "white", marginBottom: "15px" }}
                  />
                </Grid>
                <FormButtons onClick={(e) => handleReset(e)}>
                  Reset Password
                </FormButtons>
              </Grid>
              <Grid item md={6}>
                <Image src={resetImage} alt="Login Image" />
              </Grid>
            </Grid>
          </FormBox>
        </LoginBox>
      </LoginSignupContainer>
    </>
  );
};
export default ForgetComponent;
