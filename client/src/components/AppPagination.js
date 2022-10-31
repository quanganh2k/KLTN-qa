import React from "react";

// import Pagination from '@mui/material/Pagination';
import ReactPaginate from "react-paginate";

const AppPagination = ({ pageCount, onPageChange, forcePage }) => {
  return (
    // <Pagination count={count} page={page} onChange={onChange} variant='outlined' />
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={forcePage}
      // marginPagesDisplayed={2}
      // pageRangeDisplayed={3}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
};

export default AppPagination;
