import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Card,
  IconButton,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  Toolbar,
} from "@mui/material";
import styles from "./index.module.css";
import { colorScheme } from "../../../utils/constant";

const AppreciationCard = (props: any) => {
  const { handleAppreciation } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton onClick={handleOpen}>
        <ThumbUpIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles["modal-style"]}>
          <Card
            sx={{
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.753)",
            }}
            className={styles["appreciation-style"]}
            elevation={0}
          >
            <CardActionArea>
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  transform: "translate(180%, 46%)",
                  backgroundImage: `url(https://connectwell-5f9f8.web.app/appreciationCard.png)`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></Box>
              <CardContent
                sx={{
                  paddingTop: "5px",
                  bgcolor: colorScheme.color9,
                  margin: "20px",
                  textAlign: "center",
                  overflow: "auto",
                }}
              >
                <Toolbar></Toolbar>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Appreciate the efforts
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
                  No one who achieves success dose so without the help of
                  others. the wise and confident acknowledge this help with
                  gratitude.
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
                variant="contained"
                sx={{ bgcolor: colorScheme.color1 }}
                onClick={() => {
                  handleAppreciation();
                  handleClose();
                }}
              >
                Say Thanks
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
};
export default AppreciationCard;
