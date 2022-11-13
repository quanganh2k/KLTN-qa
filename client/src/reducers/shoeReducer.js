export const shoeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SHOES_LOADED_SUCCESS":
      return {
        ...state,
        shoes:  payload,
      };

    case "PRODUCT_DETAILS_LOADED":
      return {
        ...state,
        shoes: payload,
      };

    case "ADD_SHOE":
      return {
        ...state,
        shoes: [...state.shoes, payload],
      };

    case "FIND_SHOE":
      return { ...state, shoe: payload };

    case "UPDATE_POST":
      const newShoes = state.shoes.map((shoe) =>
        shoe._id === payload._id ? payload : shoe
      );

      return {
        ...state,
        posts: newShoes,
      };

    default:
      return state;
  }
};
