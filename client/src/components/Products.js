import React, { useEffect,  useState } from "react";
import { Link,  useSearchParams, createSearchParams } from "react-router-dom";

import { pathImg } from "../contexts/constants";
import AppPagination from "./AppPagination";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
import CurrencyFormat from "react-currency-format";

const Products = () => {
  //! State
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const search = searchParams?.get('search') || '';

  const [shoes, setShoes] = useState({});
  const [count, setCount] = useState(1);
  const [query, setQuery] = useState(search);

  //! Function
  useEffect(() => {
    (async () => {
      const filters = {
        page,
        search
      };
  
      try {
        let request = null;
     
        if (filters.search) {
          request = axios.get(`${apiUrl}/shoe/search?name=${filters.search}&page=${filters.page}&limit=9`);
        } else {
          request = axios.get(
            `${apiUrl}/shoe?page=${filters?.page}&limit=9`
          );
        }
        
        const response = await request;
        setShoes(response.data.shoes);
        setCount(response.data.shoes.pageCount);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page, search]);

  const onPageChange = ({ selected }) => {
    let currentPage = selected + 1;
    setSearchParams(createSearchParams({ page: currentPage, search }));
  };

  const onSubmitSearch = () => {
    setSearchParams(createSearchParams({ search: query, page: 1 }))
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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i
                  className="fa-solid fa-magnifying-glass products__with-search__icon"
                  onClick={onSubmitSearch}
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
};

export default Products;
