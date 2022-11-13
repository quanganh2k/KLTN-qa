export const feedbackReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FEEDBACKS_LOADED_SUCCESS":
      return {
        ...state,
        feedbacks: payload,
      };

    case "FEEDBACK_LOADED":
      return {
        ...state,
        fb: payload,
      };

    default:
      return state;
  }
};
