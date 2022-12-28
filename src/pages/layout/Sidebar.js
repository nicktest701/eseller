import React, { useContext, useEffect } from "react";
import Drawer from "@mui/material/Drawer";

import {
  Box,
  Divider,
  IconButton,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Close } from "@mui/icons-material";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import NavLinkItem from "../../components/NavLinkItem";
import NavLinkItemCollapse from "../../components/modals/NavLinkItemCollapse";
import { CustomContext } from "../../context/providers/CustomProvider";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const { customState, customDispatch } = useContext(CustomContext);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      customDispatch({
        type: "openSidebar",
        payload: false,
      });
    }
  }, [location, customDispatch]);

  const handleClose = () => {
    customDispatch({
      type: "openSidebar",
      payload: false,
    });
  };
  return (
    <Drawer
      // variant="permanent"
      anchor="left"
      open={customState.openSidebar}
      onClose={handleClose}
    >
      <Box role="presentation" width="300px">
        <Box
          display="flex"
          justifyContent="flex-end"
          width={270}
          height={50}
          paddingRight={2}
        >
          <IconButton edge="end" onClick={handleClose}>
            <Close />
          </IconButton>

          {/* <Typography>Frebby Tech Consults</Typography> */}
        </Box>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Shop
            </ListSubheader>
          }
        >
          <NavLinkItem to="/" title="Dashboard" icon={<GasMeterIcon />} />
          <Divider />
          <NavLinkItem
            to="evoucher"
            title="E-Voucher"
            icon={<GasMeterIcon />}
          />
          <Divider />
          <NavLinkItemCollapse />
          <Divider />
          {/* <NavLinkItemCollapse /> */}

          <NavLinkItem
            to="prepaid"
            title="Prepaid Units"
            icon={<GasMeterIcon />}
          />
          <NavLinkItem
            to="airtime"
            title=" Bulk Transfers"
            icon={<GasMeterIcon />}
          />

          <Divider />
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;

Sidebar.proptype = {
  openSidebar: PropTypes.bool,
  setOpenSidebar: PropTypes.func,
};
