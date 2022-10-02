import React from "react";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <div className="container">
          <div className="footer">
            <div className="row">
              <div className="col-3">
                <div className="footer__address">
                  <div className="footer__address__img d-flex justify-content-center">
                    <img src={logo} placeholder="Logo shop" />
                  </div>
                  <ul className="footer__address__list">
                    <li className="footer__address__list__items">
                      Số 1, Lê Văn Lương, Thanh Xuân, Hà Nội
                    </li>
                    <li className="footer__address__list__items">
                      Số 236, Hoàng Quốc Việt, Bắc Từ Liêm, Hà Nội
                    </li>
                    <li className="footer__address__list__items">
                      Số 99, Trung Hoà, Cầu Giấy, Hà Nội
                    </li>
                    <li className="footer__address__list__items">
                      Số 100, Trung Kính, Cầu Giấy, Hà Nội
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-3">
                <div className="footer__instruction">
                  <h3 className="footer__instruction__heading">Hướng dẫn</h3>
                  <ul className="footer__instruction__list">
                    <li className="footer__instruction__list__items">
                      <Link to="#">HƯỚNG DẪN MUA HÀNG</Link>
                    </li>
                    <li className="footer__instruction__list__items">
                      <Link to="#">GIAO NHẬN VÀ THANH TOÁN</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-3">
                <div className="footer__policy">
                  <h3 className="footer__policy__heading">Chính sách</h3>
                  <ul className="footer__policy__list">
                    <li className="footer__policy__list__items">
                      <Link to="#">CHÍNH SÁCH ĐỔI HÀNG</Link>
                    </li>
                    <li className="footer__policy__list__items">
                      <Link to="#">CHÍNH SÁCH THANH TOÁN</Link>
                    </li>
                    <li className="footer__policy__list__items">
                      <Link to="#">HÌNH THỨC VẬN CHUYỂN</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-3">
                <div className="footer__information">
                  <h3 className="footer__information__heading">
                    Thông tin liên hệ
                  </h3>
                  <ul className="footer__information__list">
                    <li className="footer__information__list__items">
                      
                        <i class="fa-solid fa-phone"></i>
                        <span>0988386888</span>
                      
                    </li>
                    <li className="footer__information__list__items">
                      
                        <i class="fa-solid fa-envelope"></i>
                        <span>beclassy@gmail.com</span>
                     
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          Copyright &copy;2022 Lai Quang Anh. All Rights Reserved
        </div>
      </div>
    </>
  );
};

export default Footer;
