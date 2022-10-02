import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import Header from "./Header";

const Login = () => {
  // Context
  const {
    authState: { isAuthenticated, isAdmin },
    loginUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // Local state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        navigate("/admin/dashboard");
      } else {
        toast.error(loginData.message);
        setLoginForm({
          email: "",
          password: "",
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to="/admin/dashboard" />;
    } else return <Navigate to="/cart" />;
  }

  return (
    <>
      <Header />
      <div className="container ">
        <form className="form-login col-6" onSubmit={login}>
          <div className="mb-3 ">
            <label className="form-label text-uppercase">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Nhập địa chỉ email"
              name="email"
              value={email}
              onChange={onChangeLoginForm}
            />
          </div>
          <div className="mb-3 ">
            <label className="form-label text-uppercase">Mật khẩu:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              name="password"
              value={password}
              onChange={onChangeLoginForm}
            />
          </div>
          <div className="form-login__btn-login">
            <button type="submit" className="btn  ">
              Đăng nhập
            </button>
          </div>

          <p className="form-login__forgot-password">Quên mật khẩu?</p>
          <div className="form-login__register">
            Bạn chưa có tài khoản?
            <Link to="/register" className="text-uppercase ms-2">
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
