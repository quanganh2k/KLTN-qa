import "../scss/navbar.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <AccountCircleIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
