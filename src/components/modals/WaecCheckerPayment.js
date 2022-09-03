import React, { useContext } from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Box, DialogContent, IconButton, Stack } from "@mui/material";
import Slide from "@mui/material/Slide";
import { LoadingButton } from "@mui/lab";
import { CloseSharp } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { CustomContext } from "../../context/providers/CustomProvider";
import { makePayment } from "../../api/momoApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function WaecCheckerPayment({ open, setOpen }) {
  const { customState } = useContext(CustomContext);

  const payload = customState.waecCheckerPayload;

  const paymentMutate = useMutation(makePayment);
  const handlePayment = () => {
    paymentMutate.mutateAsync(payload, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };

  const PlaceholderItem = ({ title, value }) => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            fontWeight="bold"
            sx={{ fontSize: 14, color: "primary.main" }}
          >
            {title}
          </Typography>
          <Typography variant="body2">{value}</Typography>
        </Box>
      </>
    );
  };

  return (
    <Dialog
      keepMounted
      TransitionComponent={Transition}
      // onClose={() => setOpen(false)}
      open={open}
    >
      <IconButton
        sx={{ alignSelf: "end", marginTop: 1 }}
        onClick={() => setOpen(false)}
      >
        <CloseSharp />
      </IconButton>
      <DialogTitle sx={{ textAlign: "center" }}>Payment Details</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          {payload?.examsType} RESULTS CHECKER
        </Typography>
        <Box sx={{ width: 250, padding: 2 }}>
          <Stack spacing={1} paddingBottom={6}>
            <PlaceholderItem title="Quantity" value={payload?.quantity} />
            <PlaceholderItem
              title="Total"
              value={`GHS ${parseFloat(payload?.totalAmount).toFixed(2)}`}
            />
            <Avatar
              src={payload.serviceProviderImage}
              variant="square"
              sx={{ width: 80, height: 40, marginY: 4, alignSelf: "center" }}
            />

            <PlaceholderItem title="Email" value={payload?.email} />
            <PlaceholderItem
              title="Phone Number"
              value={payload?.phoneNumber}
            />
          </Stack>
          <LoadingButton variant="contained" onClick={handlePayment} fullWidth>
            Proceed to buy
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

WaecCheckerPayment.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
};

export default React.memo(WaecCheckerPayment);
