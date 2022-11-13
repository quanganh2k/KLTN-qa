import { createContext, useReducer, useState, useEffect } from "react";
import {sizeReducer} from '../reducers/sizeReducer'
import { apiUrl } from "./constants";
import axios from "axios";

export const SizeContext = createContext();

const SizeContextProvider = ({ children }) => {
  //! State
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sizeState, dispatch] = useReducer(sizeReducer, {
    size: null,
    sizes: [],
  });

  const [showAddSizeModal, setShowAddSizeModal] = useState(false);
  const [showUpdateSizeModal, setShowUpdateSizeModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // get all sizes
  const getAllSizes = async (page, search) => {
    try {
      if (search) {
        const response = await axios.get(
          `${apiUrl}/size/search?sizeNumber=${search}&page=${page}&limit=9`
        );
        if (response.data.success) {
          dispatch({
            type: "SIZES_LOADED_SUCCESS",
            payload: response.data.sizes,
          });
        }
      } else {
        const response = await axios.get(
          `${apiUrl}/size?page=${page}&limit=9`
        );
        if (response.data.success) {
          dispatch({
            type: "SIZES_LOADED_SUCCESS",
            payload: response.data.sizes,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add size
  const addSize = async (newSize) => {
    try {
      const response = await axios.post(`${apiUrl}/size`, newSize);
      if (response.data.success) {
        getAllSizes(page, search);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete size
  const deleteSize = async (sizeId) => {
    try {
      const response = await axios.delete(`${apiUrl}/size/${sizeId}`);
      if (response.data.success) {
        getAllSizes(page, search);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Find size when user is updating size
  const findSize = (sizeId) => {
    const size = sizeState.sizes.results.find((size) => size._id === sizeId);
    dispatch({ type: "FIND_SIZE", payload: size });
  };

  // Update size
  const updateSize = async (updatedSize) => {
    try {
      const response = await axios.put(
        `${apiUrl}/size/${updatedSize._id}`,
        updatedSize
      );
      if (response.data.success) {
        getAllSizes(page, search);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  useEffect(() => {
    getAllSizes(page, search);
  }, [page, search]);

  const sizeContextData = {
    sizeState,
    getAllSizes,
    showAddSizeModal,
    setShowAddSizeModal,
    addSize,
    showToast,
    setShowToast,
    showUpdateSizeModal,
    findSize,
    updateSize,
    deleteSize,
    setShowUpdateSizeModal,
    setPage,
    setSearch,
  };

  return (
    <SizeContext.Provider value={sizeContextData}>
      {children}
    </SizeContext.Provider>
  );
};

export default SizeContextProvider;
