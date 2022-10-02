import React from "react";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const {
    authState: { isAuthenticated, isAdmin, user },
    logoutUser,
  } = useContext(AuthContext);

  const [options, setOptions] = useState({
    opt1: "Đăng nhập",
    opt2: "Đăng ký",
  });

  const logout = () => logoutUser();

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
                  <Link to="#">
                    Giỏ hàng
                    <i className="fa-solid fa-cart-arrow-down"></i>
                    <span className="cart-quantity">0</span>
                  </Link>
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
