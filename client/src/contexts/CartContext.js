import { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const cartfromlocalstorage = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: cartfromlocalstorage,
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState.cart));
  }, [cartState.cart]);

  const addCart = (product) => {
    console.log(product, "product");
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const removeFromCart = (id, sizeChoice) => {
    console.log("checkRemove", id, sizeChoice);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id, sizeChoice },
    });
  };

  const increaseQuantity = (id, sizeChoice) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id, sizeChoice } });
  };
  const decreaseQuantity = (id, sizeChoice) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id, sizeChoice } });
  };

  const cartContextData = {
    cartState,
    dispatch,
    addCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
