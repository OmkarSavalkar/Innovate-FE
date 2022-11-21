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

const RecoverPassword = () => {
  const [verifyEmail, setVerifyEmail] = useState<String>("");

  const handleVerifyEmail = (e: any) => {
    let payload = { email: verifyEmail };
    postVerifyEmail(payload);
  };

  return (
    <LoginSignupContainer>
      <LoginBox>
        <FormBox>
          <Grid container spacing={{ md: 4 }}>
            <Grid item md={6}>
              <Image src={resetImage} alt="verify Image" />
            </Grid>
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
              <FormButtons onClick={(e) => handleVerifyEmail(e)}>
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
