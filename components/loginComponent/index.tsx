import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import style from "./index.module.css";
import { TextField, Grid, Button, Box, Typography, Link } from "@mui/material";
// import {
//   FormBox,
//   FormButtons,
//   FormLinks,
//   FormTitle,
//   LoginBox,
//   LoginSignupContainer,
// } from "../../styledComponents/loginSignupStyled";
import axios from "axios";
import loginImage from "../../public/LoginImage.jpg";
import Image from "next/image";
import { postLoginData } from "../../apis/loginSignup";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formReference = useRef<any>(null);
  const router = useRouter();

  const handleForgetPassword = () => {
    router.push("/recoverPassword");
  };

  const handleLogin = (e: any) => {
    if (formReference.current.reportValidity()) {
      let payload = {
        email: username,
        password: password,
      };
      username &&
        password &&
        postLoginData(payload)
          .then((result) => {
            sessionStorage.setItem("user", JSON.stringify(result.data.user));
            sessionStorage.setItem("token", result.data.token);
            if (result.data.user.isApproved === false) {
              //snackbar
            } else {
              router.push("/dashboard");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <Box className={style["loginContainer"]}>
      <Box className={style["innerBox"]}>
        <Box className={style["formBox"]}>
          <Grid container spacing={{ md: 4 }}>
            <Grid item md={6} className={style["image-grid"]}>
              <Image
                src={loginImage}
                alt="Login Image"
                className={style["user-image"]}
              />
            </Grid>
            <Grid item md={6}>
              <Grid container component="form" rowGap={2} ref={formReference}>
                <Grid item xs={12}>
                  <h1 className={style["loginTitle"]}>Login</h1>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type={"text"}
                    aria-label="username Input"
                    variant="standard"
                    required
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type={"password"}
                    aria-label="password Input"
                    variant="standard"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: "15px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Link onClick={handleForgetPassword}>
                        Forgot Password ?
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Link onClick={handleSignup}>
                        Don&apos;t have an account?
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={handleLogin}
                    className={style["loginButton"]}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default LoginComponent;
