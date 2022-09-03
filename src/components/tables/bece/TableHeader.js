import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

function TableHeader() {
  return (
    <Box sx={{ width: "inherit", paddingBottom: 2 }}>
      <Stack
        direction="row"
        spacing={2}
        width="inherit"
        justifyContent="space-around"
      >
        <Typography variant="body2">ID</Typography>
        <Typography variant="body2">Serial No.</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2">Pin Code</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2">Action</Typography>
      </Stack>
    </Box>
  );
}

export default TableHeader;
