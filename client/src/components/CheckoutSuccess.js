import React from "react";
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';


const CheckoutSuccess = () => {
  return (
    <>
    <Header />
    <div className="container">
      <h2 className="success-checkout">Bạn đã đặt hàng thành công</h2>
      <p className="success-checkout__description">Sản phẩm sẽ được giao đến bạn trong thời gian sớm nhất !</p>
      <Link className="success-checkout__back" to='/'>Quay lại trang chủ</Link>
    </div>
    <Footer />
    </>
    
  );
};

export default CheckoutSuccess;
