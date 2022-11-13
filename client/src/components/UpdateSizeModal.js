import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useEffect, useState } from "react";

import { SizeContext } from "../contexts/SizeContext";

const UpdateSizeModal = () => {
  //! Contexts
  const {
    sizeState: { size },
    showUpdateSizeModal,
    setShowUpdateSizeModal,
    updateSize,
    setShowToast,
  } = useContext(SizeContext);

  // State
  const [updatedSize, setUpdatedSize] = useState(size);

  useEffect(() => setUpdatedSize(size), [size]);

  const { sizeNumber } = updatedSize;

  const onChangeUpdatedSizeForm = (event) =>
    setUpdatedSize({
      ...updatedSize,
      [event.target.name]: event.target.value,
    });

  const closeDialog = () => {
    setUpdatedSize(size);
    setShowUpdateSizeModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateSize(updatedSize);
    setShowUpdateSizeModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

 

  return (
    <Modal show={showUpdateSizeModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa kích cỡ</Modal.Title>
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
              onChange={onChangeUpdatedSizeForm}
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

export default UpdateSizeModal;
