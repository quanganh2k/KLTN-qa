import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AuthContextProvider from "../contexts/AuthContext";

import Test from "./Test";
import Test2 from "./Test2";
import Register from "./Register";
import HomePage from "./HomePage";
import ShoeContextProvider from "../contexts/ShoeContext";
import ProductDetails from "./ProductDetails";
import CartContextProvider from "../contexts/CartContext";
import Cart from "./Cart";
import Checkout from "./Checkout";
import "@stripe/stripe-js";
import Success from "./Success";
import Cancel from "./Cancel";
import CheckoutSuccess from "./CheckoutSuccess";
import ShoesAdmin from "../pages/admin/ShoesAdmin";
import SizeContextProvider from "../contexts/SizeContext";
import CategoryContextProvider from "../contexts/CategoryContext";

const Page = () => {
  return (
    <AuthContextProvider>
      <ShoeContextProvider>
        <SizeContextProvider>
          <CategoryContextProvider>
            <CartContextProvider>
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/product/:id" element={<ProductDetails />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />

                <Route exact path="/admin/dashboard" element={<Dashboard />} />
                <Route exact path="/admin/shoes" element={<ShoesAdmin />} />
                <Route exact path="/admin/test" element={<Test />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route
                  exact
                  path="/checkout/success"
                  element={<CheckoutSuccess />}
                />
                <Route exact path="/checkout/cancel" element={<Cancel />} />
                <Route exact path="/test2" element={<Test2 />} />
              </Routes>
            </CartContextProvider>
          </CategoryContextProvider>
        </SizeContextProvider>
      </ShoeContextProvider>
    </AuthContextProvider>
  );
};

export default Page;
