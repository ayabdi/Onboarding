import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const DeleteModal = ({ ID, Delete }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FontAwesomeIcon
        icon={faTrash}
        style={{ marginTop: "50%" }}
        className="icons"
        onClick={handleShow}
      />

      <Modal
        show={show}
        onHide={handleClose}
        style={{ top: "50%", left: "50%" , width: '400px', padding: '0.7em' ,marginLeft: '-200px', marginTop: '-150px'}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete This</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn gray block"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              handleClose();
              Delete(ID);
            }}
            className="btn btn-primary btn mod"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
