import { Typography, Box, CardContent, Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { getTrendingTech } from "../../../apis/techStack";
import { useAppDispatch } from "../../../side-effects/hooks";
import { setSnackbar } from "../../../side-effects/snackbarRedux";
const TrendingChat = () => {
  const dispatch = useAppDispatch();
  const [trendingTech, setTrendingTech] = useState<any>();
  useEffect(() => {
    getTrendingTech()
      .then((response) => {
        setTrendingTech(response.data);
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            isSnackbarOpen: true,
            snackbarMessage: "Failed to fetch trending tech",
            snackbarType: "Success",
          })
        );
      });
  }, []);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
        Trending technology on Connect Well
      </Typography>
      <Grid container sx={{ padding: "30px" }}>
        <Grid item xs={12}>
          <Grid>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "12px",
                flexWrap: "wrap",
                aspectRatio: "18 / 9",
                backgroundColor: "transparent",

                border: "dashed rebeccapurple",
              }}
            >
              <Grid item md={4} xs={12}>
                <CardMedia
                  component="img"
                  image={trendingTech && trendingTech?.techImgUrl}
                  alt="Tech stacks"
                  sx={{ width: "95%", marginLeft: "5px" }}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <CardContent>
                  <Typography component="p" variant="h6">
                    {trendingTech && trendingTech?.techName}
                  </Typography>
                </CardContent>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default TrendingChat;
