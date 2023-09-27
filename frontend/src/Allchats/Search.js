import { Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Search({ searchText, setSearchtext, set }) {
  const handlesearchtext = (e) => {
    setSearchtext(e.target.value);
  };
  const handleerasetext = (e) => {
    setSearchtext("");
  };
  return (
    <Box
      sx={{
        padding: "12px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        borderBottom: set === true ? "1px solid #e9edef" : "none",
      }}
    >
      <div className="searchbar">
        <SearchIcon
          sx={{
            color: "#54656f !important",
            fontSize: "19px",
            cursor: "pointer",
            display: searchText === "" ? "block" : "none",
          }}
          className="start-icon1"
        />
        <ArrowBackIcon
          sx={{
            color: "#54656f !important",
            fontSize: "19px",
            cursor: "pointer",
            display: searchText === "" ? "none" : "block",
          }}
          className="start-icon2"
          onClick={handleerasetext}
        />
        <input
          type="text"
          placeholder="Search or start new chat"
          className="searchbarinput"
          value={searchText}
          onChange={handlesearchtext}
        />
        <CloseIcon
          sx={{
            color: "#54656f !important",
            fontSize: "19px",
            cursor: "pointer",
            visibility: searchText === "" ? "hidden" : "visible",
          }}
          onClick={handleerasetext}
          className="end-icon"
        />
      </div>
    </Box>
  );
}
