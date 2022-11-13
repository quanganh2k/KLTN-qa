import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import slider1 from "../assets/images/slider_1.webp";
import slider2 from "../assets/images/slider_2.webp";
import slider3 from "../assets/images/slider4.jpg";
import Products from "./Products";
import Footer from "./Footer";
import { pathImg } from "../contexts/constants";
import CurrencyFormat from "react-currency-format";
import {
  Link,
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
import AppPagination from "./AppPagination";
import { CategoryContext } from "../contexts/CategoryContext";

const ShoeByCategory = () => {
  //! State
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const search = searchParams?.get("search") || "";

  const [shoes, setShoes] = useState({});
  const [count, setCount] = useState(1);
  const [query, setQuery] = useState(search);

  const { categoryId } = useParams();

  const {
    categoryState: { categories },
    getAllCategories,
  } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories();
  }, []);

  //! Function
  useEffect(() => {
    (async () => {
      const filters = {
        page,
        search,
      };

      try {
        let request = null;

        if (filters.search) {
          request = axios.get(
            `${apiUrl}/shoe/search?name=${filters.search}&page=${filters.page}&limit=9`
          );
        } else {
          request = axios.get(
            `${apiUrl}/shoe/category?categoryId=${categoryId}&page=${filters?.page}&limit=9`
          );
        }

        const response = await request;
        setShoes(response.data.shoes);
        setCount(response.data.shoes.pageCount);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page, search, categoryId]);

  const onPageChange = ({ selected }) => {
    let currentPage = selected + 1;
    setSearchParams(createSearchParams({ page: currentPage, search }));
  };

  const onSubmitSearch = () => {
    setSearchParams(createSearchParams({ search: query, page: 1 }));
  };

  return (
    <>
      <Header />
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={slider1} className="d-block w-100" alt="slider1" />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={slider2} className="d-block w-100" alt="slider2" />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src={slider3}
              className="d-block w-100"
              height={771}
              alt="slider3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-2">
            <div className="nav-menu">
              <h3 className="text-uppercase nav-menu__title">Danh mục</h3>
              <div className="nav-menu__title__name">Sản phẩm</div>
              <ul className="nav-menu__list">
                {categories?.results?.map((el) => {
                  return (
                    <li className="nav-menu__list__items">
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
                  pageCount={count}
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
  <Footer />;
};

export default ShoeByCategory;
