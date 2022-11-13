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
import { SizeContext } from "../../contexts/SizeContext";
import AddSizeModal from "../../components/AddSizeModal";
import UpdateSizeModal from "../../components/UpdateSizeModal";

const SizesAdmin = () => {
  const {
    authState: { isAuthenticated, isAdmin },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const title = [
    { id: 101, name: "Mã size" },
    { id: 102, name: "Số size" },
    { id: 103, name: "Thao tác" },
  ];

  const {
    sizeState: { sizes, size },
    findSize,
    updateSize,
    setShowAddSizeModal,
    setShowUpdateSizeModal,
    showToast: { show, message, type },
    setShowToast,
    setPage,
    setSearch,
    deleteSize,
    getAllSizes,
  } = useContext(SizeContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const search = searchParams?.get("search") || "";

  const [query, setQuery] = useState(search);

 

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

  const chooseSize = (sizeId) => {
    
    findSize(sizeId);
    setShowUpdateSizeModal(true);
  };

  const onPageChange = ({ selected }) => {
    let currentPage = selected + 1;
    setSearchParams(createSearchParams({ page: currentPage, search }));
  };

  const onSubmitSearch = () => {
    setSearchParams(createSearchParams({ search: query, page: 1 }));
  };

  const handleDeleteSize = async (id) => {
    const { success, message } = await deleteSize(id);

    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <>
      <div className="sizes-wrapper">
        <Sidebar />
        <div className="sizes-container">
          <Navbar />
          <div className="sizes-page">
            <div className="sizes-page__with-search">
              <div className="sizes-page__with-search__search">
                <input
                  type="search"
                  name="input-search"
                  placeholder="Nhập số size"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i
                  className="fa-solid fa-magnifying-glass sizes-page__with-search__search__icon"
                  onClick={onSubmitSearch}
                ></i>
              </div>

              <div className="sizes-pages__with-search__create">
                <button
                  type="button"
                  className="btn btn-primary sizes-pages__with-search__create__btn"
                  onClick={setShowAddSizeModal.bind(this, true)}
                >
                  Thêm mới
                </button>
              </div>
            </div>
            <div className="sizes-page__list">
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
                    {sizes?.results?.map((el) => {
                      return (
                        <React.Fragment key={el?._id}>
                          <tr>
                            <td>{el?._id}</td>
                            <td width={"50%"}>{el?.sizeNumber}</td>
                            <td width={"20%"}>
                              <span
                                className="edit-icon"
                                onClick={chooseSize.bind(this, el?._id)}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </span>
                              <span className="delete-icon">
                                <i
                                  className="fa-solid fa-trash"
                                  onClick={() => handleDeleteSize(el?._id)}
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
              <div className="sizes-page__list__pagination">
                <AppPagination
                  pageCount={sizes?.pageCount}
                  forcePage={page - 1}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </div>
          <AddSizeModal />
          {size !== null && <UpdateSizeModal />}
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

export default SizesAdmin;
