import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import BECETableBodyItem from "./BECETableBodyItem";
import { ReactComponent as NOData } from "../../../assets/images/colored/no-data.svg";

function BECETableBody({ data }) {
  return (
    <Box
      sx={{
        width: "inherit",
        height: 300,
        maxHeight: 300,
        paddingY: 1,
        overflowY: "scroll",
      }}
    >
      {data === undefined || data.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" height="inherit">
          <NOData style={{ width: "80px" }} />
          <Typography variant="body2">No Data Available</Typography>
        </Stack>
      ) : (
        data?.map((excelData, index) => {
          return <BECETableBodyItem key={index} data={excelData} />;
        })
      )}
    </Box>
  );
}

export default BECETableBody;
