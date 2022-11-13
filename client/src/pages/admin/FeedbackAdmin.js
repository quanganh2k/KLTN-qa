import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Table from "react-bootstrap/Table";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AppPagination from "../../components/AppPagination";

import { FeedbackContext } from "../../contexts/FeedbackContext";

const FeedbackAdmin = () => {
  const {
    authState: { isAuthenticated, isAdmin },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;

  const title = [
    { id: 501, name: "Mã phản hồi" },
    { id: 502, name: "Tên khách hàng" },
    { id: 503, name: "Sản phẩm" },
    { id: 504, name: "Nội dung phản hồi" },
  ];

  const {
    feedbackState: { feedbacks },
    getAllFeedbacks,
  } = useContext(FeedbackContext);

  useEffect(() => {
    if (isAuthenticated === true) {
      if (isAdmin === false) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [isAdmin, isAuthenticated]);

  useEffect(() => {
    getAllFeedbacks(page);
  }, [page]);

  const onPageChange = ({ selected }) => {
    let currentPage = selected + 1;
    setSearchParams(createSearchParams({ page: currentPage }));
  };

  return (
    <>
      <div className="feedbacks-wrapper">
        <Sidebar />
        <div className="feedbacks-container">
          <Navbar />
          <div className="feedbacks-page">
            <div className="feedbacks-page__list">
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
                    {feedbacks?.results?.map((el) => {
                      return (
                        <React.Fragment key={el?._id}>
                          <tr>
                            <td width={"24%"}>{el?._id}</td>
                            <td>
                              {el?.user?.lastName} {el?.user?.firstName}
                            </td>
                            <td width={"22%"}>{el?.shoe?.name}</td>
                            <td width={"30%"}>{el?.content}</td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="feedbacks-page__list__pagination">
                <AppPagination
                  pageCount={feedbacks?.pageCount}
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

export default FeedbackAdmin;
