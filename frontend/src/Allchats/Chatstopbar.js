import { Box, Drawer, Grid, Typography } from "@mui/material";
import React from "react";
import "./allchats.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCommentIcon from "@mui/icons-material/AddComment";
import GroupIcon from "@mui/icons-material/Group";
import Addfriend from "./Addfriend";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Profile from "./Profile";

export default function Chatstopbar() {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => () => {
    setState(open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [profileState, setProfileState] = React.useState(false);
  const toggleProfile = (event) => {
    setProfileState(event);
    setAnchorEl(null);
  };

  return (
    <Box className="header">
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <Typography className="heading">Chats</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", flexDirection: "row", gap: "7px" }}>
          <Grid item className="icon">
            <GroupIcon />
          </Grid>
          <Grid item className="icon">
            <AddCommentIcon onClick={toggleDrawer(true)} />
            <React.Fragment>
              <Drawer
                open={state}
                onClose={toggleDrawer(false)}
                className="toggle-bar"
              >
                <Addfriend toggleDrawer={toggleDrawer} />
              </Drawer>
            </React.Fragment>
          </Grid>
          <Grid item className="icon">
            <MoreVertIcon
              id="basic-button"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  toggleProfile(true);
                }}
                sx={{ padding: "0 20px" }}
              >
                Profile
              </MenuItem>

              <MenuItem sx={{ padding: "0 20px" }} onClick={handleClose}>
                Logout
              </MenuItem>
            </Menu>
            <Drawer
              anchor="right"
              open={profileState}
              onClose={() => {
                toggleProfile(false);
              }}
              className="toggle-bar"
            >
              <Profile></Profile>
            </Drawer>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
