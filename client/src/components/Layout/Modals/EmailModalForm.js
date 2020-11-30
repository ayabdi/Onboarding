import React, { useState, useEffect } from "react";
import useEmailForm from "../formcontroller/useEmailForm";
import {Modal, Button} from "react-bootstrap";
const EmailModalForm = ({ hireForm, render, submitting , currentStep}) => {
  const { handleChange, setEmailData, emailData, onSubmit } = useEmailForm();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setEmailData((emailData) => ({
      ...emailData,
      to: hireForm.email,
      date: hireForm.startDate,
    }));
  }, [submitting, show]);

  return (
    <>
      <button
        onClick={handleShow}
        className={` ${
          currentStep === 2
           ? "ob-btn formbtn custom active"
            : "ob-btn formbtn custom"
        } ${
          currentStep > 2
            ? "ob-btn formbtn float-right remove-button"
            : "ob-btn formbtn custom"
        }`}
      >
        Schedule an Email
      </button>

      <Modal
      
        show={show}
        onHide={handleClose}
        
        style={{ top: "50%", left: "50%"  ,marginLeft: '-450px', marginTop: '-255.5px', width: '900px'}}
      >
        <Modal.Header closeButton>
          <Modal.Title> Schedule an email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="row">
            <div className="col left">
              <div className="modal-content column">
                <form
                  className="modal-form"
                  id="emailForm"
                  onSubmit={(e) => onSubmit(e)}
                >
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <label className="conrol-label">To</label>
                      <input
                        className="form-control text-box-sm"
                        value={hireForm.name}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                    <p className = 'preview-labels'>To: </p> &nbsp;{" "}
                    {hireForm.name}
                    {/* add to name */}
                  </div>
                  <div className="preview row">
                    <p className = 'preview-labels'>From: </p> &nbsp;
                    {emailData.fromName}
                  </div>
                  <div className="preview row">
                    <p className = 'preview-labels'>Date: </p> &nbsp;
                    {emailData.date.toLocaleString("default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {/* add date */}
                  </div>
                  <br />
                  <div className="preview row">
                    <p className = 'preview-labels'>Subject: </p> &nbsp;
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
            form="emailForm"
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
export default EmailModalForm;
