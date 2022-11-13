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
    shoeState: { shoes, shoe },
    setShowAddShoeModal,
    showToast: { show, message, type },
    setShowToast,
    deleteShoe,
    getAllShoes,
    setPage,
    setSearch,
    setPrice,
  } = useContext(ShoeContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const search = searchParams?.get("search") || "";
  const price = searchParams?.get("price") || "";

  // const [shoes, setShoes] = useState({});
  // const [count, setCount] = useState(1);
  const [query, setQuery] = useState(search);
  const [sortPrice, setSortPrice] = useState(price);
  const [idShoeCheckBox, setIdShoeCheckBox] = useState([]);
  console.log("idShoeCheckBox", idShoeCheckBox);
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
    { id: 5, name: "Số lượng nhập" },
    {id: 6, name: "Tồn kho"},
    { id: 7, name: "Loại sản phẩm" },
    
    { id: 8, name: "Thao tác" },
  ];

  //! Function
  useEffect(() => {
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
  const allId = shoes?.results?.map((el) => el?._id);
  const handleRemoveProduct = async () => {
    const { success, message } = await deleteShoe(idShoeCheckBox, allId.length);

    setShowToast({ show: true, message, type: success ? "success" : "danger" });
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
              <span className="shoes-pages__with-search__filter__price">
                Mức giá
              </span>
              <div className="shoes-pages__with-search__filter__check form-check form-check-inline">
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
              <div className="shoes-pages__with-search__filter__check form-check form-check-inline">
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

            <div className="shoes-pages__with-search__create">
              <button
                type="button"
                className="btn btn-primary shoes-pages__with-search__create__btn"
                onClick={setShowAddShoeModal.bind(this, true)}
              >
                Thêm sản phẩm
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleRemoveProduct}
              >
                Xoá sản phẩm
              </button>
            </div>
          </div>
          <div className="shoes-page__list">
            <TableCommon
              idShoeCheckBox={idShoeCheckBox}
              setIdShoeCheckBox={setIdShoeCheckBox}
              data={shoes?.results}
              title={title}
              allId={allId}
              // id={shoe?._id}
            />
            <div className="shoes-page__list__pagination">
              <AppPagination
                pageCount={shoes?.pageCount}
                forcePage={page - 1}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
        <AddShoeModal />
        <Toast
          show={show}
          style={{ position: "fixed", top: "5%", right: "10px" }}
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
