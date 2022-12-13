import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Card,
  CardContent,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { addExperties } from "../../apis/expert";
import { useAppDispatch } from "../../side-effects/hooks";
import { setSnackbar } from "../../side-effects/snackbarRedux";
import Button from "@mui/material/Button";
import { getTechStackList } from "../../apis/loginSignup";

const ProfileComponent = (props: any) => {
  const { userData, setUserData, refresh, setRefresh } = props;
  const [techNameList, setTechNameList] = useState<any>([]);
  const [tech, setTech] = useState<any>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    getTechStackList({})
      .then((response: any) => {
        setTechNameList(response.data);
      })
      .catch((error) => {
        dispatch(
          setSnackbar({
            isSnackbarOpen: true,
            snackbarMessage: "Something went wrong. Please try again later.",
            snackbarType: "Error",
          })
        );
      });
  }, []);

  const handleAddTech = () => {
    let payload = {
      newTech: tech,
      expert: userData,
    };
    addExperties(userData._id, payload)
      .then((response) => {
        dispatch(
          setSnackbar({
            isSnackbarOpen: true,
            snackbarMessage: response.data.message,
            snackbarType: "Success",
          })
        );
        let tempUser = userData;
        tempUser.techStackId.push(tech);
        sessionStorage.setItem("user", JSON.stringify(tempUser));
        setUserData(tempUser);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          setSnackbar({
            isSnackbarOpen: true,
            snackbarMessage: error.response.data.message,
            snackbarType: "Error",
          })
        );
      });
  };
  return (
    <Grid
      container
      sx={{
        display: "flex",
        paddingTop: "5%",
        backgroundColor: "#F6F3EE",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Grid item md={4}>
        <Card
          sx={{
            maxWidth: "83%",
            marginLeft: "8%",
            boxShadow: "8px 8px #bcbcbc",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              alt="pic"
              width="45%"
              style={{ padding: "20px 0px" }}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography gutterBottom variant="h5" fontWeight="bold">
                {userData?.fullName}
              </Typography>
              <Typography gutterBottom variant="h6" color="text.secondary">
                {userData.role}
              </Typography>
              <Typography
                gutterBottom
                variant="inherit"
                color="text.secondary"
                fontWeight="bold"
              >
                Signed Up As
              </Typography>
              <Typography gutterBottom variant="overline" fontWeight="bold">
                {userData.signupRole}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Grid>
      <Grid item md={8}>
        <Card
          sx={{
            maxWidth: "97%",

            // border: "1px solid gray",
            boxShadow: "8px 8px #bcbcbc",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Email
            </Typography>
            <Typography
              gutterBottom
              variant="inherit"
              component="div"
              color="text.secondary"
            >
              {userData.email}
            </Typography>
            <Divider variant="middle" sx={{ margin: "10px" }} />
            <Typography gutterBottom variant="h6" component="div">
              Your Manager
            </Typography>
            <Typography
              gutterBottom
              variant="inherit"
              component="div"
              color="text.secondary"
            >
              {userData.managerEmpId}
            </Typography>
            <Divider variant="middle" sx={{ margin: "10px" }} />
            <Typography gutterBottom variant="h6" component="div">
              Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData?.summary}
            </Typography>
            {userData.signupRole === "Expert" && (
              <>
                <Divider variant="middle" sx={{ margin: "10px" }} />
                <Toolbar>
                  <Grid item xs={12} md={6}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ flex: 1 }}
                    >
                      Technology Stack
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                    <Autocomplete
                      fullWidth
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
                    <Button onClick={handleAddTech} startIcon={<AddIcon />}>
                      Add
                    </Button>
                  </Grid>
                </Toolbar>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  {userData?.techStackId?.map((item: any, key: number) => {
                    return (
                      <span
                        key={key}
                        style={{
                          backgroundColor: "#341e73",
                          borderRadius: "10px",
                          margin: "5px 8px",
                          padding: "5px",
                          color: "white",
                        }}
                      >
                        {item.techName}
                      </span>
                    );
                  })}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default ProfileComponent;
