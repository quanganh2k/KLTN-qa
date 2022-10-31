import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";

const Register = () => {
  // Context
  const {
    authState: { isAuthenticated, isAdmin },
    registerUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // Local state
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        navigate("/cart");
      } else {
        toast.error(registerData.message);
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
        <form className="form-register col-6" onSubmit={register}>
          <div className="mb-3 ">
            <label className="form-label text-uppercase">Họ</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập họ"
              name="lastName"
              value={lastName}
              onChange={onChangeRegisterForm}
            />
          </div>
          <div className="mb-3 ">
            <label className="form-label text-uppercase">Tên:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên"
              name="firstName"
              value={firstName}
              onChange={onChangeRegisterForm}
            />
          </div>

          <div className="mb-3 ">
            <label className="form-label text-uppercase">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Nhập địa chỉ email"
              name="email"
              value={email}
              onChange={onChangeRegisterForm}
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
              onChange={onChangeRegisterForm}
            />
          </div>
          <div className="form-login__btn-register mb-3">
            <button type="submit" className="btn  ">
              Đăng ký
            </button>
          </div>

          <div className="form-login__login">
            Bạn đã có tài khoản?
            <Link to="/login" className="text-uppercase ms-2">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
