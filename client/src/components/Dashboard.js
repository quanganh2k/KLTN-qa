import React, { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const Dashboard = () => {
  const {
    authState: { isAuthenticated, isAdmin },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } else {
      if (isAdmin === false) {
        navigate("/cart");
      }
    }
  }, [isAdmin, isAuthenticated]);

  return (
    <>
      <Header />
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
