import React from "react";
import {
  AppBar,
  Container,
  Select,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_DURATION } from "../redux/types/repoType";
import logo from "../assets/logo.svg";

const Header = () => {
  const { duration } = useSelector((state) => state.repos);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch({
      type: CHANGE_DURATION,
      payload: e.target.value
    });
  };

  return (
    <AppBar
      color="transparent"
      position="static"
      elevation={0}
      variant="outlined"
    >
      <Container>
        <Toolbar>
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", marginRight: "10px" }}
          />
          <Typography sx={{ flex: 1, fontWeight: "bold" }} variant="h6">
            Most Starred Repos
          </Typography>

          <Select
            value={duration}
            onChange={handleChange}
            sx={{
              width: 120,
              height: 40,
              marginLeft: 15
            }}
          >
            <MenuItem value={7}>1 Week</MenuItem>
            <MenuItem value={14}>2 Week</MenuItem>
            <MenuItem value={30}>1 Month</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
