import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import ProfileName from "./ProfileName";
import UploadAvatar from "./UploadAvatar";

const Profile = (props) => {
  return (
    <Box
      className="container"
      sx={{
        backgroundColor: "#fff",
        width: 500,
      }}
    >
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "1",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UploadAvatar></UploadAvatar>
        <Grid
          sx={{ width: "500px", backgroundColor: "#e9edef", padding: "20px" }}
        >
          <Typography variant="h7" component="h7">
            Your Name
          </Typography>
          <ProfileName></ProfileName>
        </Grid>
        <Grid sx={{ width: "500px", padding: "30px" }}></Grid>
        <Grid
          sx={{ width: "500px", backgroundColor: "#e9edef", padding: "20px" }}
        >
          <Typography variant="h7" component="h7">
            Your Email
          </Typography>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              marginTop: "20px",
            }}
          >
            {props.email}vinay@gmail.com
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
