import _ from "lodash";
import papaparse from "papaparse";
import React, { useState, useContext, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CustomContext } from "../../context/providers/CustomProvider";
import Content from "../Content";
import PreviewChecker from "./PreviewChecker";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import CheckerTable from "../tables/CheckerTable";
import { addVoucher } from "../../api/voucherAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoadChecker = ({ open, setOpen }) => {
  const data = localStorage.getItem("dataType");

  const { customState, customDispatch } = useContext(CustomContext);
  const [openPreviewChecker, setOpenPreviewChecker] = useState(false);

  const [dataPath, setDataPath] = useState("");
  const [dataType, setDataType] = useState("");
  const [alertErr, setAlertErr] = useState({
    severity: "",
    msg: "",
  });

  useEffect(() => {
    if (data) {
      setDataType(data);
    }
  }, [data]);

  /// load excel data from excel file
  const handleLoadExcelData = async (e) => {
    customDispatch({ type: "openPreviewChecker", payload: true });
    let files = e.target.files[0];

    //read excel files
    try {
      let reader = new FileReader();

      reader.onload = function (e) {
        if (files.type === "text/csv") {
          const checker = papaparse.parse(e.target.result, {
            header: true,
            transformHeader: true,
            skipEmptyLines: "greedy",
          });

          customDispatch({
            type: "loadedChecker",
            payload: {
              meta: checker.meta.fields,
              data: checker.data,
            },
          });
        }

        if (
          files.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const data = new Uint8Array(e.target.result);
          let readData = XLSX.read(data, { type: "array" });
          //work book
          const workBook = readData.SheetNames[0];
          const workSheet = readData.Sheets[workBook];
          /* Convert sheet to json*/
          const dataParse = XLSX.utils.sheet_to_json(workSheet, {
            header: 0,
          });

          customDispatch({
            type: "loadedChecker",
            payload: {
              meta: Object.keys(dataParse[0]),
              data: dataParse,
            },
          });
        }
      };

      files.type === "text/csv"
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      setDataPath(files.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitPins = async () => {
    try {
      const data = await addVoucher(customState.newCheckers);

      if (data === "Created") {
        setAlertErr({
          severity: "info",
          msg: "Your pins have been saved successfully!!!",
        });
        setDataPath("");
        customDispatch({ type: "newCheckers", payload: [] });
      }
    } catch (error) {
      setAlertErr({
        severity: "info",
        msg: error,
      });
    }
  };

  const handleCancelSubmitPins = () => {
    setDataPath("");
    customDispatch({ type: "newCheckers", payload: [] });
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Loading Pins & Serials</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box style={{ paddingBottom: "16px" }}>
          <Content style={{ padding: "8px" }}>
            <Box
              sx={{
                border: "1px solid lightgray",
                borderRadius: 2,
                padding: 2,
                marginBottom: 4,
              }}
            >
              <FormLabel htmlFor="bece">Type</FormLabel>
              <Stack spacing={2} paddingY={2}>
                <TextField
                  value={dataType}
                  onChange={(e) => setDataType(e.target.value)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
              <FormLabel htmlFor="bece">Excel File</FormLabel>
              <Stack direction="row" spacing={2} paddingY={2}>
                <TextField
                  id="bece"
                  placeholder="Load Data Here"
                  size="small"
                  value={dataPath}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <FormLabel
                  htmlFor="file"
                  sx={{
                    border: "1px solid green",
                    cursor: "pointer",
                    padding: "1px 15px",
                    paddingTop: "5px",
                    borderRadius: 1,
                  }}
                  title="Add Excel file"
                >
                  Browse
                </FormLabel>
                <input
                  type="file"
                  id="file"
                  hidden
                  accept=".xlsx,.xls,.csv"
                  onChange={handleLoadExcelData}
                />
              </Stack>
            </Box>
            {/* Preview */}
            {alertErr.msg && (
              <Alert
                severity={alertErr.severity}
                onClose={() => setAlertErr({ msg: "" })}
              >
                {alertErr.msg}
              </Alert>
            )}
            <Box
              sx={{
                border: "1px solid lightgray",
                borderRadius: 2,
                padding: 2,
                marginTop: 1,
              }}
            >
              <Stack direction="row" spacing={2} paddingY={2}>
                <Typography>Preview:</Typography>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "green",
                    fontWeight: "600",
                  }}
                >
                  {dataType} Serials & Pincodes
                </Typography>
              </Stack>
              <Box display="flex" justifyContent="flex-end" paddingY={2}>
                {customState.newCheckers?.length !== 0 && (
                  <ButtonGroup>
                    <Button variant="outlined" onClick={handleCancelSubmitPins}>
                      Cancel
                    </Button>
                    <LoadingButton
                      variant="contained"
                      onClick={handleSubmitPins}
                    >
                      Save Pins
                    </LoadingButton>
                  </ButtonGroup>
                )}
              </Box>

              <CheckerTable />
            </Box>
          </Content>
          <PreviewChecker
            open={openPreviewChecker}
            setOpen={setOpenPreviewChecker}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadChecker;
