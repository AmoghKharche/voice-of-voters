import React, { useState, useContext } from "react";
import Logo from "../assets/Logo.jpg";
import { UserContext } from "../App";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <a href="/">Home</a>
          <a href="/announcements">Announcements</a>
          <a href="/register-complaint">Register Complaint</a>
          <a href="/track-complaint">Track Complaint</a>
          <a href="/logout">Logout</a>
        </>
      );
    } else {
      return (
        <>
          <a href="/">Home</a>
          <a href="/announcements">Announcements</a>
          <a href="/register-complaint">Register Complaint</a>
          <a href="/track-complaint">Track Complaint</a>
          <a href="/login">Login</a>
        </>
      );
    }
  };
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Announcements",
      href: "/announcements",
    },

    {
      text: "Register Complaint",
      href: "/register-complaint",
    },
    {
      text: "Track Complaint",
      href: "/track-complaint",
    },
  ];
  return (
    <nav>
      {
        <div className="nav-logo-container">
          <a href="/">
            <img src={Logo} alt="" />
          </a>
        </div>
      }
      <div className="navbar-links-container">
        <RenderMenu />
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
