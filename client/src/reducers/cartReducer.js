export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      if (
        state.cart.some((item) => {
          return (
            item._id === payload._id && item.sizeChoice === payload.sizeChoice
          );
        })
      ) {
        const cartProduct = state.cart.map((item) => {
          if (
            item._id === payload._id &&
            item.sizeChoice === payload.sizeChoice
          ) {
            return {
              ...item,
              quantity: item.quantity + payload.quantity,
            };
          }
          return {
            ...item,
          };
        });
        return {
          ...state,
          cart: cartProduct,
        };
      }

      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((el) => {
          return el._id !== payload.id || el.sizeChoice !== payload.sizeChoice;
        }),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === payload.id && item.sizeChoice === payload.sizeChoice
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === payload.id && item.sizeChoice === payload.sizeChoice
            ? {
                ...item,
                quantity: item.quantity !== 1 ? item.quantity - 1 : 1,
              }
            : item
        ),
      };

    default:
      return state;
  }
};
