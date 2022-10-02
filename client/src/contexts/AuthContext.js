import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const localState = JSON.parse(localStorage.getItem("authState"));

  const [authState, dispatch] = useReducer(
    authReducer,
    localState || {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    }
  );

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        if (response.data.user.role === 1) {
          dispatch({
            type: "SET_AUTH",
            payload: {
              isAuthenticated: true,
              isAdmin: true,
              user: response.data.user,
            },
          });
        } else {
          dispatch({
            type: "SET_AUTH",
            payload: {
              isAuthenticated: true,
              isAdmin: false,
              user: response.data.user,
            },
          });
        }
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, isAdmin: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else
        return {
          success: false,
          message: error.message,
        };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else
        return {
          success: false,
          message: error.message,
        };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    localStorage.removeItem("authState");
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, isAdmin: false, user: null },
    });
  };

  // Context data
  const authContextData = { loginUser, registerUser, authState, logoutUser };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
