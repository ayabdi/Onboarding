import React, { useState, useEffect } from "react";
//import useEmailEditForm from "../formcontroller/useEmailEditForm";

import { getTime, getDate, format } from "date-fns";
const EditEmailModal = ({ show, close, emailForm, handleChange, onSubmits, render}) => {
  const [date, setDate] = useState(' ')
useEffect(() => {
  setDate(new Date(emailForm.date))
  console.log("email modal rendered")
}, [show])  


//Save Template Data

  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <p>Schedule an email</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>

      <div className="row">
        <div className="col left">
          <div className="modal-content column">
            <form
              className="modal-form"
              id="emailEditForm"
               onSubmit={(e) => onSubmits(e)}
            >
              <div className="form-group row">
                <div className="col-sm-6">
                  <label className="conrol-label">To</label>
                  <input
                   className="form-control text-box-sm"
                    value={emailForm.hire.name} 
                    readOnly
                  />
                </div>
                <div className="col-sm-6">
                  <label className="conrol-label">From</label>
                  <input
                    type="text"
                    className="form-control text-box-sm"
                    name="fromName"
                  value={emailForm.fromName}
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
                    
                  value={emailForm.subject}
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
                   value={emailForm.message}
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
                   value={emailForm.daysBefore}
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
                <p style={{ fontWeight: "bold" }}>To: </p> &nbsp; {emailForm.hire.name}
                {/* add to name */}
              </div>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>From: </p> &nbsp;
                {emailForm.fromName}
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
                {/* add subject*/} {emailForm.subject}
              </div>
              <div className="preview row">
                <br />
                {/* add message */}
                {emailForm.message}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          onClick={close}
          className="btn btn-primary btn-sm mod"
          style={{ backgroundColor: " #4a208e" }}
        >
          Close
        </button>
        <button
          type="submit"
          onClick = {() => {close(); render(true)}}
          form="emailEditForm"
          className="btn btn-primary btn-sm mod"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default EditEmailModal;