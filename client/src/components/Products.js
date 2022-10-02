import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoeContext } from "../contexts/ShoeContext";
import { pathImg } from "../contexts/constants";
import AppPagination from "./AppPagination";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
import CurrencyFormat from "react-currency-format";

const Products = () => {
  const [shoes, setShoes] = useState({});

  const [count, setCount] = useState(1);

  const [query, setQuery] = useState("");

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/shoe?page=1&limit=9`);
      setShoes(response.data.shoes);
      setCount(response.data.shoes.pageCount);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/shoe?page=${currentPage}&limit=9`
      );
      setShoes(response.data.shoes);
      setCount(response.data.shoes.pageCount);
    } catch (error) {
      console.log(error);
    }
  };

  const onPageChange = async ({ selected }) => {
    console.log(selected); // vi selected bat dau tu 0
    let currentPage = selected + 1;
    await getProduct(currentPage);
  };

  const search = async () => {
    const response = await axios.get(`${apiUrl}/shoe/search?name=${query}`);
    setShoes(response.data);
  };

  // useEffect(() => {
  //   search();
  // }, [query]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-2">
            <div className="nav-menu">
              <h3 className="text-uppercase nav-menu__title">Danh mục</h3>
              <div className="nav-menu__title__name">Sản phẩm</div>
              <ul className="nav-menu__list">
                <li className="nav-menu__list__items">
                  <Link to="#">Oxford</Link>
                </li>
                <li className="nav-menu__list__items">
                  <Link to="#">Loafer</Link>
                </li>
                <li className="nav-menu__list__items">
                  <Link to="#">Derby</Link>
                </li>
                <li className="nav-menu__list__items">
                  <Link to="#">Boots</Link>
                </li>
              </ul>
              <div className="nav-menu__title__name">Chính sách</div>
              <ul className="nav-menu__list">
                <li className="nav-menu__list__items">
                  <Link to="#">Chính sách thanh toán</Link>
                </li>
                <li className="nav-menu__list__items">
                  <Link to="#">Chính sách đổi hàng</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-10">
            <div className="products">
              <div className="products__with-search">
                <input
                  type="search"
                  name="input-search"
                  placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i
                  className="fa-solid fa-magnifying-glass products__with-search__icon"
                  onClick={search}
                ></i>
              </div>
              <div className="products__list">
                <div className="row">
                  {shoes.results &&
                    shoes.results.map((shoe) => (
                      <div className="col-4" key={shoe._id}>
                        <div className="wrapper">
                          <div className="products__list__img">
                            <Link to={`/product/${shoe._id}`}>
                              <img
                                src={`${pathImg}/${shoe.image}`}
                                alt="Ảnh sản phẩm"
                              />
                            </Link>
                          </div>
                          <Link to={`/product/${shoe._id}`} className="products__list__link">
                            <h3 className="products__list__link__name">
                              {shoe.name}
                            </h3>
                          </Link>
                          <CurrencyFormat
                            className="products__list__price"
                            value={shoe.price}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            suffix={"đ"}
                          />
                          <div className="products__list__add-cart">
                            <button className="btn btn-dark" type="button">
                              Thêm vào giỏ hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="row">
                <AppPagination pageCount={count} onPageChange={onPageChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
