import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { getNews } from "../../../apis/dashboardApis";
import { useAppDispatch } from "../../../side-effects/hooks";
import { setSnackbar } from "../../../side-effects/snackbarRedux";
import { colorScheme } from "../../../utils/constant";
import technologyNews from "../../../utils/constant/newsJSON/technologyNews.json";
import businessNews from "../../../utils/constant/newsJSON/businessNews.json";
import scienceNews from "../../../utils/constant/newsJSON/scienceNews.json";

const NewsComponent = () => {
  const [newsData, setNewsData] = useState<any>([]);
  const [newsCategory, setNewsCategory] = useState<string>("technology");
  const dispatch = useAppDispatch();

  useEffect(() => {
    getNews(newsCategory)
      .then((res) => {
        setNewsData(res.data.articles);
      })
      .catch((error) => {
        newsCategory == "technology"
          ? setNewsData(technologyNews?.articles)
          : newsCategory == "business"
          ? setNewsData(businessNews?.articles)
          : setNewsData(scienceNews?.articles);
        // dispatch(
        //   setSnackbar({
        //     isSnackbarOpen: true,
        //     snackbarMessage: "Something went wrong, please try again later.",
        //     snackbarType: "Error",
        //   })
        // );
      });
  }, [newsCategory]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <Typography
          sx={{
            backgroundImage: `linear-gradient(to bottom, ${colorScheme.color1}, ${colorScheme.color4})`,
            borderRadius: "15px",
            margin: "0 5px",
            padding: "2px 15px",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              color: "yellow",
            },
          }}
          onClick={() => setNewsCategory("business")}
        >
          Business
        </Typography>
        <Typography
          sx={{
            backgroundImage: `linear-gradient(to bottom, ${colorScheme.color1}, ${colorScheme.color4})`,
            borderRadius: "15px",
            margin: "0 5px",
            padding: "2px 15px",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              color: "yellow",
            },
          }}
          onClick={() => setNewsCategory("technology")}
        >
          Technology
        </Typography>
        <Typography
          sx={{
            backgroundImage: `linear-gradient(to bottom, ${colorScheme.color1}, ${colorScheme.color4})`,
            borderRadius: "15px",
            margin: "0 5px",
            padding: "2px 15px",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              color: "yellow",
            },
          }}
          onClick={() => setNewsCategory("science")}
        >
          Science
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          backgroundColor: "#F6F3EE",
          height: "100vh",
          overflow: "auto",
          listStyle: "none",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rebeccapurple",
            outline: "1px solid slategrey",
          },
          padding: "10px 0px 10px 12px",
        }}
        rowGap={3}
      >
        {newsData.length > 0 ? (
          newsData.map((item: any, index: number) => {
            return (
              <Grid item md={3} key={index}>
                <Card
                  sx={{
                    width: "90%",
                    borderRadius: "10px",
                  }}
                  elevation={10}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="125"
                      image={item.urlToImage}
                      alt="green iguana"
                    />
                    <CardContent sx={{ paddingTop: "5px", paddingBottom: "0" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "5",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{
                      paddingTop: "5px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => window.open(item.url, "_blank")}
                      sx={{
                        "&:hover": {
                          borderRadius: "18px",
                          backgroundImage: `linear-gradient(to bottom, ${colorScheme.color1}, ${colorScheme.color4})`,
                          color: "white",
                          transition: "0.5s",
                        },
                      }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <h3>No News on this as of now...</h3>
        )}
      </Grid>
    </>
  );
};
export default NewsComponent;
