import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardGiftcardRounded, CardTravel, Home } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

function BottomNav() {
  const navigate = useNavigate();
  const [bot, setBot] = useState(0);

  const handleNavigate = (path) => navigate(path, { replace: true });

  window.onscroll = function () {
    const rootHeight = document.getElementById("root").scrollHeight;
    const scrollHeight = document.documentElement.clientHeight + window.scrollY;
    if (scrollHeight >= rootHeight - 5) {
      setBot(80);
    } else {
      setBot(0);
    }
  };
  const [value, setValue] = React.useState(0);
  return (
    <Paper
      sx={{
        display: { xs: "block", sm: "none" },
        position: "fixed",
        bottom: bot,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          onClick={() => handleNavigate("/")}
        />
        <BottomNavigationAction
          sx={{ whiteSpace: "nowrap" }}
          label="E-Voucher"
          icon={
            <CardGiftcardRounded onClick={() => handleNavigate("evoucher")} />
          }
        />
        <BottomNavigationAction
          label="Prepaid Units"
          sx={{ whiteSpace: "nowrap" }}
          icon={<CardTravel onClick={() => handleNavigate("prepaid")} />}
        />
        <BottomNavigationAction
          label="Airtime"
          icon={<CardTravel />}
          onClick={() => handleNavigate("airtime")}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
