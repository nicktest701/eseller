import React, { useState } from "react";
import { ListItemButton, ListItemIcon, Collapse, List } from "@mui/material";
import { NavLink } from "react-router-dom";
import NavLinkItem from "../NavLinkItem";
import {
  AirplaneTicket,
  ExpandLess,
  ExpandMore,
  GasMeter,
} from "@mui/icons-material";

function NavLinkItemCollapse({ to, title, icon }) {
  const [open, setOpen] = useState(false);
  // const location = useLocation();

  const handleCollapse = () => {
    setOpen(!open);
  };

  const linkStyle = ({ isActive }) => {
    return {
      textDecoration: "none",
      borderBottom: isActive ? "solid 2px green" : null,
      color: "#333",
    };
  };

  return (
    <>
      <ListItemButton onClick={handleCollapse}>
        <ListItemIcon>
          <AirplaneTicket />
        </ListItemIcon>

        <NavLink to="add" style={linkStyle}>
          Load Checker & E-Vouchers
        </NavLink>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
          <NavLinkItem
            to="/add/add-waec-checker"
            title="WAEC Checker"
            type="waec"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/add/add-university-forms"
            title="University Forms"
            type="university"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/add/add-security-service"
            title="Security Service"
            type="security"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/add/add-cinema-tickets"
            title="Cinema Tickets"
            type="cinema"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/add/add-stadia-tickets"
            title="Stadium Tickets"
            type="stadium"
            icon={<GasMeter />}
          />
        </List>
      </Collapse>
    </>
  );
}

export default NavLinkItemCollapse;
