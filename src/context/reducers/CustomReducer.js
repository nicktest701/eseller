export const CustomReducer = (state, action) => {
  switch (action.type) {
    case "openSidebar":
      return {
        ...state,
        openSidebar: action.payload,
      };
    case "openPreviewChecker":
      return {
        ...state,
        openPreviewChecker: action.payload,
      };

    case "getVoucherPaymentDetails":
      return {
        ...state,
        voucherPaymentDetails: action.payload,
      };

    case "loadedChecker":
      return {
        ...state,
        loadedChecker: {
          meta: action.payload.meta,
          data: action.payload.data,
        },
      };
    case "newCheckers":
      return {
        ...state,
        newCheckers: action.payload,
      };

    case "openAddCategory":
      return {
        ...state,
        category: {
          ...state.category,
          open: action.payload,
        },
      };

    case "categoryType":
      return {
        ...state,
        category: {
          ...state.category,
          category: action.payload,
        },
      };

    case "loadVouchers":
      return {
        ...state,
        transaction: action.payload,
      };

    default:
      return state;
  }
};
