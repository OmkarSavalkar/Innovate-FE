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

const ForgetComponent = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleReset = (e: any) => {};

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
