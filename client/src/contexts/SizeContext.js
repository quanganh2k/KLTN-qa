import { createContext, useReducer, useState } from "react";
import { sizeReducer } from "../reducers/sizeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const SizeContext = createContext();

const SizeContextProvider = ({ children }) => {
  //! State
  const [sizeState, dispatch] = useReducer(sizeReducer, {
    sizes: [],
  });

  // Get all products
  const getAllSizes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/size?page=1&limit=9`);
      if (response.data.success) {
        dispatch({
          type: "SIZES_LOADED_SUCCESS",
          payload: response.data.sizes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sizeContextData = {
    sizeState,
    getAllSizes,
  };

  
  return (
    <SizeContext.Provider value={sizeContextData}>
      {children}
    </SizeContext.Provider>
  );
};

export default SizeContextProvider;
