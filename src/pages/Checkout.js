import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../assets/images/coat_of_arms.png";
import success from "../assets/images/success.png";

const CheckOutItem = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography color="primary" variant="body2" sx={{fontWeight:'700'}}>
        {title}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
};

function Checkout() {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Box
        sx={{
          minHeight: "60px",
          backgroundColor: "#333",
          padding: 4,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <IconButton edge="start">
          <Avatar src={logo} alt="logo.png" />
        </IconButton>
        <Typography>Frebby Tech Consults</Typography>
      </Box>
      <Container
        sx={{
          backgroundColor: "whitesmoke",
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            minHeight: 500,
            minWidth: { xs: 350, md: 700 },
            padding: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant='subtitle1'>
              Payment Succesful
            </Typography>
            <Avatar src={success} />
          </Box>
          <Divider />

          <Stack spacing={2} paddingTop={6} paddingBottom={4}>
            <CheckOutItem title="Invoice No." value="8739248739827" />
            <CheckOutItem title="Date" value="22/34/2033" />
            <CheckOutItem title="Payment Type." value="Mobile Money" />
            <CheckOutItem title="Agent" value="Mtn" />
            <CheckOutItem title="Mobile No." value="0248798798" />
            <CheckOutItem title="Email Address" value="Akwasi@gmail.com" />
            <CheckOutItem title="Transaction id" value="0248798798" />
          <Divider flexItem />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Button variant="contained" disableElevation>
              Print Voucher
            </Button>
          </Stack>
          <Button disableElevation href="evoucher">
            Go back
          </Button>
        </Box>
      </Container>
      <Box
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          padding: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Copyright &copy; frebbytech Consults || FrebbyTech Consults </p>
      </Box>
    </div>
  );
}

export default Checkout;
