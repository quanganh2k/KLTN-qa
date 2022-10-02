import { createContext, useReducer, useState } from "react";
import { shoeReducer } from "../reducers/shoeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const ShoeContext = createContext();

const ShoeContextProvider = ({ children }) => {
  // State
  const [shoeState, dispatch] = useReducer(shoeReducer, {
    shoes: [],
  });

  // Get all products
  const getAllShoes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/shoe?page=2&limit=9`);
      if (response.data.success) {
        dispatch({
          type: "SHOES_LOADED_SUCCESS",
          payload: response.data.shoes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get product details
  const getProductDetails = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/shoe/${id}`);
      if (response.data.success) {
        dispatch({
          type: "PRODUCT_DETAILS_LOADED",
          payload: response.data.shoe,
        });
      }
    } catch (error) {}
  };

  const shoeContextData = { shoeState, getAllShoes, getProductDetails };

  return (
    <ShoeContext.Provider value={shoeContextData}>
      {children}
    </ShoeContext.Provider>
  );
};

export default ShoeContextProvider;
