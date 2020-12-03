import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const SaveTemplateModal = ({ save, isSubmitted }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const btnStyle = {
    width: "135px", height: '33px',
    padding: "0 5px",
    margin: "0px 12px 20px 10px",
    opacity: '0.6',
    pointerEvents: 'none'
  };
  const btnactive = {
    ...btnStyle, opacity:'1', pointerEvents: 'auto'
  }
  return (
    <>
      <button type="button" className="ob-btn formbtn" onClick={handleShow} style={isSubmitted? btnactive: btnStyle}>
        Save Workflow
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          top: "50%",
          left: "50%",
          width: "400px",
          padding: "0.7em",
          marginLeft: "-200px",
          marginTop: "-150px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are You Sure You Want To Save This As a Template?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn gray block"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              save();
            }}
            className="btn btn-primary btn mod"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaveTemplateModal;
