import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useEffect, useState } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import { SizeContext } from "../contexts/SizeContext";
import { CategoryContext } from "../contexts/CategoryContext";

const AddShoeModal = () => {
  //! Contexts
  const { showAddShoeModal, setShowAddShoeModal, addShoe, setShowToast } =
    useContext(ShoeContext);

  const {
    sizeState: { sizes },
    getAllSizes,
  } = useContext(SizeContext);

  const {
    categoryState: { categories },
    getAllCategories,
  } = useContext(CategoryContext);

  useEffect(() => {
    getAllSizes();
    getAllCategories();
  }, []);

  console.log("__sizes", sizes);
  console.log("__catego", categories);

  //! State
  const [newShoe, setNewShoe] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    color: "",
    sizes: [],
    category: "",
  });

  const [fileImg, setFileImg] = useState("");

  const [sizeState, setSizeState] = useState({
    size: "",
    quantity: "",
  });

  const { name, price, description, color, category } = newShoe;
  const { size, quantity } = sizeState;

  const onChangeNewShoeForm = (event) =>
    setNewShoe({ ...newShoe, [event.target.name]: event.target.value });

  const onChangeSize = (event) => {
    setSizeState({ ...sizeState, [event.target.name]: event.target.value });
  };

  const onChangeUploadFile = (event) => {
    let files = event.target.files[0];

    setFileImg(files);
  };

  const closeDialog = () => {
    resetAddShoeData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log("__fileImg", fileImg);
    formData.append("name", name);
    formData.append("image", fileImg);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("category", category.toString());
    const sizes = [{ size: size, quantity: quantity }];
    sizes.forEach((el, index) => {
      formData.append(`sizes[${index}][size]`, el.size.toString());
      formData.append(`sizes[${index}][quantity]`, el.quantity);
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { success, message } = await addShoe(formData, config);
    resetAddShoeData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddShoeData = () => {
    setNewShoe({
      name: "",
      image: "",
      price: "",
      description: "",
      color: "",
      category: "",
      sizes: [],
    });
    setSizeState({ size: "", quantity: "" });
    setShowAddShoeModal(false);
  };

  return (
    <Modal show={showAddShoeModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Họ tên"
              name="name"
              required
              value={name}
              onChange={onChangeNewShoeForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <input
              type="file"
              name="image"
              onChange={(event) => onChangeUploadFile(event)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Màu sắc"
              name="color"
              required
              value={color}
              onChange={onChangeNewShoeForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Giá bán"
              name="price"
              required
              value={price}
              onChange={onChangeNewShoeForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              type="text"
              placeholder="Size"
              name="size"
              required
              value={size}
              onChange={onChangeSize}
            >
              {" "}
              <option>Chọn size</option>
              {sizes?.map((el) => {
                return (
                  <React.Fragment key={el?._id}>
                    <option value={el?._id}>{el?.sizeNumber}</option>
                  </React.Fragment>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Số lượng"
              name="quantity"
              required
              value={quantity}
              onChange={onChangeSize}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Mô tả"
              name="description"
              value={description}
              onChange={onChangeNewShoeForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              type="text"
              placeholder="Loại giày"
              name="category"
              required
              value={category}
              onChange={onChangeNewShoeForm}
            >
              <option>Chọn loại giày</option>
              {categories?.map((el) => {
                return (
                  <React.Fragment key={el?._id}>
                    <option value={el?._id}>{el?.name}</option>
                  </React.Fragment>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Thêm
          </Button>
          <Button variant="secondary" onClick={closeDialog}>
            Huỷ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddShoeModal;
