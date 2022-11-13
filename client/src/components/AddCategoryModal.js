import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useEffect, useState } from "react";

import { CategoryContext } from "../contexts/CategoryContext";

const AddCategoryModal = () => {
  // Contexts
  const {
    showAddCategoryModal,
    setShowAddCategoryModal,
    addCategory,
    setShowToast,
  } = useContext(CategoryContext);

  // State
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const { name } = newCategory;

  const onChangeNewCategoryForm = (event) =>
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddCategoryData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addCategory(newCategory);
    resetAddCategoryData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddCategoryData = () => {
    setNewCategory({ name: "" });
    setShowAddCategoryModal(false);
  };

  return (
    <Modal show={showAddCategoryModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới loại giày</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Tên loại giày"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeNewCategoryForm}
            />
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

export default AddCategoryModal;
