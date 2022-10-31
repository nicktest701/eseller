import React, { useState, useMemo, useContext } from "react";
import {
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Button,
  Avatar,
  MenuItem,
  Breadcrumbs,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { object, string, number } from "yup";
import { Formik } from "formik";
//components
import WaecCheckerPayment from "../../components/modals/WaecCheckerPayment";
import { currencyFormatter, getCode, IMAGES } from "../../constants";
import { CustomContext } from "../../context/providers/CustomProvider";
import { useQuery } from "react-query";
import { getAllCategoriesByName } from "../../api/categoryAPI";

function BECEChecker() {
  const { customDispatch } = useContext(CustomContext);

  const { palette } = useTheme();
  const [checkerType, setCheckerType] = useState([]);
  const [openWaec, setOpenWaec] = useState(false);
  const [examsType, setExamsType] = useState("");
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [serviceProvider, setServiceProvider] = useState("");
  const [serviceProviderImage, setServiceProviderImage] = useState(null);

  const categoryType = useQuery(
    ["category"],
    () => getAllCategoriesByName("waec"),
    {
      select: (categories) => {
        return categories.map(({ dataType, price }) => {
          return {
            dataType,
            price,
          };
        });
      },
      onSuccess: (data) => {
        setCheckerType(data);
      },
    }
  );

  const handleExamsTypeChange = (e) => {
    setExamsType(e.target.value);
    setTotalAmount("");
    setPrice(0);
    setQuantity("");
  };

  const checkerPrice = useMemo(() => {
    let voucherPrice;
    if (checkerType !== undefined) {
      const item = checkerType.find((item) => item.dataType === examsType);
      setPrice(item === undefined ? 0 : item.price);
    }
    return voucherPrice;
  }, [examsType, checkerType]);

  const getServiceProviderImage = useMemo(() => {
    switch (serviceProvider) {
      case "mtn":
        setServiceProviderImage(IMAGES.mtn_money);
        return IMAGES.mtn_money;
      case "vodafone":
        setServiceProviderImage(IMAGES.vodafone_cash);
        return IMAGES.vodafone_cash;
      case "airteltigo":
        setServiceProviderImage(IMAGES.airtel_money);
        return IMAGES.airtel_money;

      default:
        return null;
    }
  }, [serviceProvider]);

  const handlePhoneNumberChange = (e) => {
    const { code, providerName } = getCode(e);
    setPhoneNumber(code);
    setServiceProvider(providerName);
  };

  const handleQuantity = (e) => {
    const qty = e.target.value;
    if (qty.trim().length === 0) {
      setQuantity("");
      setTotalAmount(0);
      return;
    }
    setQuantity(qty);
    if (qty <= 0) {
      return;
    }
    const totalAmount = Math.abs(parseFloat(qty * price));
    setTotalAmount(totalAmount);
  };
  // ^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$

  const validationSchema = object().shape({
    examsType: string().trim().required("Required*"),
    quantity: number()
      .required("Required*")
      .max(2000, "Max Quantity is 2000")
      .min(1, "Quantity should be 1 or more!"),
    totalAmount: number().required("Required"),
    email: string().required("Required*").email("Invalid email address"),
    phoneNumber: string()
      .trim()
      .required("Required*")
      .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  });

  const initialValues = {
    examsType,
    quantity,
    totalAmount,
    email,
    phoneNumber,
  };
  const onSubmit = async (values) => {
    values.serviceProvider = serviceProvider;
    values.serviceProviderImage = serviceProviderImage;
    // console.log(values);

    await customDispatch({ type: "waec-checker", payload: values });

    setOpenWaec(true);
  };

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
        <Box
          sx={{
            width: "inherit",
            padding: 2,
            backgroundColor: "whitesmoke",
          }}
        >
          <Breadcrumbs sx={{ paddingBottom: 2 }}>
            <Typography variant="body2">
              <Link to="/"> Home</Link>
            </Typography>
            <Typography variant="body2">
              <Link to="/evoucher">E-Voucher</Link>
            </Typography>
            <Typography variant="body2">WAEC Checker</Typography>
          </Breadcrumbs>

          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar src={IMAGES.waec1} sx={{ width: 30, height: 30 }} />
            <Typography variant="h6">WAEC Results E-Voucher</Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(to top right,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(${IMAGES.waec1})`,
            backgroundSize: "cover",
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
            textAlign: "center",
            top: 250,
            left: 0,
            right: 0,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            {({
              errors,
              values,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => {
              return (
                <Stack spacing={2}>
                  <TextField
                    size="small"
                    select
                    variant="outlined"
                    label="Exams Type"
                    required
                    fullWidth
                    error={Boolean(touched.examsType && errors.examsType)}
                    helperText={touched.examsType && errors.examsType}
                    value={examsType}
                    onChange={handleExamsTypeChange}
                  >
                    {categoryType.data &&
                      categoryType.data.map((item) => {
                        return (
                          <MenuItem key={item.dataType} value={item.dataType}>
                            {item.dataType}
                            {"---"}
                            {currencyFormatter(item.price)}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                  <>
                    <small>Price- {currencyFormatter(price)}</small>
                  </>
                  <TextField
                    size="small"
                    type="number"
                    variant="outlined"
                    label="Quantity"
                    InputProps={{
                      inputProps: { min: 1, max: 1000, maxLength: 4 },
                    }}
                    required
                    fullWidth
                    value={values.quantity}
                    onChange={handleQuantity}
                    error={Boolean(touched.quantity && errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Total Amount"
                    label="Total Amount"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">GH¢</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">p</InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    value={values.totalAmount}
                    onChange={handleChange("totalAmount")}
                    error={Boolean(touched.totalAmount && errors.totalAmount)}
                    helperText={touched.totalAmount && errors.totalAmount}
                  />
                  <TextField
                    size="small"
                    type="email"
                    variant="outlined"
                    label="Email Address"
                    required
                    value={values.email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    size="small"
                    type="tel"
                    variant="outlined"
                    label="Phone Number"
                    required
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Avatar
                            variant="square"
                            src={getServiceProviderImage}
                            sx={{ width: 25, height: 20, marginRight: 2 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Stack spacing={3} paddingY={2}>
                    <Button variant="contained" onClick={handleSubmit}>
                      Buy
                    </Button>
                  </Stack>
                </Stack>
              );
            }}
          </Formik>
        </Paper>
      </Box>

      <WaecCheckerPayment open={openWaec} setOpen={setOpenWaec} />
    </>
  );
}

export default BECEChecker;
