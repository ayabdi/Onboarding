import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../css/App.scss";

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
        <Modal.Body>
          <div>Are you sure you want to Delete This</div>
          <br></br>
          <div>
            <Button variant="secondary" className="btn gray block" onClick={handleClose}>Close</Button>
            <div class="btn-divider"/>
            <Button onClick={() => { handleClose(); Delete(ID); }} className="btn btn-primary btn mod">Delete</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;
