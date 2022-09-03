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

        <NavLink to="evoucher" style={linkStyle}>
          E-Vouchers
        </NavLink>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
          <NavLinkItem
            to="/evoucher/add-bece-checker"
            title="BECE Checker"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/evoucher/add-waec-checker"
            title="WAEC Checker"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/evoucher/add-school-placement"
            title="School Placement"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/evoucher/add-university-forms"
            title="University Forms"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/evoucher/add-security-service"
            title="Security Service"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/evoucher/add-cinema-tickets"
            title="Cinema Tickets"
            icon={<GasMeter />}
          />
          <NavLinkItem
            to="/evoucher/add-stadia-tickets"
            title="Stadium Tickets"
            icon={<GasMeter />}
          />
        </List>
      </Collapse>
    </>
  );
}

export default NavLinkItemCollapse;
