import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { pathImg, apiUrl } from "../contexts/constants";
import provinceService from "../services/provinceService";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Checkout = () => {
  //! State
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);

  console.log("___user",user)

  const {
    cartState: { cart },
  } = useContext(CartContext);

  const [total, setTotal] = useState();
  const [checkoutForm, setCheckoutForm] = useState({
    // email: user?.email,
    fullname: "",
    phoneNumber: "",
    address: "",

    provinceCode: "",
    districtCode: "",
    wardCode: "",

    payment: "",
    paymentStatus: "Chưa thanh toán",
    products: cart,
    user: user?._id,
  });

  const provinceList = provinceService.getOptionsProvince();
  const districtList = provinceService.getOptionsDistrict(
    checkoutForm.provinceCode
  );
  const wardList = provinceService.getOptionsWard(checkoutForm.districtCode);

  const {
   
    fullname,
    phoneNumber,
    address,
    payment,
  } = checkoutForm;
  

  //! Function
  const onChangeProvinceDistrictWard = (key) => (event) => {
    setCheckoutForm((prev) => {
      //* Another way clone OBJ
      const nextData = JSON.parse(JSON.stringify(prev));
      nextData[key] = event.target.value;

      if (key === "provinceCode") {
        nextData["districtCode"] = "";
        nextData["wardCode"] = "";
      }

      if (key === "districtCode") {
        nextData["wardCode"] = "";
      }

      return nextData;
    });
  };

  console.log(cart);

  useEffect(() => {
    setTotal(
      cart.reduce((prev, curr) => prev + Number(curr.price * curr.quantity), 0)
    );
  }, [cart]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  //! Stripe
  let stripePromise;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }

    return stripePromise;
  };

  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    product: cart._id,
    sizeChoice: cart.sizeChoice,
    quantity: cart.quantity,
    price: total,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: "checkout/success",
    cancelUrl: "checkout/cancel",
  };

  const onChangeCheckoutForm = (event) => {
    setCheckoutForm({
      ...checkoutForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (payment === "cod") {
        //* Parsed body
        const { provinceCode, districtCode, wardCode, ...rest } = checkoutForm;

        const body = {
          province: provinceCode,
          district: districtCode,
          ward: wardCode,
          ...rest,
        };

        const response = await axios.post(`${apiUrl}/checkout`, body);
        if(response.data.success) {
          navigate("/checkout/success")
          localStorage.removeItem("cart")
        }
      } else {
        const { provinceCode, districtCode, wardCode, ...rest } = checkoutForm;

        const data = {
          province: provinceCode,
          district: districtCode,
          ward: wardCode,
          paymentStatus: "Đã thanh toán",
          ...rest,
        };

        await axios.post(`${apiUrl}/checkout`, data);
      }
    } catch (error) {
      console.log(error);
    }

    // neu ma chon online payment
    if (payment === "online") {
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout(checkoutOptions);
      console.log("Stripe checkout error", error);

      if (error) setStripeError(error.message);
      setLoading(false);
    }
    setLoading(true);
  };

  if (stripeError) alert(stripeError);

  //! Render
  return (
    <>
      <div className="container-fluid">
        <div className="checkout">
          <div className="row">
            <div className="col-8">
              <div className="checkout-left">
                <div className="checkout__logoshop">
                  <img src={logo} alt="Logo Be Classy" />
                </div>
                <div className="checkout__form">
                  <form
                    id="form-checkout"
                    // onSubmit={handleSubmit}
                    className="checkout__form__info__form"
                  >
                    <div className="row">
                      <div className="col-6">
                        <div className="checkout__form__info">
                          <h2 className="checkout__form__info__heading">
                            Thông tin nhận hàng
                          </h2>
                          <div className="mb-3">
                            <input
                              type="email"
                              className="form-control input__checkout"
                              placeholder="Email"
                              value={user?.email}

                              disabled
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control input__checkout"
                              placeholder="Họ và tên"
                              value={fullname}
                              name="fullname"
                              onChange={onChangeCheckoutForm}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control input__checkout"
                              placeholder="Số điện thoại"
                              value={phoneNumber}
                              name="phoneNumber"
                              onChange={onChangeCheckoutForm}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control input__checkout"
                              placeholder="Địa chỉ"
                              value={address}
                              name="address"
                              onChange={onChangeCheckoutForm}
                            />
                          </div>
                          <div className="mb-3">
                            <select
                              className="form-select"
                              value={checkoutForm.provinceCode}
                              onChange={onChangeProvinceDistrictWard(
                                "provinceCode"
                              )}
                            >
                              <option value={0}>Chọn tỉnh thành</option>
                              {(provinceList || [])?.map((el) => {
                                return (
                                  <React.Fragment key={el?.value}>
                                    <option value={el?.value}>
                                      {el?.label}
                                    </option>
                                  </React.Fragment>
                                );
                              })}
                            </select>
                          </div>
                          <div className="mb-3">
                            <select
                              className="form-select"
                              defaultValue={0}
                              value={checkoutForm.districtCode}
                              onChange={onChangeProvinceDistrictWard(
                                "districtCode"
                              )}
                            >
                              <option value={0}>Chọn quận huyện</option>
                              {(districtList || [])?.map((el) => {
                                return (
                                  <React.Fragment key={el?.value}>
                                    <option value={el?.value}>
                                      {el?.label}
                                    </option>
                                  </React.Fragment>
                                );
                              })}
                            </select>
                          </div>
                          <div className="mb-3">
                            <select
                              className="form-select"
                              defaultValue={0}
                              value={checkoutForm.wardCode}
                              onChange={onChangeProvinceDistrictWard(
                                "wardCode"
                              )}
                            >
                              <option value={0}>Chọn phường xã</option>
                              {(wardList || [])?.map((el) => {
                                return (
                                  <React.Fragment key={el?.value}>
                                    <option value={el?.value}>
                                      {el?.label}
                                    </option>
                                  </React.Fragment>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <h2 className="checkout__form__pay">Thanh toán</h2>
                        <div className="form-check checkout__form__check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="payment"
                            id="flexRadioDefault1"
                            value="cod"
                            onChange={onChangeCheckoutForm}
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault1"
                          >
                            Thanh toán khi giao hàng (COD)
                          </label>
                        </div>
                        <div class="form-check checkout__form__check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="payment"
                            value="online"
                            onChange={onChangeCheckoutForm}
                            id="flexRadioDefault2"
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Thanh toán qua Stripe
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="checkout__order">
                <h2 className="checkout__order__heading">
                  Đơn hàng ({cart.length} sản phẩm)
                </h2>
                <div className="checkout__order__lists">
                  {cart.map((e) => {
                    return (
                      <div className="checkout__order__lists__flex" key={e?._id}>
                        <div className="checkout__order__lists__wrapper-img">
                          <img
                            src={`${pathImg}/${e?.image}`}
                            alt="Ảnh sản phẩm"
                          />
                          <span>{e?.quantity}</span>
                        </div>
                        <div className="checkout__order__lists__details">
                          <h3 className="checkout__order__lists__details__name">
                            {e?.name}
                          </h3>
                          <div className="checkout__order__lists__details__info">
                            <p className="checkout__order__lists__details__info__size">
                              {e?.sizeChoice} / {e?.color}
                            </p>
                            <CurrencyFormat
                              className="checkout__order__lists__details__info__price"
                              value={e?.price * e?.quantity}
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              suffix={"đ"}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="checkout__order__lists__total">
                    <span className="checkout__order__lists__total__title">
                      Tổng cộng:
                    </span>
                    <CurrencyFormat
                      className="checkout__order__lists__details__info__price"
                      value={total}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      suffix={"đ"}
                    />
                  </div>
                  <div className="checkout__order__lists__btn">
                    <Link to="/cart">
                      <i className="fa-solid fa-chevron-left"></i>
                      Quay về giỏ hàng
                    </Link>
                    <div>
                      <button
                        form="form-checkout"
                        type="submit"
                        id="form-checkout"
                        className="btn btn-dark"
                        // disabled={isLoading}
                        onClick={handleSubmit}
                      >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
