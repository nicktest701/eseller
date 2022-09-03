import React from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
function SubHeader({ title }) {
  return (
    <Box paddingY={2}>
      <Box
        display="flex"
        alignItems="center"
        paddingLeft={4}
        margin="auto"
        maxWidth="1000px"
      >
        <IconButton sx={{ marginRight: 2 }}>
          <ArrowBackRounded />
        </IconButton>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Divider flexItem />
    </Box>
  );
}

export default SubHeader;
