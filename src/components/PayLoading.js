import { Backdrop } from "@mui/material";
import React from "react";

function PayLoading() {
  return (
    <Backdrop open={true} sx={{ width: "100%", height: "100vh" }}>
      <div>PayLoading</div>
    </Backdrop>
  );
}

export default PayLoading;
