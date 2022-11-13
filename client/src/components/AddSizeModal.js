import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useEffect, useState } from "react";

import { SizeContext } from "../contexts/SizeContext";

const AddSizeModal = () => {
  //! Contexts
  const { showAddSizeModal, setShowAddSizeModal, addSize, setShowToast } =
    useContext(SizeContext);

  // State
  const [newSize, setNewSize] = useState({
    sizeNumber: "",
  });

  const { sizeNumber } = newSize;

  const onChangeNewSizeForm = (event) =>
    setNewSize({ ...newSize, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddSizeData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addSize(newSize);
    resetAddSizeData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddSizeData = () => {
    setNewSize({ name: "" });
    setShowAddSizeModal(false);
  };

  return (
    <Modal show={showAddSizeModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới kích cỡ</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Tên kích cỡ"
              name="sizeNumber"
              required
              aria-describedby="title-help"
              value={sizeNumber}
              onChange={onChangeNewSizeForm}
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

export default AddSizeModal;
