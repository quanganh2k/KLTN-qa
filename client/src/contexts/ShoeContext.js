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

  const [showAddShoeModal, setShowAddShoeModal] = useState(false);
  const [showUpdateShoeModal, setShowUpdateShoeModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
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

  // add shoe
  const addShoe = async (newShoe) => {
    try {
      const response = await axios.post(`${apiUrl}/shoe`, newShoe);
      if (response.data.success) {
        dispatch({ type: "ADD_SHOE", payload: response.data.shoe });
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Lỗi server" };
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

  const shoeContextData = {
    shoeState,
    getAllShoes,
    getProductDetails,
    showAddShoeModal,
    setShowAddShoeModal,
    addShoe,
    showToast,
    setShowToast,
  };

  return (
    <ShoeContext.Provider value={shoeContextData}>
      {children}
    </ShoeContext.Provider>
  );
};

export default ShoeContextProvider;
