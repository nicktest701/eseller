import React from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";

function NavLinkItem({ to, title,icon }) {
  const linkStyle = ({ isActive }) => {
    return {
      textDecoration: "none",
      borderBottom: isActive ? "solid 2px green" : null,
      color: "#333",
    };
  };

  return (
    <ListItemButton>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <NavLink to={to} style={linkStyle}>
        {title}
      </NavLink>
    </ListItemButton>
  );
}

export default NavLinkItem;
