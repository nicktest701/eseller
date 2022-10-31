import React, { useContext, useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";
import { newCategory } from "../../api/categoryAPI";
import { CATEGORY } from "../../constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CheckerCategory = () => {
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const [autoCompleteLabel, setAutoCompleteLabel] = useState([]);
  const [autoOptions, setAutoOptions] = useState([]);
  const [dataType, setDataType] = useState("");

  useEffect(() => {
    if (localStorage.getItem("category")) {
      const category = localStorage.getItem("category");
      let cat = [];
      let autocompleteLabel = "Category here";
      switch (category) {
        case "waec":
          cat = CATEGORY.exams;
          autocompleteLabel = "Exams type";
          break;
        case "university":
          cat = CATEGORY.university;
          autocompleteLabel = "University";
          break;
        default:
          cat = [];
      }
      setAutoOptions(cat);
      setAutoCompleteLabel(autocompleteLabel);
    }
  }, []);

  const handleClose = () => {
    customDispatch({ type: "openAddCategory", payload: false });
  };

  const initialValues = {
    category: localStorage.getItem("category") || "",
    dataType,
    price: 0,
  };

  const { mutateAsync } = useMutation(newCategory);
  const onSubmit = (values, option) => {
    // console.log(values);
    mutateAsync(values, {
      onSettled: () => {
        option.setSubmitting(false);

        queryClient.invalidateQueries(["category"]);
      },
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <Dialog
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            open={customState.category.open}
            onClose={handleClose}
          >
            <DialogTitle>New Category</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                <Autocomplete
                  options={autoOptions}
                  freeSolo
                  noOptionsText="No option avaiable"
                  value={dataType || null}
                  onChange={(e, value) => setDataType(value)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label={autoCompleteLabel}
                      onChange={(e) => setDataType(e.target.value)}
                    />
                  )}
                />
                <TextField
                  type="number"
                  label="Price"
                  placeholder="Price here"
                  value={values.price}
                  onChange={handleChange("price")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>GHS</Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography>p</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ padding: 1 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton variant="contained" onClick={handleSubmit}>
                Add Category
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default React.memo(CheckerCategory);
