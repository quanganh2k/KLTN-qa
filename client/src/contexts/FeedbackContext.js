import { createContext, useReducer, useState, useEffect } from "react";
import {feedbackReducer} from '../reducers/feedbackReducer'
import { apiUrl } from "./constants";
import axios from "axios";

export const FeedbackContext = createContext();

const FeedbackContextProvider = ({ children }) => {
  //! State
 
  const [feedbackState, dispatch] = useReducer(feedbackReducer, {
    feedbacks: [],
    fb: [],
  });

  

  // get all fb
  const getAllFeedbacks = async (page) => {
    try {
      const response = await axios.get(`${apiUrl}/feedback?page=${page}&limit=9`)
      if (response.data.success) {
        dispatch({
          type: "FEEDBACKS_LOADED_SUCCESS",
          payload: response.data.feedback,
        });
      }
      }
     catch (error) {
      console.log(error);
    }
  };

  const getFeedbackByProduct = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/feedback/${id}`)
      if (response.data.success) {
        dispatch({
          type: "FEEDBACK_LOADED",
          payload: response.data.feedback,
        });
      }
      }
     catch (error) {
      console.log(error);
    }
  };


  // add fb
  const addFeedback = async (newFeedback,id) => {
    try {
      const response = await axios.post(`${apiUrl}/feedback`, newFeedback);
      if (response.data.success) {
        getFeedbackByProduct(id)
        getAllFeedbacks();
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  
  const feedbackContextData = {
    feedbackState,
    getAllFeedbacks,
    addFeedback,
    getFeedbackByProduct
  };

  return (
    <FeedbackContext.Provider value={feedbackContextData}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContextProvider;
