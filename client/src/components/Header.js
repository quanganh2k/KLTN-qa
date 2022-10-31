import React from "react";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { pathImg } from "../contexts/constants";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Header = () => {
  const {
    authState: { isAuthenticated, isAdmin, user },
    logoutUser,
  } = useContext(AuthContext);

  const {
    cartState: { cart },
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((prev, curr) => prev + Number(curr.price * curr.quantity), 0)
    );
  }, [cart]);

  console.log("__cart", cart.length);

  const [options, setOptions] = useState({
    opt1: "Đăng nhập",
    opt2: "Đăng ký",
  });

  const logout = () => logoutUser();

  const handleRemove = (id, sizeChoice) => {
    removeFromCart(id, sizeChoice);
    toast.success("Xoá thành công sản phẩm khỏi giỏ hàng");
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      setOptions({
        opt1: `Xin chào, ${user.lastName} ${user.firstName}`,
        opt2: "Đăng xuất",
      });
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="row align-items-center">
            <div className="col-4">
              <div className="header__hotline">
                HOTLINE: <span>0988386888</span>
              </div>
            </div>
            <div className="col-4">
              <div className="header__logo text-center">
                <Link to="/">
                  <img src={logo} alt="Logo Be Classy" />
                </Link>
              </div>
            </div>
            <div className="col-4 ">
              <div className="header__auth d-flex justify-content-end align-items-center">
                <div className="header__auth__account">
                  <div className="dropdown">
                    <button
                      className="btn btn-dropdown btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Tài khoản
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        {" "}
                        {isAuthenticated === true ? (
                          isAdmin ? (
                            <Link to="/admin/dashboard">{options.opt1}</Link>
                          ) : (
                            <Link to="/cart">{options.opt1}</Link>
                          )
                        ) : (
                          <Link to="/login">{options.opt1}</Link>
                        )}
                      </li>
                      <li>
                        {isAuthenticated === true ? (
                          <Link to="/" onClick={logout}>
                            {options.opt2}
                          </Link>
                        ) : (
                          <Link to="/register">{options.opt2}</Link>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="header__auth__cart">
                  <Link to="/cart">
                    Giỏ hàng
                    <i className="fa-solid fa-cart-arrow-down"></i>
                    <span className="cart-quantity">{cart.length}</span>
                  </Link>
                  <div className="cart__header__wrapper">
                    {cart.length !== 0 ? (
                      <>
                        {cart.map((e) => {
                          return (
                            <React.Fragment key={e._id}>
                              <div className="car-div">
                                <div className="cart__header__wrapper__img">
                                  <img
                                    src={`${pathImg}/${e.image}`}
                                    alt="Ảnh sản phẩm"
                                  />
                                </div>
                                <div className="cart__header__wrapper__info">
                                  <div className="cart__header__wrapper__info__name">
                                    {e.name}
                                    <i
                                      className="fa-solid fa-trash icon-delete"
                                      onClick={() =>
                                        handleRemove(e._id, e.sizeChoice)
                                      }
                                    ></i>
                                  </div>
                                  <div className="cart__header__wrapper__info__size">
                                    Size: <span>{e.sizeChoice}</span>
                                  </div>
                                  <CurrencyFormat
                                    className="cart__header__wrapper__info__price"
                                    value={e.price}
                                    displayType={"text"}
                                    thousandSeparator={"."}
                                    decimalSeparator={","}
                                    suffix={"đ"}
                                  />
                                  <div className="cart__header__wrapper__info__quantity">
                                    <span
                                      className="cart__header__wrapper__info__quantity__dec"
                                      onClick={() =>
                                        decreaseQuantity(e._id, e.sizeChoice)
                                      }
                                    >
                                      -
                                    </span>
                                    <span className="cart__header__wrapper__info__quantity__text">
                                      {e.quantity}
                                    </span>
                                    <span
                                      className="cart__header__wrapper__info__quantity__inc"
                                      onClick={() =>
                                        increaseQuantity(e._id, e.sizeChoice)
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                        <div className="cart__header__wrapper__total">
                          Tổng cộng:{" "}
                          <CurrencyFormat
                            className="cart__header__wrapper__total__all"
                            value={total}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            suffix={"đ"}
                          />
                        </div>
                        <div className="cart__header__wrapper__buttons">
                          <Link to="/checkout" className="cart__header__wrapper__btn">
                            Thanh toán
                          </Link>
                          <Link
                            to="/cart"
                            className="cart__header__wrapper__btn"
                          >
                            Giỏ hàng
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="cart-empty">
                        Giỏ hàng chưa có sản phẩm
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="header__nav">
              <ul className="header__nav__list d-flex">
                <li className="header__nav__list__item">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="header__nav__list__item">
                  <Link to="#">Giới thiệu</Link>
                </li>
                <li className="header__nav__list__item dropdown">
                  <Link to="#">
                    Giày
                    <i className="fa-solid fa-chevron-down"></i>
                  </Link>
                  <ul className="header-dropdown">
                    <li className="header-dropdown__item">
                      <Link className="change-color" to="/">
                        oxford
                      </Link>
                    </li>
                    <li className="header-dropdown__item">
                      <Link className="change-color" to="/">
                        loafer
                      </Link>
                    </li>
                    <li className="header-dropdown__item">
                      <Link className="change-color" to="/">
                        derby
                      </Link>
                    </li>
                    <li className="header-dropdown__item">
                      <Link className="change-color" to="/">
                        boots
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="header__nav__list__item">
                  <Link to="#">Hướng dẫn chọn size</Link>
                </li>
                <li className="header__nav__list__item">
                  <Link to="#">Blog</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
