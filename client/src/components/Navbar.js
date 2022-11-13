import "../scss/navbar.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { logoutUser } = useContext(AuthContext);
  const logout = () => logoutUser();
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <div className="icon-account">
              <AccountCircleIcon />
              <div className="admin-account">
                <div className="admin-account__item">Cài đặt</div>
                <div className="admin-account__item" onClick={logout}>
                  Đăng xuất
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
