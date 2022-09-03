export const CustomReducer = (state, action) => {
  switch (action.type) {
    case "waec-checker":
      return {
        ...state,
        waecCheckerPayload: action.payload,
      };

    default:
      return state;
  }
};
