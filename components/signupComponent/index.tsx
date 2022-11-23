import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
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
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import UserSignUp from "../../public/User.jpg";
import ExpertSignUp from "../../public/Expert.jpg";
import Image from "next/image";
import {
  getManagerList,
  getTechStackList,
  postSignUpData,
} from "../../apis/loginSignup";

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
  const [managerNameList, setManagerNameList] = useState<any>([]);
  const [manager, setManager] = useState<any>();
  const [techNameList, setTechNameList] = useState<any>([]);
  const [tech, setTech] = useState<any>();
  const [role, setRole] = useState<string>("");
  const [signupRole, setSignupRole] = useState<string>("");
  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const formReference = useRef<any>(null);
  useEffect(() => {
    getManagerList()
      .then((response: any) => {
        setManagerNameList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getTechStackList()
      .then((response: any) => {
        setTechNameList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSignupExpert = () => {
    if (!formReference) {
      let tempTechStackId: any = [];
      tech.map((tech: any) => {
        tempTechStackId.push(tech.techId);
      });
      let payload = {
        fullName: fullname,
        email: email,
        role: role,
        signupRole: signupRole,
        managerEmpId: manager.empId,
        password: password,
        techStackId: tempTechStackId,
        summary: summary,
      };
      postSignUpData(payload)
        .then((response: any) => {
          sessionStorage.setItem("user", response.result);
          router.push("/login");
        })
        .catch((error: any) => {});
    }
  };
  const handleSetRole = (role: string) => {
    setSignupRole(role);
  };
  return (
    <Box className={styles["signupContainer"]}>
      <Box className={styles["innerBox"]}>
        <Box className={styles["formBox"]}>
          {signupRole === "" ? (
            <Grid container>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{ maxWidth: "100%", elevation: 0, boxShadow: "none" }}
                >
                  <Image
                    src={UserSignUp}
                    alt="user signup image"
                    className={styles["user-image"]}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Signing up as user you will be able to take help from
                      organization&apos;s experts.
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      You can do anything but not every thing ...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleSetRole("User")}
                      className={styles["loginButton"]}
                    >
                      Sign Up As User
                    </Button>
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
                      organization&apos;s employee to solve their problem. By
                      helping us to be more productive,
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Helping hand can be ray of sunshine in cloudy world...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleSetRole("Expert")}
                      className={styles["loginButton"]}
                    >
                      Sign Up As Expert
                    </Button>
                  </CardActions>
                  <Image
                    src={ExpertSignUp}
                    alt="user signup image"
                    className={styles["user-image"]}
                  />
                </Card>
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography>Signup</Typography>
              <Grid
                container
                spacing={{ md: 4 }}
                component="form"
                ref={formReference}
              >
                <Grid item md={3}>
                  <TextField
                    label="Full Name"
                    type={"text"}
                    aria-label="fullname Input"
                    variant="standard"
                    required
                    fullWidth
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    sx={{
                      marginTop: "10px",
                      marginBottom: "5px",
                    }}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    label="Email"
                    type={"text"}
                    aria-label="email Input"
                    variant="standard"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      marginTop: "10px",
                      marginBottom: "5px",
                    }}
                  />
                </Grid>
                <Grid item md={3}>
                  <Autocomplete
                    options={roleList || []}
                    getOptionLabel={(option: any) => option}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option.value === value.value
                    }
                    onChange={(event: any, newValue: any | null) => {
                      setRole(newValue);
                    }}
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
                <Grid item md={3}>
                  <Autocomplete
                    options={managerNameList || []}
                    getOptionLabel={(option: any) =>
                      `${option.name} (Emp ID: ${option.empId})`
                    }
                    onChange={(event: any, newValue: any | null) => {
                      setManager(newValue);
                    }}
                    sx={{
                      marginTop: "10px",
                      marginBottom: "5px",
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        autoComplete="off"
                        {...params}
                        label="Manager Name"
                        role="textbox"
                        aria-label="Manager Name"
                        variant="standard"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    label="Set Password"
                    type={"password"}
                    aria-label="password Input"
                    variant="standard"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    label="Confirm Password"
                    type={"password"}
                    aria-label="password Input"
                    variant="standard"
                    required
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <Autocomplete
                    multiple
                    options={techNameList || []}
                    getOptionLabel={(option: any) => option?.techName}
                    onChange={(event: any, newValue: any | null) => {
                      setTech(newValue);
                    }}
                    sx={{
                      marginTop: "10px",
                      marginBottom: "5px",
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        autoComplete="off"
                        {...params}
                        label="Technology Stack"
                        role="textbox"
                        aria-label="Technology Stack"
                        variant="standard"
                        required={tech ? tech.length == 0 : true}
                      />
                    )}
                  />
                </Grid>
                {signupRole === "Expert" && (
                  <Grid item md={12}>
                    <TextField
                      label="Summary"
                      type={"text"}
                      aria-label="summmary Input"
                      variant="outlined"
                      multiline
                      rows={3}
                      required
                      fullWidth
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      sx={{
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    />
                  </Grid>
                )}
                <Grid item md={6}>
                  <Button
                    type="submit"
                    onClick={handleSignupExpert}
                    className={styles["loginButton"]}
                  >
                    Signup
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default SignupComponent;
