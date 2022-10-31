import React, { useReducer } from "react";
import { CustomReducer } from "../reducers/CustomReducer";

export const CustomContext = React.createContext();
function CustomProvider({ children }) {
  const initialValues = {
    openSidebar: false,
    openPreviewChecker: false,
    waecCheckerPayload: {},
    loadedChecker: {
      meta: [],
      data: [],
    },
    newCheckers: [],

    category: {
      open: false,
      category: "",
    },
  };

  const [customState, customDispatch] = useReducer(
    CustomReducer,
    initialValues
  );
  return (
    <CustomContext.Provider value={{ customState, customDispatch }}>
      {children}
    </CustomContext.Provider>
  );
}

export default CustomProvider;
