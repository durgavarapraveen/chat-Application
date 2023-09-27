import React from "react";
import { Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileName = (props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(props.name);
  const toggleIsEditing = () => setIsEditing((b) => !b);

  if (isEditing) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          className="MuiTypography-root MuiTypography-h3 MuiTypography-displayInline"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Typography style={{ display: "none" }} />
        <Button size="small" onClick={toggleIsEditing}>
          Done
        </Button>
      </div>
    );
  }

  return (
    <Typography
      variant="h5"
      component="h3"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
    >
      {value} Vinay
      <EditIcon onClick={toggleIsEditing}></EditIcon>
    </Typography>
  );
};

export default ProfileName;
