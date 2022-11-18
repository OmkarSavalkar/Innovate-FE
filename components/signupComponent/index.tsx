import React, { useState } from "react";
import style from "./index.module.css";
import {
  TextField,
  Grid,
  Button,
  Autocomplete,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  FormBox,
  LoginSignupContainer,
  SignupBox,
  FormTitle,
  FormButtons,
  FormSignupButtons,
} from "../../styledComponents/loginSignupStyled";
import UserSignUp from "../../public/User.jpg";
import ExpertSignUp from "../../public/Expert.jpg";
import Image from "next/image";
const SignupComponent = () => {
  const router = useRouter();
  let roleList = [
    "Tech Lead",
    "Principle Architect",
    "Delivery Head",
    "Devops",
    "Senior Tester",
    "Associate Software Engineer",
    "Software Engineer",
    "Senior Software Engineer",
  ];
  const [role, setRole] = useState<string>("");
  const handleSignupExpert = () => {
    router.push("/dashboard");
  };

  const handleSignupUser = () => {
    router.push("/dashboard");
  };
  const handleSetRole = (role: string) => {
    setRole(role);
  };
  return (
    <>
      <LoginSignupContainer>
        <SignupBox>
          <FormBox>
            {role === "" ? (
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{ maxWidth: "100%", elevation: 0, boxShadow: "none" }}
                  >
                    <Image src={UserSignUp} alt="user signup image" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Signing up as user you will be able to take help from
                        organization's experts.
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        You can do anything but not every thing ...
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <FormSignupButtons onClick={() => handleSetRole("User")}>
                        Sign Up As User
                      </FormSignupButtons>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{ maxWidth: "100%", elevation: 0, boxShadow: "none" }}
                  >
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Signing up as expert you will be able to help
                        organization's employee to solve their problem. By
                        helping us to be more productive,
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Helping hand can be ray of sunshine in cloudy world...
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <FormSignupButtons
                        onClick={() => handleSetRole("Expert")}
                      >
                        Sign Up As Expert
                      </FormSignupButtons>
                    </CardActions>
                    <Image src={ExpertSignUp} alt="user signup image" />
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <>
                <FormTitle>Signup</FormTitle>
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

                      sx={{
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

                      sx={{
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

                      sx={{
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

                      sx={{
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

                      sx={{
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

                      sx={{
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    />
                  </Grid>
                  {role === "Expert" && (
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

                        sx={{
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item md={6}>
                    <FormSignupButtons onClick={handleSignupExpert}>
                      Signup
                    </FormSignupButtons>
                  </Grid>
                </Grid>
              </>
            )}
          </FormBox>
        </SignupBox>
      </LoginSignupContainer>
    </>
  );
};
export default SignupComponent;
