import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import _ from "lodash";
import { CustomContext } from "../../context/providers/CustomProvider";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { tableIcons } from "../../config/tableIcons";
import { allowedColumns } from "../../constants";

function PreviewChecker({ open, setOpen }) {
  const voucherData = JSON.parse(localStorage.getItem("@voucher_type"));
  const { customState, customDispatch } = useContext(CustomContext);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState({ severity: "", text: "" });

  const checker = customState.loadedChecker;

  useEffect(() => {
    
    setMsg({ text: "", severity: "" });
    setData([]);

    //auto capitalize data columns
    const capitalizeColumns = checker.meta.map((column) =>
      column.toUpperCase()
    );

    //Check if data columns matches preferred columns
    const itExists = allowedColumns.find((data) =>
      _.isEqual(data, capitalizeColumns)
    );

    if (_.isEmpty(itExists)) {
      setMsg({
        severity: "error",
        text: "The columns in the selected file does not match with Serials and Pins.Please try renaming your columns or choose an appropriate file",
      });
    } else {
      setData(checker.data);
    }
  }, [checker]);

  const handleAddNewCheckers = () => {
    const newData = checker.data.map((data) => {
      return {
        ...data,
        category: voucherData.id,
        voucher: voucherData.voucherType,
      };
    });

    // console.log(newData);

    customDispatch({ type: "newCheckers", payload: newData });
    customDispatch({ type: "openPreviewChecker", payload: false });
  };

  return (
    <Dialog maxWidth="md" fullWidth open={customState.openPreviewChecker}>
      <DialogContent sx={{ padding: 2 }}>
        {msg.text && <Alert severity={msg.severity}>{msg.text}</Alert>}
        <MaterialTable
          title="Serials & Pins Preview"
          icons={tableIcons}
          columns={[
            { title: "iD", field: "id", hidden: true },
            { title: "Serial", field: "serial" },
            { title: "Pin", field: "pin" },
          ]}
          data={data || []}
          options={{
            filtering: false,
            sorting: false,
            selection: false,
            grouping: false,
            search: false,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={data?.length === 0 ? true : false}
          variant="contained"
          onClick={handleAddNewCheckers}
        >
          Load Checkers
        </Button>
        <Button
          onClick={() =>
            customDispatch({ type: "openPreviewChecker", payload: false })
          }
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PreviewChecker.prototype = {
  isMatch: PropTypes.bool.isRequired,
  setIsMatch: PropTypes.func,
};

export default React.memo(PreviewChecker);
