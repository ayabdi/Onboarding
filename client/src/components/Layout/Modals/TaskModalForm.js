import React, { useEffect, useState } from "react";
import useTaskForm from "../formcontroller/useTaskForm";
import {addDays, compareDesc} from 'date-fns'
import {Modal, Button} from "react-bootstrap";
import moment from 'moment'
const TaskModalForm = ({  hireForm , render, currentStep}) => {
  const { handleChange, taskData,setTaskData, onSubmit, setReminderArr, reminderArr} = useTaskForm();
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    setTaskData({...taskData, hire_email: hireForm.email})

  }, [show])
 // console.log(addDahireForm.startDate)
 

  return (
    <>
      <div className="col-sm-3 float-right">
              <button
                onClick={handleShow}
                type="button"
                className={`btn btn-primary px-4 custom ${
                  currentStep === 3
                    ? "btn btn-primary px-4 custom active "
                    : `btn btn-primary px-4 custom`
                } `}
              >
                Create a task
              </button>
            </div>
     <Modal
        show={show}
        onHide={handleClose}
        style={{ top: "50%", left: "50%"  ,marginLeft: '-450px', marginTop: '-255.5px', width: '900px'}}
      >
        <Modal.Header closeButton>
          <Modal.Title> Create a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <div className="row">
        <div className="col left">
          <div className="modal-content column">
            <form
              className="modal-form"
              id="taskForm"
              onSubmit={(e) => onSubmit(e)}
            >
              <div className="form-group row">
                <div className="col">
                  <label className="conrol-label">Task</label>
                  <input
                   className="form-control text-box-sm"
                   name = "task"
                   value={taskData.task} 
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
                    value={taskData.to}
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
                    value={taskData.to_email}
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
                    value={taskData.note}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  
                  <label className="conrol-label">Due Date</label>
                  <input
                    type="text"
                    className="form-control text-box-sml"
                    name="due_date"
                    value={taskData.due_date}
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
                    value={taskData.reminder}
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
            <div className="modal-content row">Preview email reminder</div>
            <div className="modal-content row" style={{ border: "0" }}>
              <div className="preview row">
                <p className = 'preview-labels'>To: </p> &nbsp; {taskData.to}
                {/* add to name */}
              </div>
              <div className="preview row">
                <p className = 'preview-labels'>From: </p>  &nbsp;
                {taskData.from}
              </div>
              <div className="preview row">
                <p className = 'preview-labels'>Date: </p> &nbsp; 
                {reminderArr.map((reminder, i) => (
                  
                <div key = {i}> 
                &nbsp;{i===0? null : `  & ` }
                  { i<3? addDays(hireForm.startDate, (-reminderArr[i]-taskData.due_date)).toLocaleString("default", {
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
                <p className = 'preview-labels'>Subject: </p> &nbsp;
                Automated Email Reminder from {taskData.from}
              </div>
              <div className="preview row">
                <br />
                Task: {taskData.task} <br/>
                Due Date : {addDays(hireForm.startDate, -taskData.due_date).toLocaleString("default", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })} <br/>
                {taskData.note}
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
            form="taskForm"
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
export default TaskModalForm;