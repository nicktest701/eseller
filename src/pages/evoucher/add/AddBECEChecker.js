import React, { useState } from "react";
import { Box, FormLabel, Stack, TextField, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import Content from "../../../components/Content";
import SubHeader from "../../../components/SubHeader";
import TableList from "../../../components/TableList";

function AddBECEChecker() {
  const [excelData, setExcelData] = useState([]);
  const [dataPath, setDataPath] = useState("");

  const handleLoadExcelData = (e) => {
    e.preventDefault();

    var files = e.target.files[0];
    console.log(files);

    var reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 0 });
      setDataPath(files.name);
      setExcelData(dataParse);
    };
    reader.readAsBinaryString(files);
  };

  return (
    <section
      className="add-bece-checker-container"
      style={{ paddingBottom: "16px" }}
    >
      <SubHeader title="BECE Checker" />
      <Content style={{ padding: "8px" }}>
        <Typography variant="h4" sx={{ textAlign: "center", paddingBottom: 1 }}>
          Checker Information
        </Typography>
        <Typography
          variant="body2"
          sx={{ paddingBottom: 3, textAlign: "center", color: "#5F6368" }}
        >
          Load your excel file whhich contains your bece results checker here
        </Typography>
        <Box
          sx={{
            border: "1px solid lightgray",
            borderRadius: 2,
            padding: 2,
            marginBottom: 4,
          }}
        >
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
              accept=".xlsx,.xls"
              onChange={handleLoadExcelData}
            />
          </Stack>
        </Box>
        {/* Preview */}
        <Box
          sx={{ border: "1px solid lightgray", borderRadius: 2, padding: 2 }}
        >
          <Typography>Preview</Typography>
          <TableList data={excelData} />
        </Box>
      </Content>
    </section>
  );
}

export default AddBECEChecker;
