import React, { useContext, useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  FormLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import Content from "../../../components/Content";
import SubHeader from "../../../components/SubHeader";
import TableList from "../../../components/TableList";
import { LoadingButton } from "@mui/lab";
import { addBeceCard } from "../../../api/cardApi";
import PreviewChecker from "../../../components/modals/PreviewChecker";
import { CustomContext } from "../../../context/providers/CustomProvider";
import SubCaption from "../../../components/SubCaption";

function AddBECEChecker() {
  const { customState, customDispatch } = useContext(CustomContext);
  const [openPreviewChecker, setOpenPreviewChecker] = useState(false);

  const [dataPath, setDataPath] = useState("");
  const [dataType, setDataType] = useState("");
  const [alertErr, setAlertErr] = useState({
    severity: "",
    msg: "",
  });
  const [dataTypeErr, setDataTypeErr] = useState("");

  /// load excel data from excel file
  const handleLoadExcelData = async (e) => {
    if (dataType === "") {
      setDataTypeErr("Please select the type of data to load first!");
    } else {
      let files = e.target.files[0];

      //read excel files
      try {
        let reader = new FileReader();
        reader.onload = async function (e) {
          if (files.type === "text/csv") {
            const checker = await Papa.parse(e.target.result, {
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
      setOpenPreviewChecker(true);
    }
  };

  const handleSubmitPins = async () => {
    try {
      const data = await addBeceCard(customState.newCheckers);

      if (data === "Created") {
        setAlertErr({
          severity: "info",
          msg: "Your pins have been saved successfully!!!",
        });

        setDataType("");
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
    setDataType("");
    setDataPath("");
    customDispatch({ type: "newCheckers", payload: [] });
  };

  return (
    <section
      className="add-bece-checker-container"
      style={{ paddingBottom: "16px", position: "relative" }}
    >
      <SubHeader title="BECE Checker" to='/add' />
      {alertErr.msg && (
        <Alert
          severity={alertErr.severity}
          onClose={() => setAlertErr({ msg: "" })}
          sx={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
          }}
        >
          {alertErr.msg}
        </Alert>
      )}

      <Content style={{ padding: "8px" }}>
        <SubCaption
          caption="   Load Serials & Pincodes"
          note="   Load your excel file whhich contains your bece results checker here"
        />
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
              select
              placeholder="select data type"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              helperText={dataTypeErr}
              sx={{
                "& p": {
                  color: "#f00",
                },
              }}
            >
              <MenuItem value="bece">BECE</MenuItem>
              <MenuItem value="wasce-school">WASSCE (School)</MenuItem>
              <MenuItem value="wassce-private">WASSCE (Private)</MenuItem>
              <MenuItem value="nov-dec"> NOV-DEC</MenuItem>
              <MenuItem value="placement">CSSPS PLACEMENT</MenuItem>
              <MenuItem value="university">UNIVERISITY-FORMS</MenuItem>
              <MenuItem value="security">SECURITY-SERVICE-FORMS</MenuItem>
              <MenuItem value="cinema">CINEMA-TICKETS</MenuItem>
              <MenuItem value="stadium">STADIUM-TICKETS</MenuItem>
            </TextField>
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
        <Box
          sx={{ border: "1px solid lightgray", borderRadius: 2, padding: 2 }}
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
                <LoadingButton variant="contained" onClick={handleSubmitPins}>
                  Save Pins
                </LoadingButton>
              </ButtonGroup>
            )}
          </Box>
          <TableList />
        </Box>
      </Content>
      <PreviewChecker
        open={openPreviewChecker}
        setOpen={setOpenPreviewChecker}
      />
    </section>
  );
}

export default AddBECEChecker;
