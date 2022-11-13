import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import FeedbackIcon from "@mui/icons-material/Feedback";

import { Link } from "react-router-dom";

import { useContext } from "react";
import "../scss/sidebar.scss";
import CategoryIcon from "@mui/icons-material/Category";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li> */}
          <p className="title">Danh mục</p>

          <Link to="/admin/shoes" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Giày</span>
            </li>
          </Link>
          <Link to="/admin/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Loại giày</span>
            </li>
          </Link>
          <Link to="/admin/sizes" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Size</span>
            </li>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Đơn hàng</span>
            </li>
          </Link>
          <Link to="/admin/feedbacks" style={{ textDecoration: "none" }}>
            <li>
              <FeedbackIcon className="icon" />
              <span>Phản hồi</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
