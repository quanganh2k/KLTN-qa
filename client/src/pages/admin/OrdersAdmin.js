import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import moment from "moment";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Table from "react-bootstrap/Table";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AppPagination from "../../components/AppPagination";
import Toast from "react-bootstrap/Toast";

import { OrderContext } from "../../contexts/OrderContext";
import provinceService from "../../services/provinceService";
import CurrencyFormat from "react-currency-format";

const OrdersAdmin = () => {
  const {
    authState: { isAuthenticated, isAdmin },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const provinceList = provinceService.getOptionsProvince();
  const districtList = provinceService.getOptionsDistrict("01");
  console.log("__district", districtList);
  console.log("__provincelist", provinceList);
  const test = provinceList.find((item) => item.code === "10");
  console.log("test", test.name);

  const title = [
    { id: 201, name: "Mã đơn hàng" },
    { id: 202, name: "Tên khách hàng" },
    { id: 203, name: "Ngày đặt" },
    { id: 204, name: "Địa chỉ" },
    { id: 205, name: "Tổng tiền" },
    { id: 206, name: "Tình trạng thanh toán" },
    { id: 207, name: "Trạng thái" },
    { id: 208, name: "Thao tác" },
  ];

  const {
    orderState: { orders },
    getAllOrders,
    updateOrder,

    showToast: { show, message, type },
    setShowToast,
    setPage,
    setSearch,
  } = useContext(OrderContext);

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
    getAllOrders(page, search);
  }, [page, search]);

  const onPageChange = ({ selected }) => {
    let currentPage = selected + 1;
    setSearchParams(createSearchParams({ page: currentPage, search }));
  };

  const onSubmitSearch = () => {
    setSearchParams(createSearchParams({ search: query, page: 1 }));
  };

  const handleUpdateOrder = async (value) => {
    const data = { statusOrder: "Completed", paymentStatus: "Paid" };
    const { success, message } = await updateOrder(value, data);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const handleCancelOrder = async (value) => {
    const data = { statusOrder: "Cancel", paymentStatus: "Unpaid" };
    const { success, message } = await updateOrder(value, data);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <>
      <div className="orders-wrapper">
        <Sidebar />
        <div className="orders-container">
          <Navbar />
          <div className="orders-page">
            <div className="orders-page__with-search">
              <div className="orders-page__with-search__search">
                <input
                  type="search"
                  name="input-search"
                  placeholder="Nhập mã đơn hàng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i
                  className="fa-solid fa-magnifying-glass orders-page__with-search__search__icon"
                  onClick={onSubmitSearch}
                ></i>
              </div>
            </div>
            <div className="orders-page__list">
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
                    {orders?.results?.map((el) => {
                      return (
                        <React.Fragment key={el?._id}>
                          <tr>
                            <td width={"5%"}>{el?._id}</td>
                            <td width={"12%"}>{el?.fullname}</td>
                            <td width={"10%"}>
                              {moment(el?.date).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              {el?.address},
                              {
                                provinceService
                                  .getOptionsWard(el?.district)
                                  .find((item) => item.code === el?.ward).label
                              }
                              ,
                              {
                                provinceService
                                  .getOptionsDistrict(el?.province)
                                  .find((item) => item.code === el?.district)
                                  .label
                              }
                              ,
                              {
                                provinceList.find(
                                  (item) => item.code === el?.province
                                ).label
                              }
                            </td>
                            <td width={"10%"}>
                              <CurrencyFormat
                                value={el?.total}
                                displayType={"text"}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                suffix={"đ"}
                              />
                            </td>
                            <td width={"8%"}>{el?.paymentStatus}</td>
                            <td>{el?.statusOrder}</td>

                            <td width={"10%"}>
                              <Link
                                className="order__btn-view"
                                to={`/admin/orders/${el?._id}`}
                              >
                                Xem
                              </Link>
                              <button
                                className="btn btn-success order__btn-complete"
                                onClick={() => handleUpdateOrder(el?._id)}
                              >
                                Duyệt
                              </button>
                              <button
                                className="btn btn-danger order__btn-cancel"
                                onClick={() => handleCancelOrder(el?._id)}
                              >
                                Huỷ
                              </button>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="orders-page__list__pagination">
                <AppPagination
                  pageCount={orders?.pageCount}
                  forcePage={page - 1}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </div>

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

export default OrdersAdmin;
