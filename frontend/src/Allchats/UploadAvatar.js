import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const UploadAvatar = (props) => {
  const [anchorEle, setAnchorEle] = React.useState(null);
  const openMenu = Boolean(anchorEle);
  const handleClicked = (event) => {
    setAnchorEle(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorEle(null);
  };

  const [src, setSrc] = useState(props.imagesrc);

  const removeProfile = () => {
    setSrc(null);
  };

  const inputFileRef = useRef(null);
  const handleMenuItemClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log("Hello");
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSrc = e.target.result;
        setSrc(newSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Avatar
        alt={props.name}
        className="profile-image"
        src={src}
        sx={{
          height: "180px",
          width: "180px",
          margin: "60px auto",
        }}
        onClick={handleClicked}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEle}
        open={openMenu}
        onClose={handleClosed}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ padding: "10px 40px" }} onClick={handleMenuItemClick}>
          Update Profile
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            id="photoInput-1"
            className="photoInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </MenuItem>
        <MenuItem sx={{ padding: "10px 40px" }} onClick={removeProfile}>
          Remove Photo
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UploadAvatar;
