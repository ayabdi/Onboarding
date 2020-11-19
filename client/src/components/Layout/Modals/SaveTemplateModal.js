import React , {useState} from "react";
import { Modal, Button } from "react-bootstrap";

const SaveTemplateModal = ({ save , isSubmitted}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button
          type="button"
          className={
            isSubmitted
              ? `btn btn-primary px-4 custom active`
              : `btn btn-primary px-4 custom`
          }
          onClick={handleShow}
        >
          Save Workflow
        </Button>
        <Modal
        show={show}
        onHide={handleClose}
        style={{ top: "50%", left: "50%" , width: '400px', padding: '0.7em' ,marginLeft: '-200px', marginTop: '-150px'}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want To Save This As a Template?</Modal.Body>
        <Modal.Footer >
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
              save()
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
