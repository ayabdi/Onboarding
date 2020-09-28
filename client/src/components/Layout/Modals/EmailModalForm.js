import React, { useState, useEffect } from "react";
import useEmailForm from "../formcontroller/useEmailForm";
const EmailModalForm = ({ show, close, hireForm, render, submitting }) => {
  const { handleChange, setEmailData,emailData, onSubmit} = useEmailForm();
 // console.log('email modal rendered')
  //set emailData to 
 //emailData.to = hireForm.email;


  // get  startDate and convert to date
 // emailData.date = hireForm.startDate;

useEffect(() => {
  
  setEmailData(emailData => ({...emailData , to :hireForm.email, date: hireForm.startDate}))
 // console.log(emailData)
}, [submitting, show]) 

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
                <p style={{ fontWeight: "bold" }}>To: </p> &nbsp; {hireForm.name}
                {/* add to name */}
              </div>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>From: </p> &nbsp;
                {emailData.fromName}
              </div>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>Date: </p> &nbsp;
                {emailData.date.toLocaleString("default", {
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
          form="emailForm"
          className="btn btn-primary btn-sm mod"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default EmailModalForm;