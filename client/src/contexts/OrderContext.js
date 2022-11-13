import { createContext, useReducer, useState, useEffect } from "react";
import { orderReducer } from "../reducers/orderReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const  OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  //! State
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [orderState, dispatch] = useReducer(orderReducer, {
    order: null,
    orders: [],
    orderDetail: null,
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // get all orders
  const getAllOrders = async (page, search) => {
    try {
      if (search) {
        const response = await axios.get(
          `${apiUrl}/order/search?orderId=${search}&page=${page}&limit=9`
        );
        if (response.data.success) {
          dispatch({
            type: "ORDERS_LOADED_SUCCESS",
            payload: response.data.orders,
          });
        }
      } else {
        const response = await axios.get(
          `${apiUrl}/order?page=${page}&limit=9`
        );
        if (response.data.success) {
          dispatch({
            type: "ORDERS_LOADED_SUCCESS",
            payload: response.data.orders,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderDetails = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/order/${id}`);
      if (response.data.success) {
        dispatch({
          type: "ORDER_DETAILS_LOADED",
          payload: response.data.orderDetail,
        });
      }
    } catch (error) {}
  };

  // Update order
  const updateOrder = async (id, data) => {
    try {
      const response = await axios.put(`${apiUrl}/order/${id}`, data);
      if (response.data.success) {
        getAllOrders(page, search);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  useEffect(() => {
    getAllOrders(page, search);
  }, [page, search]);

  const orderContextData = {
    orderState,
    getAllOrders,
    getOrderDetails,
    showToast,
    setShowToast,

    updateOrder,

    setPage,
    setSearch,
  };

  return (
    <OrderContext.Provider value={orderContextData}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
