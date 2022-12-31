import { FacebookSharp } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import BottomNav from "./BottomNav";

function Footer() {
  return (
    <>
 <BottomNav/>
    <footer>
      <Typography variant="body2">
        Copyright &copy; frebbytech Consults | FrebbyTech Consults
      </Typography>
    </footer>
    </>
  );
}

export default Footer;
