import React, { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Test2 = () => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  
  return (<>
    <Header />
    <div>TEst2</div>
    </>)
};

export default Test2;
