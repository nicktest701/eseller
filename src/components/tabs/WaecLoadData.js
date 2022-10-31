import { Add } from "@mui/icons-material";
import { Box, Button, Chip, MenuItem, TextField } from "@mui/material";
import MaterialTable, { MTableToolbar } from "material-table";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllCategoriesByName } from "../../api/categoryAPI";
import { getVoucherByDataType } from "../../api/voucherAPI";
import { tableIcons } from "../../config/tableIcons";
import LoadChecker from "../modals/LoadChecker";

const WaecLoadData = () => {
  const category = localStorage.getItem("category");
  const [openLoadChecker, setOpenLoadChecker] = useState(false);
  const [checkerType, setCheckerType] = useState("");

  const handleChangeDatatype = (e) => {
    const data = e.target.value;
    setCheckerType(data);
    localStorage.setItem("dataType", data);
  };

  const categoryType = useQuery(
    ["category", category],
    () => getAllCategoriesByName(category),
    {
      enabled: !!category,
      select: (categories) => {
        return categories.map(({ dataType }) => dataType);
      },
    }
  );

  const dataType = useQuery(
    ["voucher", checkerType],
    () => getVoucherByDataType(checkerType),
    {
      enabled: !!checkerType,
    }
  );

  return (
    <Box
      sx={{
        paddingY: 5,
      }}
    >
      <MaterialTable
        title="Pins & Serials"
        icons={tableIcons}
        components={{
          Toolbar: (props) => {
            return (
              <>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                  paddingY={1}
                >
                  <TextField
                    select
                    placeholder="Select Checker Type"
                    label=" Checker Type"
                    size="small"
                    defaultValue={""}
                    value={checkerType || ""}
                    onChange={(e) => handleChangeDatatype(e)}
                    sx={{ width: 250 }}
                    helperText="Select category"
                  >
                    {categoryType.data.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenLoadChecker(true)}
                    disabled={checkerType === "" ? true : false}
                    size="sm"
                  >
                    Load Checkers
                  </Button>
                </Box>
                <MTableToolbar {...props} />
              </>
            );
          },
        }}
        columns={[
          {
            title: "#",
            field: "_id",
            hidden: true,
          },
          {
            title: "Pin",
            field: "pin",
          },
          {
            title: "Serial",
            field: "serial",
          },
          {
            title: "Voucher",
            field: "dataType",
          },
          {
            title: "Status",
            field: "active",
            render: (rowData) => (
              <Chip
                variant="filled"
                color={rowData.active ? "success" : "error"}
                size="small"
                label={rowData.active ? "Active" : "Used"}
              />
            ),
          },
        ]}
        data={dataType.data !== undefined ? dataType.data : []}
        options={{
          search: false,
        }}
        style={{
          padding: "10px",
        }}
      />

      <LoadChecker open={openLoadChecker} setOpen={setOpenLoadChecker} />
    </Box>
  );
};

export default WaecLoadData;
