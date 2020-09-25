import React, { useState } from "react";
import useTaskEditForm from "../formcontroller/useTaskEditForm";

import { getTime, getDate, addDays, format, parseISO } from "date-fns";
import moment from 'moment'

const TaskEditModal = ({ show, close, taskForm, hireForm, handleChange, onSubmit, setIsEdit, reminderArr, render}) => {
  
  

   
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <p>Create a Task</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>

      <div className="row">
        <div className="col left">
          <div className="modal-content column tasks">
            <form
              className="modal-form"
              id="taskFormEdit"
              onSubmit={(e) => onSubmit(e)}
            >
              <div className="form-group row">
                <div className="col">
                  <label className="conrol-label">Task</label>
                  <input
                   className="form-control text-box-sm"
                   name = "task"
                   value={taskForm.task} 
                   onChange = {handleChange}
                    
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label className="conrol-label">Person responsible</label>
                  <input
                    type="text"
                    className="form-control text-box-sm"
                    name="to"
                    value={taskForm.to}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label className="conrol-label">Email address</label>
                  <input
                    type="text"
                    className="form-control text-box-sm"
                    name="to_email"
                    value={taskForm.to_email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label className="conrol-label">Note</label>
                  <textarea
                    type="textarea"
                    className="form-control text-box-med"
                    name="note"
                    value={taskForm.note}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label className="conrol-label">Task Completed ?</label>
                  <input
                    type="checkbox"
                    className = "checkbox"
                    checked = {taskForm.isCompleted}
                    value={taskForm.isCompleted}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>    
                  

              <div className="form-group row">
                <div className="col">
                  
                  <label className="conrol-label">Due Date</label>
                  <input
                    type="text"
                    className="form-control text-box-sml"
                    name="due_date"
                    value={taskForm.due_date}
                    onChange={handleChange}
                  />{" "}
                  &nbsp; Days before start date
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                
                  <label className="conrol-label">Set Reminder</label>
                  <input
                    type="text"
                    className="form-control text-box-sml"
                    name="reminder"
                    value={taskForm.reminder}
                    onChange={handleChange}
                  />{" "}
                  &nbsp; Days before start date
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col right">
          <div className="modal-content column tasks">
            <div className="modal-content row">Preview email reminder</div>
            <div className="modal-content row" style={{ border: "0" }}>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>To: </p> &nbsp; {taskForm.to}
                {/* add to name */}
              </div>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>From: </p>  &nbsp;
                {taskForm.from}
              </div>
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>Date: </p> &nbsp; 
                {reminderArr.map((reminder, i) => (
                  
                <div key = {i}> 
                &nbsp;{i===0? null : `  & ` }
                  { i<3? addDays(moment(parseISO(hireForm.startDate)).toDate(), (-taskForm.due_date- reminderArr[i]) ).toLocaleString("default", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }): null} 
                
                </div> 
                )  ) 
                
                }
              
                
              </div>
              <br />
              <div className="preview row">
                <p style={{ fontWeight: "bold" }}>Subject: </p> &nbsp;
                Automated Email Reminder from {taskForm.from}
              </div>
              <div className="preview row">
                <br />
                Task: {taskForm.task} <br/>
                Due Date : {addDays(parseISO(hireForm.startDate), -taskForm.due_date).toLocaleString("default", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })} <br/>
                {taskForm.note}

                {taskForm.isCompleted}
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
          form="taskFormEdit"
          className="btn btn-primary btn-sm mod"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default TaskEditModal;