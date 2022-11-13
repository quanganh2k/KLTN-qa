import { createContext, useEffect, useReducer, useState } from "react";
import { shoeReducer } from "../reducers/shoeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const ShoeContext = createContext();

const ShoeContextProvider = ({ children }) => {
  // State
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [shoeState, dispatch] = useReducer(shoeReducer, {
    shoes: [],
    shoe: null,
  });
  console.log("__shoeStae",shoeState)

  const [showAddShoeModal, setShowAddShoeModal] = useState(false);
  const [showUpdateShoeModal, setShowUpdateShoeModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const getAllShoes = async (page, search, price) => {
    try {
      if (search) {
        const response = await axios.get(
          `${apiUrl}/shoe/search?name=${search}&page=${page}&limit=9`
        );
        if (response.data.success) {
          dispatch({
            type: "SHOES_LOADED_SUCCESS",
            payload: response.data.shoes,
          });
        }
      } else if (price) {
        const response = await axios.get(
          `${apiUrl}/shoe/search?price=${price}&page=${page}&limit=9`
        );
        if (response.data.success) {
          dispatch({
            type: "SHOES_LOADED_SUCCESS",
            payload: response.data.shoes,
          });
        }
      } else {
        const response = await axios.get(`${apiUrl}/shoe?page=${page}&limit=9`);
        if (response.data.success) {
          dispatch({
            type: "SHOES_LOADED_SUCCESS",
            payload: response.data.shoes,
          });
        }
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
        // dispatch({ type: "ADD_SHOE", payload: response.data.shoe });
        getAllShoes(page, search, price);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
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

  // const findShoe = async (id) => {
  //   const shoe = shoeState.shoes.results.find((item) => item._id === id);
  //   dispatch({ type: "FIND_SHOE", payload: shoe });
  // };
  // // Chỉnh sửa sản phẩm
  const updateShoe = async (id,infoUpdate) => {
    try {
      const response = await axios.put(
        `${apiUrl}/shoe/${id}`,
        infoUpdate
      );
      if (response.data.success) {
        getAllShoes(page, search, price);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // delete product
  const deleteShoe = async (listId, lengthListId) => {
    console.log(listId, lengthListId, "haotla");
    const queryDelete = listId?.reduce((prev, cur) => {
      return `${prev}&listId[]=${cur}`;
    }, "");
    try {
      const response = await axios.delete(
        `${apiUrl}/shoe/?${
          listId.length === lengthListId
            ? ""
            : queryDelete.slice(1, queryDelete.length)
        }`
      );
      if (response.data.success) {
        // dispatch({ type: "DELETE_SHOE", payload: listId });
        // getAllShoes();
        getAllShoes(page, search, price);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllShoes(page, search, price);
  }, [page, search, price]);

  const shoeContextData = {
    shoeState,
    getAllShoes,
    getProductDetails,
    showAddShoeModal,
    setShowAddShoeModal,
    addShoe,
    showToast,
    setShowToast,
    showUpdateShoeModal,
    // findShoe,
    updateShoe,
    deleteShoe,
    setShowUpdateShoeModal,
    setSearch,
    setPage,
    setPrice,
  };

  return (
    <ShoeContext.Provider value={shoeContextData}>
      {children}
    </ShoeContext.Provider>
  );
};

export default ShoeContextProvider;
