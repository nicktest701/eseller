import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

function ShopCard({ title, img, content, path }) {
  const cardStyles = () => {
    return {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderTop: "solid 2px #008000",
      paddingY: 2,
      transition: "all 250ms ease-in-out",
      "&:hover": {
        transform: "scale(1.04)",
      },
    };
  };
  return (
    <Card sx={cardStyles()}>
      <CardHeader
        title={title}
        sx={{ textAlign: "center", fontSize: 16 }}
        component="h6"
      />
      <Avatar
        variant="square"
        src={img}
        alt="imag"
        sx={{ width: 80, height: 80 }}
      />
      <CardContent>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
      <CardActions>
        <Link className="button-link" to={path}>
          Proceed to buy
        </Link>
      </CardActions>
    </Card>
  );
}

export default ShopCard;
