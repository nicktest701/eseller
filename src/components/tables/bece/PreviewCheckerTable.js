import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { CustomContext } from "../../../context/providers/CustomProvider";
import { allowedColumns } from "../../../constants";
import ProTypes from "prop-types";

function PreviewCheckerTable({ isMatch, setIsMatch }) {
  const { customState } = useContext(CustomContext);

  const [newColumn, setNewColumn] = useState([]);

  useEffect(() => {
    const capitalizeColumns = customState.loadedChecker.meta.map((column) =>
      column.toUpperCase()
    );

    setNewColumn(capitalizeColumns);

    const isTrue = allowedColumns.find((data) =>
      _.isEqual(data, capitalizeColumns)
    );

    setIsMatch(isTrue);
  }, [setIsMatch, customState.loadedChecker.meta]);

  const checker = customState.loadedChecker;
  return (
    <Box>
      {isMatch ? (
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {checker.meta !== undefined
                  ? checker.meta.map((item, index) => (
                      <TableCell key={index}>{item}</TableCell>
                    ))
                  : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {checker.meta.length === 0 && (
                <TableRow
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TableCell>
                    <CircularProgress variant="indeterminate" color="primary" />
                    Loading
                  </TableCell>
                </TableRow>
              )}

              {checker.data !== undefined
                ? checker.data.map((item, index) => (
                    <TableRow key={index}>
                      {checker.meta.map((col, index) => (
                        <TableCell key={index}>{item[col]}</TableCell>
                      ))}
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography>Invalid Columns.</Typography>
          <Typography sx={{ textDecoration: "underline" }}>
            Expected Columns
          </Typography>
          <Typography color="green">{allowedColumns[0].toString()}</Typography>
          <Typography color="green">{allowedColumns[2].toString()}</Typography>
          <Typography sx={{ textDecoration: "underline" }}>Found</Typography>
          <Typography color="red">{newColumn.toString()}</Typography>
        </Box>
      )}
    </Box>
  );
}

PreviewCheckerTable.prototype = {
  isMatch: ProTypes.bool.isRequired,
  setIsMatch: ProTypes.func,
};

export default React.memo(PreviewCheckerTable);
