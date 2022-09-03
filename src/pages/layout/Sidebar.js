import React from "react";
import Drawer from "@mui/material/Drawer";

import { Box, Divider, IconButton, List, ListSubheader } from "@mui/material";
import PropTypes from "prop-types";
import { Close } from "@mui/icons-material";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import NavLinkItem from "../../components/NavLinkItem";
import NavLinkItemCollapse from "../../components/modals/NavLinkItemCollapse";

function Sidebar({ openSidebar, setOpenSidebar }) {
  return (
    <div>
      <Drawer
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
      >
        <Box role="presentation" width="300px">
          <Box
            display="flex"
            justifyContent="flex-end"
            width={270}
            height={50}
            paddingRight={2}
          >
            <IconButton edge="end">
              <Close />
            </IconButton>
            {/* <Avatar />

            <Typography>Frebby Tech Consults</Typography> */}
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
    </div>
  );
}

export default Sidebar;

Sidebar.proptype = {
  openSidebar: PropTypes.bool,
  setOpenSidebar: PropTypes.func,
};
