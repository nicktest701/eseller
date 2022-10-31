import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { DeleteSweepRounded } from "@mui/icons-material";
function BECETableBodyItem({ data }) {
  // console.log(data)
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        width="inherit"
        justifyContent="space-around"
        paddingBottom={1}
        alignItems="center"
        sx={{
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "rgba(211, 211, 211,0.3)",
            cursor: "pointer",
          },
        }}
      >
        <Typography variant="body2">{data?.__rowNum__ || data?.id}</Typography>
        <Typography variant="body2">{data.serial}</Typography>
        <Typography variant="body2">{data.pin}</Typography>
        <Button size="small" color="secondary" endIcon={<DeleteSweepRounded />}>
          Remove
        </Button>
      </Stack>

      <Divider
        orientation="horizontal"
        flexItem
        sx={{ marginX: 5, marginY: 1 }}
      />
    </>
  );
}

export default BECETableBodyItem;
