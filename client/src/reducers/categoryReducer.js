export const categoryReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CATEGORIES_LOADED_SUCCESS":
      return {
        ...state,
        categories: payload,
      };

    case "CATEGORIES_ALL_LOADED_SUCCESS":
      return {
        ...state,
        categories: payload,
      };

    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, payload],
      };

    case "FIND_CATEGORY":
      return { ...state, category: payload };

    case "UPDATE_CATEGORY":
      const newCategories = state.categories.map((category) =>
        category._id === payload._id ? payload : category
      );

      return {
        ...state,
        categories: newCategories,
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
      };

      return {
        ...state,
        categories: [...state.categories, payload],
      };

    default:
      return state;
  }
};
