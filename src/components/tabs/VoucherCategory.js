import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import MaterialTable, { MTableToolbar } from "material-table";
import { useQuery } from "react-query";
import { tableIcons } from "../../config/tableIcons";

import { Add } from "@mui/icons-material";

import { CustomContext } from "../../context/providers/CustomProvider";
import { getAllVouchersCategory } from "../../api/categoryAPI";
import { voucherCategoryColumns } from "../../mocks/columns";

const VoucherCategory = (props) => {
  const modifiedCategoryColumns = voucherCategoryColumns.map((column) => {
    return { ...column };
  });

  const { customDispatch } = useContext(CustomContext);

  const category = localStorage.getItem("category");

  const categories = useQuery(
    ["category", category],
    () => getAllVouchersCategory(category),
    {
      enabled: !!category,
    }
  );

  const handleOpen = () => {
    customDispatch({ type: "openAddCategory", payload: true });
  };

  return (
    <Box
      sx={{
        paddingY: 5,
      }}
    >
      <MaterialTable
        title={props.category}
        icons={tableIcons}
        components={{
          Toolbar: (params) => {
            return (
              <>
                <Box display="flex" justifyContent="flex-end" paddingY={1}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpen}
                  >
                    New {props.category}
                  </Button>
                </Box>
                <MTableToolbar {...params} />
              </>
            );
          },
        }}
        columns={modifiedCategoryColumns}
        isLoading={categories.isLoading && categories.isFetching}
        data={categories?.data !== undefined ? categories?.data : []}
        options={{
          search: false,
          //   paging: false,
        }}
        style={{
          padding: "10px",
        }}
      />
    </Box>
  );
};

export default VoucherCategory;
