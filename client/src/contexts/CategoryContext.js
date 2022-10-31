import { createContext, useReducer, useState } from "react";
import { categoryReducer } from "../reducers/categoryReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  //! State
  const [categoryState, dispatch] = useReducer(categoryReducer, {
    categories: [],
  });
  // Get all categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/category?page=1&limit=9`);
      if (response.data.success) {
        dispatch({
          type: "CATEGORIES_LOADED_SUCCESS",
          payload: response.data.categories,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categoryContextData = {
    categoryState,
    getAllCategories,
  };

  return (
    <CategoryContext.Provider value={categoryContextData}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
