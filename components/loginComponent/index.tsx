import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
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
    e.preventDefault();
    let payload = {
      email: username,
      password: password,
    };
    postLoginData(payload)
      .then((result) => {
        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
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
            <Grid container spacing={{ md: 4 }}>
              <Grid item md={6} className={style["image-grid"]}>
                <Image src={loginImage} alt="Login Image" />
              </Grid>
              <Grid item md={6}>
                <Grid container component="form">
                  <FormTitle>Login</FormTitle>
                  <Grid item md={12}>
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
                      sx={{ marginBottom: "15px" }}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <FormLinks>
                      <span onClick={handleForgetPassword}>
                        Forgot Password ?
                      </span>
                      <span onClick={handleSignup}>Signup</span>
                    </FormLinks>
                    <FormButtons onClick={handleLogin}>Login</FormButtons>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormBox>
        </LoginBox>
      </LoginSignupContainer>
    </>
  );
};
export default LoginComponent;
