import { useRouter } from "next/router";
import React, { useState } from "react";
import style from "./index.module.css";
import { TextField, Grid, Button } from "@mui/material";
import {
  FormBox,
  FormButtons,
  FormLinks,
  FormTitle,
  LoginBox,
  LoginSignupContainer,
} from "../../styledComponents/loginSignupStyled";
import axios from "axios";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleForgetPassword = () => {};

  const handleLogin = (e: any) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "https://x-innovate-be.herokuapp.com/login",
      data: {
        email: username,
        password: password,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result.data);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <>
      {/* require to refactor using mui */}
      <LoginSignupContainer>
        <LoginBox>
          <FormBox>
            <FormTitle>Login To ConnectWell</FormTitle>
            <Grid container spacing={{ md: 4 }}>
              <Grid item md={12}>
                <TextField
                  label="Username"
                  type={"text"}
                  aria-label="username Input"
                  variant="standard"
                  required
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    color: "white",
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Password"
                  type={"password"}
                  aria-label="password Input"
                  variant="standard"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{ color: "white", marginBottom: "15px" }}
                />
              </Grid>
            </Grid>
            <FormLinks>
              <span onClick={handleForgetPassword}>Forgot Password ?</span>
              <span onClick={handleSignup}>Signup</span>
            </FormLinks>
            <FormButtons onClick={(e) => handleLogin(e)}>Login</FormButtons>
          </FormBox>
        </LoginBox>
      </LoginSignupContainer>
    </>
  );
};
export default LoginComponent;
