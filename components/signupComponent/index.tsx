import React from "react";
import style from "./index.module.css";
import { TextField, Grid, Button, Autocomplete } from "@mui/material";
import { useRouter } from "next/router";
import {
  FormBox,
  LoginSignupContainer,
  SignupBox,
  FormTitle,
  FormButtons,
  FormSignupButtons,
} from "../../styledComponents/loginSignupStyled";

const SignupComponent = () => {
  const router = useRouter();
  let roleList = [
    "Manager",
    "Tech Lead",
    "Principle Architect",
    "Delivery Head",
    "Devops",
    "Senior Tester",
    "Associate Software Engineer",
    "Software Engineer",
    "Senior Software Engineer",
  ];

  const handleSignupExpert = () => {
    router.push("/dashboard");
  };

  const handleSignupUser = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <LoginSignupContainer>
        <SignupBox>
          <FormBox>
            <FormTitle>Signup To ConnectWell</FormTitle>
            <Grid container spacing={{ md: 4 }}>
              <Grid item md={4}>
                <TextField
                  label="Full Name"
                  type={"text"}
                  aria-label="fullname Input"
                  variant="standard"
                  required
                  fullWidth
                  //   value={username}
                  //   onChange={(e) => setUsername(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    color: "white",
                    marginTop: "10px",
                    marginBottom: "5px",
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Username or Email"
                  type={"text"}
                  aria-label="email Input"
                  variant="standard"
                  required
                  fullWidth
                  //   value={username}
                  //   onChange={(e) => setUsername(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    color: "white",
                    marginTop: "10px",
                    marginBottom: "5px",
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <Autocomplete
                  options={roleList || []}
                  getOptionLabel={(option: any) => option}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option.value === value.value
                  }
                  value={null}
                  //   onChange={(event: any, newValue: any | null) => {
                  //     setOutreachEventValues({
                  //       ...outreachEventValues,
                  //       agencyId: newValue,
                  //     });
                  //   }}
                  sx={{
                    color: "white",
                    marginTop: "10px",
                    marginBottom: "5px",
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      autoComplete="off"
                      {...params}
                      label="Designation or Role"
                      role="textbox"
                      aria-label="Organizer Input"
                      variant="standard"
                      required
                      InputLabelProps={{
                        style: { color: "#fff" },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4}>
                <TextField //dropdown
                  label="Manager Name"
                  type={"text"}
                  aria-label="manager name Input"
                  variant="standard"
                  required
                  fullWidth
                  //   value={username}
                  //   onChange={(e) => setUsername(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    color: "white",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Set Password"
                  type={"password"}
                  aria-label="password Input"
                  variant="standard"
                  required
                  fullWidth
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    color: "white",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Confirm Password"
                  type={"password"}
                  aria-label="password Input"
                  variant="standard"
                  required
                  fullWidth
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    color: "white",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Summary"
                  type={"text"}
                  aria-label="summmary Input"
                  variant="outlined"
                  multiline
                  rows={3}
                  required
                  fullWidth
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    color: "white",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Technology Stack"
                  type={"text"}
                  aria-label="summmary Input"
                  variant="outlined"
                  multiline
                  rows={3}
                  required
                  fullWidth
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    color: "white",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <FormSignupButtons onClick={handleSignupExpert}>
                  Signup as Expert
                </FormSignupButtons>
              </Grid>
              <Grid item md={6}>
                <FormSignupButtons onClick={handleSignupUser}>
                  Signup as User
                </FormSignupButtons>
              </Grid>
            </Grid>
          </FormBox>
        </SignupBox>
      </LoginSignupContainer>
    </>
  );
};
export default SignupComponent;
