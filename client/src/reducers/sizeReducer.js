export const sizeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SIZES_LOADED_SUCCESS":
      return {
        ...state,
        sizes: payload,
      };

    case "SIZES_ALL_LOADED_SUCCESS":
      return {
        ...state,
        sizes: payload,
      };

    case "ADD_SIZE":
      return {
        ...state,
        sizes: [...state.sizes, payload],
      };

    case "FIND_SIZE":
      return { ...state, size: payload };

    case "UPDATE_SIZE":
      const newSizes = state.sizes.map((size) =>
        size._id === payload._id ? payload : size
      );

      return {
        ...state,
        sizes: newSizes,
      };

    case "DELETE_SIZE":
      return {
        ...state,
        sizes: state.sizes.filter(
          (size) => size._id !== payload
        ),
      };

      return {
        ...state,
        sizes: [...state.sizes, payload],
      };

    default:
      return state;
  }
};
