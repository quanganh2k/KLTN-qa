export const shoeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SHOES_LOADED_SUCCESS":
      return {
        ...state,
        shoes: payload,
      };

    case "PRODUCT_DETAILS_LOADED":
      return {
        ...state,
        shoes: payload,
      };

    default:
      return state;
  }
};
