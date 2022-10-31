import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { CartContext } from "../contexts/CartContext";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { pathImg } from "../contexts/constants";
import { toast } from "react-toastify";
import Footer from "./Footer";

const Cart = () => {
  const {
    cartState: { cart },
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [total, setTotal] = useState();

  const handleRemove = (id, sizeChoice) => {
    removeFromCart(id, sizeChoice)
    toast.success("Xoá thành công sản phẩm khỏi giỏ hàng")
  }

  useEffect(() => {
    setTotal(
      cart.reduce((prev, curr) => prev + Number(curr.price * curr.quantity), 0)
    );
  }, [cart]);
  return (
    <>
      <Header />
      <div className="container">
        <div className="cart-page">
          <h2 className="cart-page__heading">Giỏ hàng</h2>

          <div className="cart-page__details">
            {cart.length !== 0 ? (
              <>
                <span className="cart-page__heading-quantity">
                  {cart.length} sản phẩm
                </span>
                <div className="cart-page__container">
                  <div className="row">
                    <div className="col-8">
                      {cart.map((e) => {
                        return (
                          <React.Fragment key={e._id}>
                            <div className="cart-page__details__info">
                              <div className="cart-page__details__info__img">
                                <img
                                  src={`${pathImg}/${e.image}`}
                                  alt="Ảnh sản phẩm"
                                />
                              </div>
                              <div className="cart-page__details__info__product">
                                <h3 className="cart-page__details__info__product__name">
                                  {e.name}
                                  <i
                                    className="fa-solid fa-trash icon-delete"
                                    onClick={() =>
                                        handleRemove(e._id, e.sizeChoice)
                                    }
                                  ></i>
                                </h3>
                                <div className="cart-page__details__info__product__color">
                                  Màu: {e.color}
                                </div>
                                <div className="cart-page__details__info__product__size">
                                  Size: <span>{e.sizeChoice}</span>
                                </div>
                                <CurrencyFormat
                                  className="cart-page__details__info__product__price"
                                  value={e.price}
                                  displayType={"text"}
                                  thousandSeparator={"."}
                                  decimalSeparator={","}
                                  suffix={"đ"}
                                />
                                <div className="cart-page__quantity__wrapper">
                                    <span className="span__quantity">Số lượng:</span>
                                    <div className="cart-page__details__info__product__quantity">
                                  <span
                                    className="quantity__dec"
                                    onClick={() =>
                                      decreaseQuantity(e._id, e.sizeChoice)
                                    }
                                  >
                                    -
                                  </span>
                                  <span className="quantity__text">
                                    {e.quantity}
                                  </span>
                                  <span
                                    className="quantity__inc"
                                    onClick={() =>
                                      increaseQuantity(e._id, e.sizeChoice)
                                    }
                                  >
                                    +
                                  </span>
                                </div>
                                </div>
                              
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <div className="col-4">
                        <div className="col__wrapper">
                        <div className="cart-page__details__total">
                        Tổng tiền:{" "}
                        <CurrencyFormat
                          className="cart-page__details__total__all"
                          value={total}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          suffix={"đ"}
                        />
                      </div>
                      <Link to="/checkout" className="cart-page__details__btn">
                        Thanh toán
                      </Link>
                      <Link to="/" className="cart-page__details__btn">
                        Tiếp tục mua hàng
                      </Link>
                        </div>
                     
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="cart-page__empty">Giỏ hàng chưa có sản phẩm</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
