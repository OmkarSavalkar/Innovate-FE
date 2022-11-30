import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Grid, Paper, Stack } from "@mui/material";
import Image from "next/image";
import DashboardImage from "../../public/ManagerDashboard.gif";

const drawerWidth = 200;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  sideBarList?: Array<String>;
  main?: any;
  rightTop?: any;
  rightBottom?: any;
  topCard?: any;
  profileLayout?: boolean;
}

export default function LayoutComponent(props: Props) {
  const {
    window,
    sideBarList,
    main,
    rightTop,
    rightBottom,
    topCard,
    profileLayout,
  } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const userData = JSON.parse(sessionStorage.getItem("user") || "");
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [drawerValue, setDrawerValue] = useState<number>(0);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    router.push("/profile");
  };

  const handleDashboard = () => {
    handleCloseUserMenu();
    router.push("/dashboard");
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  const drawer = (
    <div className={styles["drawer-style"]}>
      <Toolbar>
        <Typography variant="h5">Connect Well</Typography>
      </Toolbar>
      <Divider />
      <List>
        {sideBarList &&
          sideBarList.map((text, index: number) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                backgroundColor: drawerValue == index ? "white" : "transparent",
                color: drawerValue == index ? "black" : "white",
                borderRadius: "20px 20px 20px 20px",
              }}
            >
              <ListItemButton
                onClick={() => {
                  setDrawerValue(index);
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#3d156b",
      }}
    >
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#3d156b",
              border: "0px",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "transparent",
              border: "0px",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "white",
          margin: "20px 20px 20px 20px",
          borderRadius: "20px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              width: { sm: `calc(100% - ${drawerWidth + 40}px)` },
              ml: { sm: `${drawerWidth + 40}px` },
              backgroundColor: "white",
              color: "#3d156b",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            {!profileLayout ? `Dashboard` : `Your Profile`}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={userData?.fullName}
                  src="/static/images/avatar/2.jpg"
                  sx={{ bgcolor: "#341e73" }}
                />
              </IconButton>
            </Tooltip>

            <Button
              disableElevation
              onClick={handleOpenUserMenu}
              endIcon={<KeyboardArrowDownIcon aria-label="down Arrow" />}
            >
              <Tooltip title="Open settings">
                <Stack>
                  <Typography
                    variant="subtitle1"
                    component="h5"
                    sx={{ fontWeight: "bold" }}
                  >
                    {userData?.fullName}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {userData?.signupRole}
                  </Typography>
                </Stack>
              </Tooltip>
            </Button>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>

        <Grid container rowGap={2}>
          {!profileLayout ? (
            <>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    backgroundColor: "#e4dbff",
                    height: "160px",
                    marginLeft: "30px",
                    overflow: "auto",
                  }}
                  elevation={10}
                >
                  <Grid container>
                    <Grid item xs={12} md={9}>
                      {topCard}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={3}
                      sx={{ textAlign: "end" }}
                      className={styles["user-image"]}
                    >
                      <Image
                        src={DashboardImage}
                        alt="dashboard image"
                        height={150}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item md={8}>
                <Paper
                  sx={{
                    backgroundImage:
                      "linear-gradient(to bottom, #3d156b, #772168)",
                    height: "500px",
                    marginLeft: "30px",
                    padding: "20px",
                  }}
                  elevation={10}
                >
                  {main[drawerValue]}
                </Paper>
              </Grid>
              <Grid item md={4}>
                <Paper
                  sx={{
                    backgroundImage:
                      "linear-gradient(to bottom, #cd3f66, #a22965)",
                    height: "240px",
                    marginLeft: "30px",
                    marginBottom: "20px",
                  }}
                  elevation={10}
                >
                  {rightTop[drawerValue]}
                </Paper>
                <Paper
                  sx={{
                    backgroundImage:
                      "linear-gradient(to bottom, #ea636c, #faab7b)",
                    height: "240px",
                    marginLeft: "30px",
                  }}
                  elevation={10}
                >
                  {rightBottom[drawerValue]}
                </Paper>
              </Grid>
            </>
          ) : (
            <>
              <Grid item md={12}>
                {main}
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
