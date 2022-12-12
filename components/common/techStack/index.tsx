import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { Stack } from "@mui/system";
import usePagination from "../pagination";
import { getTechStackList } from "../../../apis/loginSignup";
import { useRouter } from "next/router";

const TechStack = () => {
  const [techList, setTechList] = useState<any>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const router = useRouter();

  //for pagination on FE level
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(techList?.length / PER_PAGE);
  const newDATA = usePagination(techList, PER_PAGE);
  const handleChange = (e: any, p: any) => {
    setPage(p);
    newDATA.jump(p);
  };

  useEffect(() => {
    let pay = {};
    if (searchKeyword != "") {
      pay = { techName: searchKeyword };
    }
    getTechStackList(pay).then((res) => {
      setTechList(res.data);
    });
  }, [searchKeyword]);

  return (
    <Box
      sx={{
        height: "450px",
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
      }}
    >
      <Toolbar>
        <Stack
          className={style["searchBox"]}
          direction={{ xs: "column", sm: "row" }}
        >
          <TextField
            variant="standard"
            placeholder="Search"
            className={style["searchInput"]}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            sx={{
              backgroundColor: "#e4dbff",
              border: "1px solid white",
              padding: "0px 8px",
              "& ::placeholder": {
                color: "black",
              },
            }}
          />
          <FindInPageIcon
            fontSize="large"
            sx={{ color: "white", cursor: "pointer" }}
          />
          <Typography
            sx={{ paddingTop: "5px", paddingLeft: "5px", float: "right" }}
          >
            Go for Quick Stacks
          </Typography>
        </Stack>
      </Toolbar>
      <Grid
        container
        spacing={3}
        rowGap={2}
        sx={{
          padding: " 15px",
          overflow: "auto",
          marginTop: "0.05rem",
        }}
      >
        {newDATA?.currentData()?.map((item: any, index: number) => {
          return (
            <Grid item md={4} xs={12} key={index}>
              <Grid>
                <Card
                  elevation={8}
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "12px",
                    flexWrap: "wrap",
                    aspectRatio: "18 / 9",
                    "&:hover": {
                      color: "white",
                      backgroundImage:
                        "linear-gradient(to bottom, #ea636c, #faab7b)",
                    },
                    backgroundColor: "#edf0ee",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/chatScreen",
                      query: { techId: item._id },
                    });
                  }}
                >
                  <Grid item md={4} xs={12} className={style["cardimage"]}>
                    <CardMedia
                      component="img"
                      image={item.techImgUrl}
                      alt="Tech stacks"
                      sx={{ width: "95%", marginLeft: "5px" }}
                    />
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <CardContent>
                      <Typography component="p" variant="h6">
                        {item.techName}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          );
        })}
        <Grid
          item
          md={12}
          xs={12}
          sx={{
            display: "flex",
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            onChange={handleChange}
            sx={{
              button: { color: "yellow" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default TechStack;
