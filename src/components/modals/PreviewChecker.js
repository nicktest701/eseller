import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CustomContext } from "../../context/providers/CustomProvider";
import PreviewCheckerTable from "../tables/bece/PreviewCheckerTable";
import PropTypes from "prop-types";

function PreviewChecker({ open, setOpen }) {
  const dataType = localStorage.getItem("dataType");
  const { customState, customDispatch } = useContext(CustomContext);
  const checker = customState.loadedChecker;
  const [isMatch, setIsMatch] = useState(false);

  const handleAddNewCheckers = () => {
    const newData = checker.data.map((data) => {
      return {
        ...data,
        dataType,
      };
    });

    customDispatch({ type: "newCheckers", payload: newData });
    customDispatch({ type: "openPreviewChecker", payload: false });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={customState.openPreviewChecker}>
      <DialogTitle>Data Preview</DialogTitle>
      <DialogContent>
        <PreviewCheckerTable isMatch={isMatch} setIsMatch={setIsMatch} />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleAddNewCheckers}
          disabled={isMatch ? false : true}
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
