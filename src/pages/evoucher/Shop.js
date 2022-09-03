import { Grid, Box } from "@mui/material";

import { IMAGES } from "../../constants";
import security_service from "../../assets/images/security_service.webp";
import "../../styles/App.scss";
import ShopCard from "../../components/ShopCard";

import Content from "../../components/Content";
const shopArr = [
  {
    id: 1,
    title: "WAEC RESULTS CHECKERS",
    img: IMAGES.waec2,
    content: `Buy school placement check with ease with just a single click`,
    path: "bece-checker",
    state: {
      header: "WAEC RESULTS CHECKERS",
      link: "Waec Results Checker",
      menuItems: [
        {
          id: 1,
          name: "BECE(School)",
          value: "BECE",
        },
        {
          id: 2,
          name: "BECE(Private)",
          value: "BECE",
        },
        {
          id: 3,
          name: "WASSCE (School),WASSCE ",
          value: "WASSCE",
        },
        {
          id: 4,
          name: "WASSCE (Private)",
          value: "WASSCE",
        },
        {
          id: 5,
          name: " NOV-DEC",
          value: " NOV-DEC",
        },
        {
          id: 6,
          name: " NOV-DEC",
          value: "SSCE,ABCE,GBCE",
        },
      ],
    },
  },
  {
    id: 2,
    title: "SCHOOL PLACEMENT-CSSPS",
    img: IMAGES.ges,
    content: `Buy school placement check with ease with just a single click`,
    path: "school-placement",
  },

  {
    id: 3,
    title: "UNIVERSITY FORMS",
    img: IMAGES.university2,
    content: `Buy school placement check with ease with just a single click`,
    path: "university-form",
  },
  {
    id: 4,
    title: "SECURITY SERVICE FORMS",
    img: IMAGES.security_service,
    content: `Buy school placement check with ease with just a single click`,
    path: "security-service",
  },
  {
    id: 5,
    title: "CINEMA TICKETS",
    img: IMAGES.cinema_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "cinema-ticket",
  },
  {
    id: 6,
    title: "STADIUM TICKETS",
    img: IMAGES.stadia_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "stadia-ticket",
  },
];
function Shop() {
  return (
    <Box
      sx={{
        paddingY: 20,
        paddingX: 5,
        backgroundImage: ` linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(0, 0,0, 0.5)),
        url(${IMAGES.waec2}); `,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Content>
        <Grid container spacing={3}>
          {shopArr.map((shop) => {
            return (
              <Grid item sm={6} md={4} key={shop.id}>
                <ShopCard {...shop} />
              </Grid>
            );
          })}
        </Grid>
      </Content>
    </Box>
  );
}

export default Shop;
