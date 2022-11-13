import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import Header from "./Header";
import Footer from "./Footer";
import { pathImg } from "../contexts/constants";
import CurrencyFormat from "react-currency-format";
import payLogo from "../assets/images/policy_images_1.svg";
import deliveryLogo from "../assets/images/policy_images_2.svg";
import insuaranceLogo from "../assets/images/policy_images_3.svg";
import exchangeLogo from "../assets/images/policy_images_4.svg";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { FeedbackContext } from "../contexts/FeedbackContext";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    shoeState: { shoes },
    getProductDetails,
  } = useContext(ShoeContext);

  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);

  const {
    addCart,
    cartState: { cart },
  } = useContext(CartContext);

  const {
    feedbackState: { fb },
    addFeedback,
    getFeedbackByProduct,
  } = useContext(FeedbackContext);

  console.log("__fb", fb);

  useEffect(() => {
    getFeedbackByProduct(id);
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const [sizeChoice, setSizeChoice] = useState(38);

  const [feedback, setFeedback] = useState({
    content: "",
    user: user?._id,
    shoe: id,
  });

  const { content } = feedback;

  const onChangeFeedback = (event) => {
    setFeedback({ ...feedback, [event.target.name]: event.target.value });
  };

  const handleCmt = async () => {
    const {success,message} = await addFeedback(feedback, id);
    if(success === false) {
      toast.error(message)
    }
    setFeedback({ content: "", user: user?._id, shoe: id });
  };

  const handleAddCart = () => {
    addCart({ ...shoes, sizeChoice, quantity });
    toast.success("Thêm thành công sản phẩm vào giỏ hàng");
  };

  console.log("__sau khi add", cart);

  // const [active, setActive] = useState(38);

  // const [count, setCount] = useState(1);

  const handleClick = (item) => {
    setSizeChoice(item);
  };

  const handleChangeQuantity = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="product-details">
          <div className="row">
            <div className="col-6">
              <div className="product-details__image">
                <img
                  src={`${pathImg}/${shoes.image}`}
                  alt="Hình ảnh sản phẩm"
                />
              </div>
            </div>
            <div className="col-6">
              <h3 className="product-details__name">{shoes.name}</h3>
              <CurrencyFormat
                className="product-details__price"
                value={shoes.price}
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator={","}
                suffix={"đ"}
              />
              <p className="product-details__color">
                <span className="product-details__label">Màu sắc: </span>
                {shoes.color}
              </p>
              <p className="product-details__size">
                <span id="label" className="product-details__label">
                  Kích cỡ:{" "}
                </span>
                {shoes?.sizes?.map((e) => {
                  return (
                    <React.Fragment key={e._id}>
                      <span
                        onClick={() => handleClick(e?.size?.sizeNumber)}
                        className={
                          sizeChoice === e?.size?.sizeNumber
                            ? "active product-details__size__details"
                            : "product-details__size__details"
                        }
                      >
                        {e?.size?.sizeNumber}
                      </span>
                    </React.Fragment>
                  );
                })}
              </p>
              <p className="product-details__quatity">
                <span className="product-details__label">Số lượng:</span>
                <span className="product-details__quatity__wrapper">
                  {" "}
                  <span
                    className="product-details__quatity__wrapper__change"
                    onClick={() => handleChangeQuantity("dec")}
                  >
                    -
                  </span>
                  <span className="product-details__quatity__wrapper__number">
                    {quantity}
                  </span>
                  <span
                    className="product-details__quatity__wrapper__change"
                    onClick={() => handleChangeQuantity("inc")}
                  >
                    +
                  </span>
                </span>
              </p>
              <p className="product-details__description">
                <span>Mô tả sản phẩm: </span>
                {shoes.description}
              </p>
              <button
                className="btn btn-dark"
                type="button"
                onClick={handleAddCart}
              >
                Thêm vào giỏ hàng
              </button>
              <div className="product-details__policy">
                <img src={payLogo} alt="Check and Pay Logo" />
                <div>KIỂM TRA HÀNG VÀ THANH TOÁN KHI NHẬN HÀNG</div>
              </div>
              <div className="product-details__policy">
                <img src={deliveryLogo} alt="Delivery Logo" />
                <div>GIAO HÀNG TOÀN QUỐC</div>
              </div>
              <div className="product-details__policy">
                <img src={insuaranceLogo} alt="Insuarance Logo" />
                <div>SẢN PHẨM BẢO HÀNH 3 NĂM</div>
              </div>

              <div className="product-details__policy">
                <img src={exchangeLogo} alt="Exchange Logo" />
                <div>ĐỔI SIZE, ĐỔI MẪU ĐỐI VỚI SẢN PHẨM CHƯA QUA SỬ DỤNG</div>
              </div>
            </div>
          </div>
          <div className="product-details__wrapper-cmt">
            <div className="form-floating">
              <p className="product-details__wrapper-cmt__heading">Nhập bình luận, phản hồi về sản phẩm</p>
              <textarea
                className="form-control"
                placeholder="Nhập bình luận, phản hồi"
                name="content"
                value={content}
                onChange={onChangeFeedback}
              ></textarea>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary btn-cmt"
                onClick={handleCmt}
              >
                Đăng
              </button>
            </div>
          </div>
          {fb.length !== 0 ? (
            <>
              {fb?.map((el) => (
                <div className="product-details__cmt__list" key={el?._id}>
                  <span className="user-cmt">
                    {el?.user?.lastName} {el?.user?.firstName}:{" "}
                  </span>
                  {el?.content}
                </div>
              ))}
            </>
          ) : (
            <div className="product-details__cmt__list">Chưa có bình luận về sản phẩm</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
