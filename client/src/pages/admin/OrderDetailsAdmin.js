import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Table from "react-bootstrap/Table";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AppPagination from "../../components/AppPagination";
import { OrderContext } from "../../contexts/OrderContext";
import { pathImg } from "../../contexts/constants";
import CurrencyFormat from "react-currency-format";

const OrderDetailsAdmin = () => {
  const {
    authState: { isAuthenticated, isAdmin },
  } = useContext(AuthContext);

  const {
    orderState: { orderDetail },

    getOrderDetails,

    setPage,
    setSearch,
  } = useContext(OrderContext);

  const navigate = useNavigate();

  const title = [
    { id: 301, name: "Mã CTDH" },
    { id: 302, name: "Tên sản phẩm" },
    { id: 303, name: "Hình ảnh" },
    { id: 304, name: "Kích cỡ" },
    { id: 305, name: "Đơn giá" },
    { id: 306, name: "Số lượng" },

    // { id: 207, name: "Mã đơn hàng" },
  ];

  const { id } = useParams();
  
  useEffect(() => {
    console.log("__log")
    getOrderDetails(id);
  }, [id]);

  

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

  

    // useEffect(() => {
    //   setPage(page);
    //   setSearch(search);
    // }, [page, search]);

    // const onPageChange = ({ selected }) => {
    //   let currentPage = selected + 1;
    //   setSearchParams(createSearchParams({ page: currentPage, search }));
    // };

  const onSubmitSearch = () => {
    setSearchParams(createSearchParams({ search: query, page: 1 }));
  };

  return (
    <>
      <div className="order-details-wrapper">
        <Sidebar />
        <div className="order-details-container">
          <Navbar />
          <div className="order-details-page">
            <div className="order-details-page__with-search">
              <div className="order-details-page__with-search__search">
                <input
                  type="search"
                  name="input-search"
                  placeholder="Nhập từ khoá"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i
                  className="fa-solid fa-magnifying-glass order-details-page__with-search__search__icon"
                  onClick={onSubmitSearch}
                ></i>
              </div>
            </div>
            <div className="order-details-page__list">
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
                    { orderDetail?.map((el) => {
                      return (
                        <React.Fragment key={el?._id}>
                          <tr>
                            <td width={"20%"}>{el?._id}</td>

                            <td width={"20%"} className="td-name">{el?.shoe?.name}</td>
                            <td width={"15%"}>
                              <img src={`${pathImg}/${el?.shoe?.image}`} />
                            </td>
                            <td width={"10%"}>{el?.sizeChoice}</td>
                            <td>
                              <CurrencyFormat
                                value={el?.price}
                                displayType={"text"}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                suffix={"đ"}
                              />
                            </td>
                            <td>{el?.quantity}</td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              {/* <div className="order-details-page__list__pagination">
                <AppPagination
                  pageCount={orders?.pageCount}
                  forcePage={page - 1}
                  onPageChange={onPageChange}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsAdmin;
