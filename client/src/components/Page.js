import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AuthContextProvider from "../contexts/AuthContext";

import CategoriesAdmin from "../pages/admin/CategoriesAdmin";
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
import SizesAdmin from "../pages/admin/SizesAdmin";
import ShoeByCategory from "./ShoeByCategory";
import OrderContextProvider from "../contexts/OrderContext";
import OrdersAdmin from "../pages/admin/OrdersAdmin";
import OrderDetailsAdmin from "../pages/admin/OrderDetailsAdmin";
import UpdateShoe from "./UpdateShoe";
import FeedbackContextProvider from "../contexts/FeedbackContext";
import FeedbackAdmin from "../pages/admin/FeedbackAdmin";

const Page = () => {
  return (
    <AuthContextProvider>
      <CategoryContextProvider>
        <SizeContextProvider>
          <ShoeContextProvider>
            <CartContextProvider>
              <OrderContextProvider>
                <FeedbackContextProvider>
                  <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route
                      exact
                      path="/product/:id"
                      element={<ProductDetails />}
                    />

                    <Route
                      exact
                      path="/product/category/:categoryId"
                      element={<ShoeByCategory />}
                    />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />

                    <Route
                      exact
                      path="/admin/dashboard"
                      element={<Dashboard />}
                    />
                    <Route exact path="/admin/shoes" element={<ShoesAdmin />} />
                    <Route
                      exact
                      path="/admin/shoes/update/:id"
                      element={<UpdateShoe />}
                    />
                    <Route
                      exact
                      path="/admin/categories"
                      element={<CategoriesAdmin />}
                    />
                    <Route
                      exact
                      path="/admin/orders"
                      element={<OrdersAdmin />}
                    />
                    <Route
                      exact
                      path="/admin/orders/:id"
                      element={<OrderDetailsAdmin />}
                    />
                    <Route exact path="/admin/sizes" element={<SizesAdmin />} />
                    <Route
                      exact
                      path="/admin/feedbacks"
                      element={<FeedbackAdmin />}
                    />
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
                </FeedbackContextProvider>
              </OrderContextProvider>
            </CartContextProvider>
          </ShoeContextProvider>
        </SizeContextProvider>
      </CategoryContextProvider>
    </AuthContextProvider>
  );
};

export default Page;
