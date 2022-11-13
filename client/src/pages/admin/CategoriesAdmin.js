import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Table from "react-bootstrap/Table";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AppPagination from "../../components/AppPagination";
import Toast from "react-bootstrap/Toast";
import { CategoryContext } from "../../contexts/CategoryContext";
import AddCategoryModal from "../../components/AddCategoryModal";
import UpdateCategoryModal from "../../components/UpdateCategoryModal";

const CategoriesAdmin = () => {
  const {
    authState: { isAuthenticated, isAdmin },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const title = [
    { id: 101, name: "Mã loại giày" },
    { id: 102, name: "Tên loại giày" },
    { id: 103, name: "Thao tác" },
  ];

  const {
    categoryState: { categories, category },
    findCategory,
    updateCategory,
    setShowAddCategoryModal,
    setShowUpdateCategoryModal,
    showToast: { show, message, type },
    setShowToast,
    setPage,
    setSearch,
    deleteCategory,
    getAllCategories,
  } = useContext(CategoryContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const search = searchParams?.get("search") || "";

  const [query, setQuery] = useState(search);

  console.log("__cate", categories);

  useEffect(() => {
    if (isAuthenticated === true) {
      if (isAdmin === false) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [isAdmin, isAuthenticated]);

  //! Function
  useEffect(() => {
    setPage(page);
    setSearch(search);
  }, [page, search]);

  const chooseCategory = (categoryId) => {
    console.log("__cateID", categoryId);
    findCategory(categoryId);
    setShowUpdateCategoryModal(true);
  };

  const onPageChange = ({ selected }) => {
    let currentPage = selected + 1;
    setSearchParams(createSearchParams({ page: currentPage, search }));
  };

  const onSubmitSearch = () => {
    setSearchParams(createSearchParams({ search: query, page: 1 }));
  };

  const handleDeleteCategory = async (id) => {
    const { success, message } = await deleteCategory(id);

    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <>
      <div className="categories-wrapper">
        <Sidebar />
        <div className="categories-container">
          <Navbar />
          <div className="categories-page">
            <div className="categories-page__with-search">
              <div className="categories-page__with-search__search">
                <input
                  type="search"
                  name="input-search"
                  placeholder="Nhập tên loại giày"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i
                  className="fa-solid fa-magnifying-glass categories-page__with-search__search__icon"
                  onClick={onSubmitSearch}
                ></i>
              </div>

              <div className="categories-pages__with-search__create">
                <button
                  type="button"
                  className="btn btn-primary categories-pages__with-search__create__btn"
                  onClick={setShowAddCategoryModal.bind(this, true)}
                >
                  Thêm mới
                </button>
              </div>
            </div>
            <div className="categories-page__list">
              <div>
                <Table bordered>
                  <thead>
                    <tr>
                      {title?.map((el) => {
                        return <th key={el.id}>{el.name}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.results?.map((el) => {
                      return (
                        <React.Fragment key={el?._id}>
                          <tr>
                            <td>{el?._id}</td>
                            <td width={"50%"}>{el?.name}</td>
                            <td width={"20%"}>
                              <span
                                className="edit-icon"
                                onClick={chooseCategory.bind(this, el?._id)}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </span>
                              <span className="delete-icon">
                                <i
                                  className="fa-solid fa-trash"
                                  onClick={() => handleDeleteCategory(el?._id)}
                                ></i>
                              </span>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="categories-page__list__pagination">
                <AppPagination
                  pageCount={categories?.pageCount}
                  forcePage={page - 1}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </div>
          <AddCategoryModal />
          {category !== null && <UpdateCategoryModal />}
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
    </>
  );
};

export default CategoriesAdmin;
