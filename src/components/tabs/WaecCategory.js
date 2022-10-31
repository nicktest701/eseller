import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import MaterialTable, { MTableToolbar } from "material-table";
import { useQuery } from "react-query";
import { tableIcons } from "../../config/tableIcons";

import { Add } from "@mui/icons-material";

import { CustomContext } from "../../context/providers/CustomProvider";
import { getAllCategoriesByName } from "../../api/categoryAPI";

const WaecCategory = () => {
  const { customDispatch } = useContext(CustomContext);

  const category = localStorage.getItem("category");

  const categories = useQuery(
    ["category", category],
    () => getAllCategoriesByName(category),
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
        title="Checkers Information"
        icons={tableIcons}
        components={{
          Toolbar: (props) => {
            return (
              <>
                <Box display="flex" justifyContent="flex-end" paddingY={1}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpen}
                  >
                    New Category
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
            title: "Checker",
            field: "dataType",
          },
          {
            title: "Price",
            field: "price",
            type: "currency",
            currencySetting: {
              currencyCode: "GHS",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          },
          // {
          //   title: "Total",
          //   field: "total",
          //   type: "numeric",
          // },
          // {
          //   title: "Used",
          //   field: "used",
          //   type: "numeric",
          // },
          // {
          //   title: "Available",
          //   field: "available",
          //   type: "numeric",
          // },
        ]}
        isLoading={categories.isLoading && categories.isFetching}
        data={categories.data ? categories.data : []}
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

export default WaecCategory;
