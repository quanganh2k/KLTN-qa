export const orderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ORDERS_LOADED_SUCCESS":
      return {
        ...state,
        orders: payload,
      };

    case "ORDER_DETAILS_LOADED":
      return {
        ...state,
        orderDetail: payload,
      };

    default:
      return state;
  }
};
