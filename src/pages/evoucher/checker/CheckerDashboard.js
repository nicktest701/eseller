import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Box,
  useTheme,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CheckerCard from "../../../components/CheckerCard";
import MaterialTable from "material-table";
import { tableIcons } from "../../../config/tableIcons";

const checkerData = [
  {
    id: 1,
    checker: "BECE",
    total: 12455,
    used: 1200,
    available: 344,
  },
  {
    id: 2,
    checker: "WASSCE",
    total: 5000,
    used: 876,
    available: 4568,
  },
  {
    id: 3,
    checker: "Placement",
    total: 111,
    used: 56,
    available: 98,
  },
  {
    id: 4,
    checker: "Placement",
    total: 111,
    used: 56,
    available: 98,
  },
  {
    id: 5,
    checker: "Placement",
    total: 111,
    used: 56,
    available: 98,
  },
  {
    id: 6,
    checker: "Placement",
    total: 111,
    used: 56,
    available: 98,
  },
  {
    id: 7,
    checker: "Placement",
    total: 111,
    used: 56,
    available: 98,
  },
  {
    id: 8,
    checker: "Placement",
    total: 111,
    used: 56,
    available: 98,
  },
];

const CheckerDashboard = (props) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: palette.secondary.main,
        color: "#fff",
      }}
    >
      <Box
        sx={{
          paddingY: 5,
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Stack>
              <Typography variant="h4">Checkers & PinCodes</Typography>
              <Typography variant="body2">
                Access and Manage all your serials and pincodes here
              </Typography>
            </Stack>
          </Box>
          <Divider flexItem />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              aligItems: "center",
              flexWrap: "wrap",
              gap: 2,
              paddingY: 5,
            }}
          >
            <CheckerCard />
            <CheckerCard />
            <CheckerCard />
            <CheckerCard />
            <CheckerCard />
            <CheckerCard />
            <CheckerCard />
            <CheckerCard />
            <CheckerCard />
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          paddingY: 5,
        }}
      >
        <Container>
          <MaterialTable
            title="Checkers Information"
            icons={tableIcons}
            columns={[
              {
                title: "#",
                field: "id",
              },
              {
                title: "Checker",
                field: "checker",
              },
              {
                title: "Price",
                field: "price",
              },
              {
                title: "Total",
                field: "total",
                type: "numeric",
              },
              {
                title: "Used",
                field: "used",
                type: "numeric",
              },
              {
                title: "Available",
                field: "available",
                type: "numeric",
              },
            ]}
            data={checkerData}
            options={{
              search: false,
              //   paging: false,
            }}
            style={{
              padding: 2,
            }}
          />
        </Container>
      </Box>
      {/* <CheckerCategory/> */}
    </Box>
  );
};

CheckerDashboard.propTypes = {};

export default CheckerDashboard;
