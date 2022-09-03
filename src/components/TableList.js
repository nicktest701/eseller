import { Box, Stack } from "@mui/material";
import React from "react";
import BECETableBody from "./tables/bece/BECETableBody";
import TableHeader from "./tables/bece/TableHeader";

function TableList({ data }) {
  return (
    <Box>
      <TableHeader />
      <BECETableBody data={data} />
    </Box>
  );
}

export default TableList;
