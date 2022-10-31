export const sizeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SIZES_LOADED_SUCCESS":
      return {
        ...state,
        sizes: payload,
      };

      //   case "PRODUCT_DETAILS_LOADED":
      //     return {
      //       ...state,
      //       shoes: payload,
      //     };

      //   case "ADD_SHOE":
      return {
        ...state,
        shoes: [...state.shoes, payload],
      };

    default:
      return state;
  }
};
