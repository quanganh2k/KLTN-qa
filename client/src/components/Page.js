import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AuthContextProvider from "../contexts/AuthContext";
import Cart from "./Cart";
import Test from "./Test";
import Test2 from "./Test2";
import Register from "./Register";
import HomePage from "./HomePage";
import ShoeContextProvider from "../contexts/ShoeContext";
import ProductDetails from './ProductDetails';

const Page = () => {
  return (
    <AuthContextProvider>
      <ShoeContextProvider>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/test" element={<Test />} />

          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/test2" element={<Test2 />} />
         
          
        </Routes>
      </ShoeContextProvider>
    </AuthContextProvider>
  );
};

export default Page;
