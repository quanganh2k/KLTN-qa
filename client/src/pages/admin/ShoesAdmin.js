import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import TableCommon from "../../components/TableCommon";
import React, { useContext, useEffect, useState } from "react";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";

import { apiUrl } from "../../contexts/constants";
import AppPagination from "../../components/AppPagination";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { ShoeContext } from "../../contexts/ShoeContext";
import AddShoeModal from "../../components/AddShoeModal";
import Toast from "react-bootstrap/Toast";

const ShoesAdmin = () => {
  //! State
  const {
    authState: { isAuthenticated, isAdmin },
  } = useContext(AuthContext);

  const {
    setShowAddShoeModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(ShoeContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const search = searchParams?.get("search") || "";

  const [shoes, setShoes] = useState({});
  const [count, setCount] = useState(1);
  const [query, setQuery] = useState(search);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      if (isAdmin === false) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [isAdmin, isAuthenticated]);

  const title = [
    { id: 1, name: "Tên sản phẩm" },
    { id: 2, name: "Ảnh sản phẩm" },
    { id: 3, name: "Màu sắc" },
    { id: 4, name: "Giá bán" },
    { id: 5, name: "Số lượng" },
    { id: 6, name: "Loại sản phẩm" },

    { id: 7, name: "Thao tác" },
  ];

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
          request = axios.get(`${apiUrl}/shoe?page=${filters?.page}&limit=9`);
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
    setSearchParams(createSearchParams({ search: query, page: 1 }));
  };

  return (
    <div className="shoes-wrapper">
      <Sidebar />
      <div className="shoes-container">
        <Navbar />
        <div className="shoes-page">
          <div className="shoes-page__with-search">
            <div className="shoes-page__with-search__search">
              <input
                type="search"
                name="input-search"
                placeholder="Nhập tên sản phẩm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <i
                className="fa-solid fa-magnifying-glass shoes-page__with-search__search__icon"
                onClick={onSubmitSearch}
              ></i>
            </div>
            <div className="shoes-pages__with-search__filter">
              <span className="shoe-pages__with-search__filter__price">
                Mức giá
              </span>
              <div className="shoe-pages__with-search__filter__check form-check form-check-inline">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">Dưới 2 triệu</label>
              </div>
              <div className="shoe-pages__with-search__filter__check form-check form-check-inline">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">Từ 2 đến 4 triệu</label>
              </div>
            </div>
            <div className="shoe-pages__with-search__create">
              <button
                type="button"
                class="btn btn-primary"
                onClick={setShowAddShoeModal.bind(this, true)}
              >
                Thêm sản phẩm
              </button>
            </div>
          </div>
          <div className="shoes-page__list">
            <TableCommon data={shoes?.results} title={title} />
            <div className="shoes-page__list__pagination">
              <AppPagination
                pageCount={count}
                forcePage={page - 1}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
        <AddShoeModal />
        <Toast
          show={show}
          style={{ position: "fixed", top: "20%", right: "10px" }}
          className={`bg-${type} text-white`}
          onClose={setShowToast.bind(this, {
            show: false,
            message: "",
            type: null,
          })}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <strong>{message}</strong>
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default ShoesAdmin;
