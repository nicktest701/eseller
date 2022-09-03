import "../styles/App.scss";
import { Box, Grid, Typography } from "@mui/material";
import ShopCard from "./ShopCard";
import { IMAGES } from "../constants";
import Content from "./Content";

const homeCardArr = [
  {
    id: 1,
    title: "E-VOUCHERS & PINCODES",
    img: IMAGES.ges,
    content: `Buy
    BECE results checker
    SSCE, WASSCE, WASSCE NOVDEC, ABCE checker`,
    path: "evoucher",
  },
  {
    id: 2,
    title: "PREPAID UNITS",
    img: IMAGES.ecg,
    content: `Buy
    BECE results checker
    SSCE, WASSCE, WASSCE NOVDEC, ABCE checker`,
    path: "prepaid",
  },
  {
    id: 3,
    title: "BULK AIRTIMES & EVD's",
    img: IMAGES.airtime,
    content: `Buy
    BECE results checker
    SSCE, WASSCE, WASSCE NOVDEC, ABCE checker`,
    path: "airtime",
  },
];

function HomeCards() {
  return (
    <Content>
      <Box
        sx={{
          paddingY: 10,
          paddingX: 5,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            paddingBottom: 5,
          }}
        >
          Our Services
        </Typography>

        <Grid container spacing={3}>
          {homeCardArr.map((home) => {
            return (
              <Grid item sm={6} md={4} key={home.id}>
                <ShopCard {...home} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Content>
  );
}

export default HomeCards;
