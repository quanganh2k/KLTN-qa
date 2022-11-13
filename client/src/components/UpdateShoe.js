import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../scss/admin-update-shoe.scss";
import { useParams } from "react-router-dom";
import { ShoeContext } from "../contexts/ShoeContext";
import { SizeContext } from "../contexts/SizeContext";
import { CategoryContext } from "../contexts/CategoryContext";
import { pathImg } from "../contexts/constants";
import Toast from "react-bootstrap/Toast";

const UpdateShoe = () => {
  const {
    shoeState: { shoes },
    showToast: { show, message, type },
    updateShoe,
    getProductDetails,
    setShowToast,
  } = useContext(ShoeContext);

  const { id } = useParams();

  const {
    sizeState: { sizes },
    getAllSizes,
  } = useContext(SizeContext);

  const {
    categoryState: { categories },
    getAllCategories,
  } = useContext(CategoryContext);

  const [updatedShoe, setUpdatedShoe] = useState(shoes);

  useEffect(() => {
    getAllSizes();
    getAllCategories();
  }, []);

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  useEffect(() => {
    setUpdatedShoe(shoes);
  }, [shoes]);

  const { name, image, category, color, price, description } = updatedShoe;
  // const category = updatedShoe?.category?._id
  const sizeUpdate = updatedShoe.sizes || [];

  const [fileImg, setFileImg] = useState(image);
  console.log("__update", updatedShoe);

  useEffect(() => {
    if (image) {
      setFileImg(image);
    }
  }, [image]);

  const onChangeUpdateShoeForm = (event) => {
    setUpdatedShoe({ ...updatedShoe, [event.target.name]: event.target.value });
  };

  const onChangeUploadFile = (event) => {
    let files = event.target.files[0];
    console.log("_____files", files);
    // const reader = new FileReader()

    // reader.readAsDataURL(files)

    // reader.onload = () => {
    //   console.log('called: ', reader)
    //   // setBase64IMG(reader.result)
    //   setFileImg(reader.result);
    // }
    setFileImg(files);
  };
  const onChangeSize = (name, item, index) => (event) => {
    const nextData = JSON.parse(JSON.stringify(sizeUpdate));
    nextData[index][name] = event.target.value;
    setUpdatedShoe({ ...updatedShoe, sizes: nextData });
    console.log("___test", updatedShoe.sizes);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", fileImg);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("color", color);
    if (typeof category === "object" && category !== null) {
      formData.append("category", category?._id.toString());
    } else {
      formData.append("category", category.toString());
    }

    updatedShoe?.sizes.forEach((el, index) => {
      if (typeof el.size === "object" && el.size !== null) {
        formData.append(`sizes[${index}][size]`, el.size._id);
        formData.append(`sizes[${index}][quantity]`, el.quantity);
        formData.append(`sizes[${index}][inStock]`, el.inStock);
      } else {
        formData.append(`sizes[${index}][size]`, el.size);
        formData.append(`sizes[${index}][quantity]`, el.quantity);
        formData.append(`sizes[${index}][inStock]`, el.inStock);
      }
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { success, message } = await updateShoe(id, formData, config);
    resetUpdateShoeData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetUpdateShoeData = () => {
    setUpdatedShoe({
      name: "",
      image: "",
      price: "",
      description: "",
      color: "",
      category: "",
      sizes: [],
    });
  };

  return (
    <>
      <div className="update-wrapper">
        <Sidebar />
        <div className="update-container">
          <Navbar />
          <div className="update-shoe-page">
            <h2 className="update-shoe-page__heading">Chỉnh sửa thông tin</h2>
            <div className="update-shoe-page__form">
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3  update-shoe-page__form__update">
                  <Form.Label className="update-shoe-page__form__label">
                    Tên sản phẩm
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChangeUpdateShoeForm}
                  />
                </Form.Group>

                <Form.Group className="mb-3 update-shoe-page__form__update">
                  <img src={`${pathImg}/${fileImg}`} alt="Ảnh sản phẩm" />
                  <input
                    type="file"
                    name="fileImg"
                    onChange={(event) => onChangeUploadFile(event)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 update-shoe-page__form__update">
                  <Form.Label className="update-shoe-page__form__label">
                    Loại giày
                  </Form.Label>
                  <Form.Select
                    type="text"
                    placeholder="Loại giày"
                    name="category"
                    required
                    value={category?._id}
                    onChange={onChangeUpdateShoeForm}
                  >
                    {categories?.results?.map((el) => {
                      return (
                        <React.Fragment key={el?._id}>
                          <option value={el?._id}>{el?.name}</option>
                        </React.Fragment>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 update-shoe-page__form__update">
                  <Form.Label className="update-shoe-page__form__label">
                    Màu sắc
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={color}
                    onChange={onChangeUpdateShoeForm}
                  />
                </Form.Group>
                <Form.Group className="mb-3 update-shoe-page__form__update">
                  <Form.Label className="update-shoe-page__form__label">
                    Giá bán
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={price}
                    onChange={onChangeUpdateShoeForm}
                  />
                </Form.Group>
                {(sizeUpdate || [])?.map((item, index) => {
                  return (
                    <React.Fragment key={item?._id}>
                      <Form.Group className="mb-3 update-shoe-page__form__size">
                        <div>
                          <Form.Label className="update-shoe-page__form__label">
                            Size
                          </Form.Label>
                          <Form.Select
                            type="text"
                            placeholder="Size"
                            className="size"
                            name="size"
                            required
                            value={item?.size?._id}
                            onChange={onChangeSize("size", item, index)}
                          >
                            {sizes?.results?.map((el) => {
                              return (
                                <React.Fragment key={el?._id}>
                                  <option value={el?._id}>
                                    {el?.sizeNumber}
                                  </option>
                                </React.Fragment>
                              );
                            })}
                          </Form.Select>
                        </div>

                        <div>
                          <Form.Label className="update-shoe-page__form__label">
                            Số lượng nhập
                          </Form.Label>
                          <Form.Control
                            className="quantity"
                            type="text"
                            name="quantity"
                            value={item?.quantity}
                            onChange={onChangeSize("quantity", item, index)}
                          />
                        </div>

                        <div>
                          <Form.Label className="update-shoe-page__form__label">
                            Tồn kho
                          </Form.Label>
                          <Form.Control
                            className="inStock"
                            type="text"
                            name="inStock"
                            value={item?.inStock}
                            onChange={onChangeSize("inStock", item, index)}
                          />
                        </div>
                      </Form.Group>
                    </React.Fragment>
                  );
                })}

                <Form.Group className="mb-3 update-shoe-page__form__description">
                  <Form.Label className="update-shoe-page__form__label">
                    Mô tả
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    className="update-shoe-page__form__description__input"
                    name="description"
                    value={description}
                    onChange={onChangeUpdateShoeForm}
                  />
                </Form.Group>

                <Button type="submit" className="update-shoe-page__form__btn">
                  Cập nhật
                </Button>
              </Form>
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

export default UpdateShoe;
