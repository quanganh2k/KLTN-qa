import { createContext, useReducer, useState, useEffect } from "react";
import { categoryReducer } from "../reducers/categoryReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  //! State
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryState, dispatch] = useReducer(categoryReducer, {
    category: null,
    categories: [],
  });

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const getAllCategories = async (page, search) => {
    try {
      if (search) {
        const response = await axios.get(
          `${apiUrl}/category/search?name=${search}&page=${page}&limit=9`
        );
        if (response.data.success) {
          dispatch({
            type: "CATEGORIES_LOADED_SUCCESS",
            payload: response.data.categories,
          });
        }
      } else {
        const response = await axios.get(
          `${apiUrl}/category?page=${page}&limit=9`
        );
        if (response.data.success) {
          dispatch({
            type: "CATEGORIES_LOADED_SUCCESS",
            payload: response.data.categories,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add category
  const addCategory = async (newCategory) => {
    try {
      const response = await axios.post(`${apiUrl}/category`, newCategory);
      if (response.data.success) {
        getAllCategories(page, search);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`${apiUrl}/category/${categoryId}`);
      if (response.data.success) getAllCategories(page, search);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Find category when user is updating category
  const findCategory = (categoryId) => {
    const category = categoryState.categories.results.find(
      (category) => category._id === categoryId
    );
    dispatch({ type: "FIND_CATEGORY", payload: category });
  };

  // Update cateogry
  const updateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `${apiUrl}/category/${updatedCategory._id}`,
        updatedCategory
      );
      if (response.data.success) {
        getAllCategories(page, search);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  useEffect(() => {
    getAllCategories(page, search);
  }, [page, search]);

  const categoryContextData = {
    categoryState,
    getAllCategories,
    showAddCategoryModal,
    setShowAddCategoryModal,
    addCategory,
    showToast,
    setShowToast,
    showUpdateCategoryModal,
    findCategory,
    updateCategory,
    deleteCategory,
    setShowUpdateCategoryModal,
    setPage,
    setSearch,
  };

  return (
    <CategoryContext.Provider value={categoryContextData}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
