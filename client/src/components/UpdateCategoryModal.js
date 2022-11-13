import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useEffect, useState } from "react";

import { CategoryContext } from "../contexts/CategoryContext";

const UpdateCategoryModal = () => {
  // Contexts
  const {
    categoryState: { category },
    showUpdateCategoryModal,
    setShowUpdateCategoryModal,
    updateCategory,
    setShowToast,
  } = useContext(CategoryContext);

  // State
  const [updatedCategory, setUpdatedCategory] = useState(category);

  useEffect(() => setUpdatedCategory(category), [category]);

  const { name } = updatedCategory;

  const onChangeUpdatedCategoryForm = (event) =>
    setUpdatedCategory({
      ...updatedCategory,
      [event.target.name]: event.target.value,
    });

  const closeDialog = () => {
    setUpdatedCategory(category);
    setShowUpdateCategoryModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateCategory(updatedCategory);
    setShowUpdateCategoryModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  //   const resetAddCategoryData = () => {
  //     setNewCategory({ name: "" });
  //     setShowAddCategoryModal(false);
  //   };

  return (
    <Modal show={showUpdateCategoryModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa loại giày</Modal.Title>
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
              onChange={onChangeUpdatedCategoryForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Cập nhật
          </Button>
          <Button variant="secondary" onClick={closeDialog}>
            Huỷ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
