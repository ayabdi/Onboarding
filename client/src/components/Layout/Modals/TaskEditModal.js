import React, { useState } from "react";
import useTaskEditForm from "../formcontroller/useTaskEditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { getTime, getDate, addDays, format, parseISO } from "date-fns";
import moment from "moment";

const TaskEditModal = ({ hireForm, render, task }) => {
  const {
    handleTaskEdit,
    onTaskEdit,
    setTaskData,
    taskData,
    reminderArray,
  } = useTaskEditForm();
 
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  return (
    <>
      <FontAwesomeIcon
        icon={faEdit}
        style={{ marginTop: "50%" }}
        className="icons"
        onClick={() => {handleShow(); setTaskData(task)} }
      />
      <Modal
        show={show}
        onHide={handleClose}
        style={{ top: "33%", left: "8%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title> Create a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col left">
              <div className="modal-content column tasks">
                <form
                  className="modal-form"
                  id="taskDataEdit"
                  onSubmit={(e) => onTaskEdit(e)}
                >
                  <div className="form-group row">
                    <div className="col">
                      <label className="conrol-label">Task</label>
                      <input
                        className="form-control text-box-sm"
                        name="task"
                        value={taskData.task}
                        onChange={handleTaskEdit}
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
                        onChange={handleTaskEdit}
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
                        onChange={handleTaskEdit}
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
                        onChange={handleTaskEdit}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col">
                      <label className="conrol-label">Task Completed ?</label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={taskData.isCompleted}
                        value={taskData.isCompleted}
                        onChange={handleTaskEdit}
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
                        value={taskData.due_date}
                        onChange={handleTaskEdit}
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
                        onChange={handleTaskEdit}
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
                    <p className = 'preview-labels'>To: </p> &nbsp;{" "}
                    {taskData.to}
                    {/* add to name */}
                  </div>
                  <div className="preview row">
                    <p className = 'preview-labels'>From: </p> &nbsp;
                    {taskData.from}
                  </div>
                  <div className="preview row">
                    <p className = 'preview-labels'>Date: </p> &nbsp;
                    {reminderArray.map((reminder, i) => (
                      <div key={i}>
                        &nbsp;{i === 0 ? null : `  & `}
                        {i < 3
                          ? addDays(
                              moment(hireForm.startDate).toDate(),
                              -taskData.due_date - reminderArray[i]
                            ).toLocaleString("default", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : null}
                      </div>
                    ))}
                  </div>
                  <br />
                  <div className="preview row">
                    <p className = 'preview-labels'>Subject: </p> &nbsp;
                    Automated Email Reminder from {taskData.from}
                  </div>
                  <div className="preview row">
                    <br />
                    Task: {taskData.task} <br />
                    Due Date :{" "}
                    {addDays(
                      hireForm.startDate,
                      -taskData.due_date
                    ).toLocaleString("default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    <br />
                    {taskData.note}
                    {taskData.isCompleted}
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
            form="taskDataEdit"
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
export default TaskEditModal;
