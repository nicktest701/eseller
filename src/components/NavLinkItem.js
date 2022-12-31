import React from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";

function NavLinkItem({ to, title, icon, type }) {
  const linkStyle = ({ isActive }) => {
    return {
      textDecoration: "none",
      borderBottom: isActive ? "solid 2px green" : null,
      color: "#333",
    };
  };

  const handleNavigate = () => {
    localStorage.setItem("category", type);

  };

  return (
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <NavLink to={to} style={linkStyle} onClick={handleNavigate}>
        {title}
      </NavLink>
    </ListItemButton>
  );
}

export default NavLinkItem;
