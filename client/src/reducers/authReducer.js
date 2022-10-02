export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, isAdmin, user },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        isAuthenticated,
        isAdmin,
        user,
      };
    default:
      return state;
  }
};
