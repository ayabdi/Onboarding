import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {Modal, Button} from "react-bootstrap";
import useEmailEditForm from "../formcontroller/useEmailEditForm";
//import useEmailEditForm from "../formcontroller/useEmailEditForm";

import { getTime, getDate, format } from "date-fns";
const EditEmailModal = ({ render, email}) => {

  const {
    handleEmailEdit,
    onEmailEdit,
    setEmailData,
    emailData,
  } = useEmailEditForm();

  const [date, setDate] = useState(' ')
useEffect(() => {
  setDate(new Date(emailData.date))
 // console.log("email modal rendered")
}, [])  

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


  return (
    <>
    <FontAwesomeIcon icon={faEdit} style = {{marginTop: '50%'}} className = "icons" onClick= {() => {handleShow() ; setEmailData(email)}}/> &nbsp;
    <Modal
      show={show}
      onHide={handleClose}
      style={{ top: "33%", left: "8%" }}
    >
      <Modal.Header closeButton>
        <Modal.Title> Schedule an email</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <div className="row">
        <div className="col left">
          <div className="modal-content column">
            <form
              className="modal-form"
              id="emailEditForm"
               onSubmit={(e) => onEmailEdit(e)}
            >
              <div className="form-group row">
                <div className="col-sm-6">
                  <label className="conrol-label">To</label>
                  <input
                   className="form-control text-box-sm"
                    value={emailData.hire.name} 
                    readOnly
                  />
                </div>
                <div className="col-sm-6">
                  <label className="conrol-label">From</label>
                  <input
                    type="text"
                    className="form-control text-box-sm"
                    name="fromName"
                   value={emailData.fromName}
                    onChange={handleEmailEdit}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label className="conrol-label">Subject</label>
                  <input
                    type="text"
                    className="form-control text-box-sm"
                    name="subject"
                    
                  value={emailData.subject}
                    onChange={handleEmailEdit}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label className="conrol-label">Message</label>
                  <textarea
                    type="textarea"
                    className="form-control text-box-large"
                    name="message"
                   value={emailData.message}
                    onChange={handleEmailEdit}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <br />
                  <label className="conrol-label">Send email:</label>
                  <input
                    type="text"
                    className="form-control text-box-sml"
                    name="daysBefore"
                   value={emailData.daysBefore}
                    onChange={handleEmailEdit}
                  />{" "}
                  &nbsp; Days before start date
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col right">
          <div className="modal-content column">
            <div className="modal-content row">Preview Email</div>
            <div className="modal-content row" style={{ border: "0" }}>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>To: </p> &nbsp; {emailData.hire.name}
                {/* add to name */}
              </div>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>From: </p> &nbsp;
                {emailData.fromName}
              </div>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>Date: </p> &nbsp;
                {date.toLocaleString("default", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {/* add date */}
              </div>
              <br />
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>Subject: </p> &nbsp;
                {/* add subject*/} {emailData.subject}
              </div>
              <div className="preview row">
                <br />
                {/* add message */}
                {emailData.message}
              </div>
            </div>
          </div>
        </div>
      </div>
      </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn gray block"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="btn btn-primary btn-sm mod"
            type="submit"
            form="emailEditForm"
            onClick={() => {
              handleClose();
              render(true);
            }}
          >
            Schedule
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditEmailModal;