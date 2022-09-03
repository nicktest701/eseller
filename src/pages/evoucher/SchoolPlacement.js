import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Button,
  Avatar,
  Divider,
  Breadcrumbs,
} from "@mui/material";
import logo from "../../assets/images/waec.jpg";
// import logo2 from "../../assets/images/waec2.jpg";
import WaecCheckerPayment from "../../components/modals/WaecCheckerPayment";
import { COLORS } from "../../constants";
function SchoolPlacement() {
  const [openWaec, setOpenWaec] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={
            {
              // background: "linear-gradient(to top right,#333,green)",
              // color: "#fff",
            }
          }
          width={"100%"}
          height={60}
          spacing={2}
          direction="row"
          alignItems="center"
          padding={2}
        >
          <Avatar src={logo} sx={{ width: 30, height: 30 }} />
          <Typography sx={{ fontSize: { xs: 18, md: 24 } }}>
            SCHOOL PLACEMENT E-VOUCHER
          </Typography>
          <Divider />
        </Stack>
        <Box
          sx={{
            width: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 2,
            backgroundColor: "whitesmoke",
          }}
        >
          <Breadcrumbs>
            <Typography variant="body2">
              <Link to="/"> Home</Link>
            </Typography>
            <Typography variant="body2">
              <Link to="/evoucher">Evoucher</Link>
            </Typography>
            <Typography variant="body2">BECE Checker</Typography>
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // background: `linear-gradient(to top right,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(${logo2})`,
            // backgroundSize: "cover",
            // filter: "blur(3px)",
          }}
        ></Box>
        <Paper
          elevation={1}
          sx={{
            position: "absolute",
            width: { xs: 280, md: 350 },
            padding: 3,
            borderTop: "2px solid green",
            marginLeft: "auto",
            marginRight: "auto",
            top: 250,
            left: 0,
            right: 0,
          }}
        >
          <Stack spacing={4}>
            <TextField
              size="small"
              type="number"
              variant="outlined"
              placeholder="Enter Quantity"
              label="Quantity"
              InputProps={{
                inputProps: { min: 1, max: 1000, maxLength: 4 },
              }}
              InputLabelProps={{
                style: {
                  color: COLORS.secondary,
                },
              }}
              // onInput={(e) => {
              //   e.target.value = Math.max(0, parseInt(e.target.value))
              //     .toString()
              //     .slice(1, 4);
              // }}
              required
              fullWidth
            />
            <TextField
              size="small"
              variant="outlined"
              placeholder="Amount"
              label="Amount"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">GH¢</InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">p</InputAdornment>,
                readOnly: true,
              }}
              InputLabelProps={{
                style: {
                  color: COLORS.secondary,
                },
              }}
            />
            <TextField
              size="small"
              type="email"
              variant="outlined"
              placeholder="Enter Email Address here"
              label="Email Address"
              required
              InputLabelProps={{
                style: {
                  color: COLORS.secondary,
                },
              }}
            />

            <TextField
              size="small"
              type="tel"
              variant="outlined"
              placeholder="Enter Phone Number"
              label="Phone Number"
              required
              InputLabelProps={{
                style: {
                  color: COLORS.secondary,
                },
              }}
            />
            <Stack spacing={3} paddingY={2}>
              <Button
                variant="contained"
                disableElevation
                disableRipple
                size="large"
                sx={{ paddingX: 5 }}
                onClick={() => setOpenWaec(true)}
              >
                Buy
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>

      <WaecCheckerPayment open={openWaec} setOpen={setOpenWaec} />
    </>
  );
}

export default SchoolPlacement;
