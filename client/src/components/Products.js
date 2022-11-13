import React, { useEffect, useState, useContext } from "react";
import { Link, useSearchParams, createSearchParams } from "react-router-dom";

import { pathImg } from "../contexts/constants";
import AppPagination from "./AppPagination";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
import CurrencyFormat from "react-currency-format";
import { ShoeContext } from "../contexts/ShoeContext";
import { CategoryContext } from "../contexts/CategoryContext";

const Products = () => {
  //! State
  const {
    shoeState: { shoes },
    setPrice,
    getAllShoes,
    setPage,
    setSearch,
  } = useContext(ShoeContext);

  const {
    categoryState: { categories },
    getAllCategories,
  } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const search = searchParams?.get("search") || "";
  const price = searchParams?.get("price") || "";

  const [query, setQuery] = useState(search);
  const [sortPrice, setSortPrice] = useState(price);

  //! Function
  useEffect(() => {
    console.log("__log")
    console.log("page",page)
    console.log("search",search)
    // console.log("page",page)
    
    setPage(page);
    setSearch(search);
    setPrice(sortPrice);
    getAllShoes(page,search,sortPrice)
  }, [page, search, sortPrice]);

  const onPageChange = ({ selected }) => {
    let currentPage = selected + 1;
    setSearchParams(createSearchParams({ page: currentPage, search }));
  };

  const onSubmitSearch = () => {
    setSearchParams(createSearchParams({ search: query, page: 1 }));
  };

  const onChangeSortPrice = (event) => {
    console.log("__checked", event.target.checked);
    console.log("__value", event.target.value);
    if (sortPrice !== "" && sortPrice === event.target.value) {
      setSortPrice("");
      setSearchParams(createSearchParams({ price: "", page: 1, search }));
    }
    if (event.target.checked) {
      setSortPrice(event.target.value);

      setSearchParams(
        createSearchParams({ price: event.target.value, page: 1, search })
      );
      console.log(sortPrice);
    }
  };

  //! Render
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-2">
            <div className="nav-menu">
              <h3 className="text-uppercase nav-menu__title">Danh mục</h3>
              <div className="nav-menu__title__name">Sản phẩm</div>
              <ul className="nav-menu__list">
                {categories?.results?.map((el) => {
                  return (
                    <li className="nav-menu__list__items" key={el?._id}>
                      <Link to={`/product/category/${el?._id}`}>
                        {el?.name}
                      </Link>
                    </li>
                  );
                })}
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
              <div className="products__filter">
                <div className="products__filter__with-search">
                  <input
                    type="search"
                    name="input-search"
                    placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <i
                    className="fa-solid fa-magnifying-glass products__filter__with-search__icon"
                    onClick={onSubmitSearch}
                  ></i>
                </div>
                <div className="products__filter__price">
                  <span className="products__filter__price__heading">
                    Mức giá
                  </span>
                  <div className="products__filter__price__check form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="lt"
                      disabled={
                        sortPrice !== "" && sortPrice !== "lt" ? true : false
                      }
                      onChange={onChangeSortPrice}
                    />
                    <label className="form-check-label">Dưới 2 triệu</label>
                  </div>
                  <div className="products__filter__price__check form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="gte"
                      disabled={
                        sortPrice !== "" && sortPrice !== "gte" ? true : false
                      }
                      onChange={onChangeSortPrice}
                    />
                    <label className="form-check-label">Từ 2 đến 4 triệu</label>
                  </div>
                </div>
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
                          <Link
                            to={`/product/${shoe._id}`}
                            className="products__list__link"
                          >
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
                            <Link to={`/product/${shoe._id}`}>
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="row">
                <AppPagination
                  pageCount={shoes?.pageCount}
                  forcePage={page - 1}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
