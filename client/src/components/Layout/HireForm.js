import React, { Fragment, useState , useEffect} from "react";
import DatePicker from "react-datepicker";
import { getTime, getDate, format } from "date-fns";

import Stepper from "./stepper/Stepper";
import useForm from "./formcontroller/useForm";
import EmailModalForm from "./EmailModalForm";
import TaskModalForm from "./TaskModalForm"
import EditEmailModal from "./EditEmailModal";
import TaskEditModal from "./TaskEditModal";
import validate from "./validation/validateForm";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import "react-datepicker/dist/react-datepicker.css";
import useEmailEditForm from "./formcontroller/useEmailEditForm";
import useTaskEditForm from "./formcontroller/useTaskEditForm";
import useTaskForm from "./formcontroller/useTaskForm";

const HireForm = () => {
  const {
    handleChange,
    onSubmit,
    formData,
    errors,
    currentStep,
    increment,
    decrement,
    emails,
    tasks,
    isSubmitting,
    deleteEmail,
    deleteTask
  } = useForm(submit, validate);
  
  const { handleEmailEdit, onEmailEdit, setEmailData, emailData} = useEmailEditForm();
  const { handleTaskEdit, onTaskEdit, setTaskData, taskData, reminderArray} = useTaskEditForm();

  //fet hire email for task editing

 

  const [isValid, setisValid] = useState(false);
  function submit() {
    console.log("Successfull Submitted");
    setisValid(true);
  }
  //email modal form
  const [showEmail, setShowEmail] = useState(false);
  const closeEmailModalHandler = () => setShowEmail(false);

  //edit email  modal form
  const [showEmailEdit, setShowEmailEdit] = useState(false);
  const closeEditEmailModalHandler = () => setShowEmailEdit(false);

  //task modal form
  const [showTask, setShowTask] = useState(false);
  const closeTaskModalHandler = () => setShowTask(false);

  //edit Task  modal form
  const [showTaskEdit, setShowTaskEdit] = useState(false);
  const closeEditTaskModalHandler = () => setShowTaskEdit(false);


  /// Stepper
  const stepsArray = [
    "Add new hire information",
    "Schedule automated emails",
    "Create Tasks",
  ];

  //Date Picker
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
       formData.startDate = new Date(getTime(selectedDate));
   }, [selectedDate]
   )

  
  
  
 
  return (
    <Fragment>
      {showEmail ? (
        <div onClick={closeEmailModalHandler} className="back-drop"></div>
      ) : null}
      <EmailModalForm
        show={showEmail}
        close={closeEmailModalHandler}
        hireForm={formData}
      />
      {showEmailEdit ? (
        <div onClick={closeEditEmailModalHandler} className="back-drop"></div>
      ) : null}
      <EditEmailModal
        show={showEmailEdit}
        close={closeEditEmailModalHandler}
        emailForm={emailData}
         handleChange = {handleEmailEdit}
         onSubmits = {onEmailEdit}
     />
      {showTask ? (
        <div onClick={closeTaskModalHandler} className="back-drop"></div>
      ) : null}
      <TaskModalForm
        show={showTask}
        close={closeTaskModalHandler}
        hireForm={formData}
        date = {selectedDate}
      />
       {showTaskEdit ? (
        <div onClick={closeEditTaskModalHandler} className="back-drop"></div>
      ) : null}
      <TaskEditModal
        show={showTaskEdit}
        close={closeEditTaskModalHandler}
        taskForm={taskData}
        hireForm={formData}
         handleChange = {handleTaskEdit}
         onSubmit = {onTaskEdit}
         reminderArr={reminderArray}
     />

      <header>
        <div className="spacer">&nbsp;</div>
        <br />
        <br /> <br/>

        <div className="container-small">Jane Doe's Workflow</div>
      </header>
      <div className="stepper-container-horizontal">
        <Stepper
          direction="horizontal"
          currentStepNumber={currentStep - 1}
          steps={stepsArray}
          stepColor="purple"
        />
      </div>

      <div className="card" style={{ width: "53rem" }}>
        <div
          className={`card-body  ${
            currentStep === 1 ? "card-body-active" : "card-body"
          }  }`}
           onClick={(e) => decrement(e)}
        >
          <h5 className="card-title ">New Hire Information</h5>
          <p className="card-text ">Please enter details for the new hires</p>
          <div className="container">
            <div className="row">
              <div className="col-md-10 custom">
                <form className="hire-form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">Start Date</label>

                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(getTime(date))}
                        className="form-control textbox-size"
                        dateFormat="MMMM dd,yyyy"
                      />
                      {errors.startDate && <p>{errors.startDate}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">
                        New Hire's Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">New Hire's email</label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                      />
                      {errors.email && <p>{errors.email}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">Job Title</label>
                      <input
                        type="text"
                        className="form-control textbox-size "
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                      />
                      {errors.job_title && <p>{errors.job_title}</p>}
                    </div>
                    
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">Department</label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      />
                      {errors.department && <p>{errors.department}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">Hiring Manager</label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        name="hiring_manager"
                        value={formData.hiring_manager}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">
                        Hiring Manager's Email
                      </label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        name="hm_email"
                        value={formData.hm_email}
                        onChange={handleChange}
                      />
                    </div>
                    <div></div>
                    <button
                      type="submit"
                      className={`"btn btn-primary px-4 float-right"  ${
                        currentStep === 1
                          ? "btn btn-primary px-4 float-right"
                          : "btn btn-primary px-4 float-right remove-button"
                      }  }`}
                    >
                      {" "}
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`card-body  ${
            currentStep === 2 ? "card-body-active" : "card-body"
          }  }`}
        >
          <div className="row">
            <div className="col-sm-7">
              <h5 className="card-title ">Automated Emails</h5>
              <p className="card-text ">
                Schedule emails to be sent out automatically
              </p>
            </div>
            <div className="col-sm-3 float-right">
              <button
                onClick={() => setShowEmail(true)}
                className={`btn btn-primary px-4 custom ${
                  currentStep === 2
                    ? "btn btn-primary px-4 custom active "
                    : `btn btn-primary px-4 custom`
                } ${
                  currentStep > 2
                    ? "btn btn-primary px-4 float-right remove-button"
                    : ""
                }`}
              >
                Schedule an Email
              </button>
            </div>

            <>{ emails.length >0 ? (
               <div className="container email-preview-titles">
                <div className="row email-preview">
                  <div
                    className="col-sm-3 email-titles"
                    style={{ margin: "8px" }}
                  >
                    Subject
                  </div>
                  <div
                    className="col-sm-3 email-titles"
                    style={{ margin: "8px" }}
                  >
                    To
                  </div>
                  <div
                    className="col-sm-3 email-titles"
                    style={{ margin: "8px" }}
                  >
                    Scheduled For
                  </div>
                </div>
              </div> 
            ) : null
} 
              {emails.map((email, i) => (
                
                <div key={i} className="container email-preview">
                  <div className="row email-preview">
                    <div className="col-sm-3 email-preview">
                      {email.subject}
                    </div>
                    <div
                      className="col-sm-3 email-preview"
                      style={{ margin: "8px" }}
                    >
                      {email.hire.name}
                      <br />
                      <div className="email">{email.to}</div>
                    </div>
                    <div className="col-sm-3 email-preview">
                      {" "}
                      {email.daysBefore} Days before
                    </div>

                    <div className="col-xs">
                    <FontAwesomeIcon icon={faEdit} style = {{marginTop: '50%'}} className = "icons" onClick= {() => {setShowEmailEdit(true);  setEmailData(email)}}/> &nbsp;
                    <FontAwesomeIcon icon={faTrash} style = {{marginTop: '50%'}} className = "icons" onClick= {()=> deleteEmail(email._id)} /> 
                    </div>  
                 
                  </div>
                </div>
              ))}{" "}
            </>
          </div>
        </div>
        <div
         
          onClick = {currentStep ===2 ? ( (e) => increment(e)) : null }
          className={`card-body  ${
            currentStep === 3 ? "card-body-active" : "card-body"
          }  }`}
        >
          <div className="row">
            <div className="col-md-10">
              <h5 className="card-title ">Tasks</h5>
              <p className="card-text ">
                Email reminders will be sent out in # of days before task due
                date, if not completed
              </p>
            </div>
            <div className="col-sm-3 float-right">
              <button
                onClick={() => setShowTask(true)}
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
            <>{ tasks.length >0 ? (
               <div className="container email-preview-titles">
                <div className="row email-preview">
                  <div
                    className="col-sm-3 email-titles"
                    style={{ margin: "8px" }}
                  >
                    Task
                  </div>
                  <div
                    className="col-sm-3 email-titles"
                    style={{ margin: "8px" }}
                  >
                    Person Responsible
                  </div>
                  <div
                    className="col-sm-3 email-titles"
                    style={{ margin: "8px" }}
                  >
                    Due Date
                  </div>
                </div>
              </div> 
            ) : null
} 
              {tasks.map((task, i) => (
                
                <div key={i} className="container email-preview">
                  <div className="row email-preview">
                    <div className="col-sm-3 email-preview">
                      {task.task}
                    </div>
                    <div
                      className="col-sm-3 email-preview"
                      style={{ margin: "8px" }}
                    >
                      {task.to}
                      <br />
                      <div className="email">{task.to_email}</div>
                    </div>
                    <div className="col-sm-3 email-preview">
                      {" "}
                      {task.due_date} Days before
                    </div>

                    <div className="col-xs">
                    <FontAwesomeIcon icon={faEdit} style = {{marginTop: '50%'}} className = "icons" onClick= {() => {setShowTaskEdit(true);  setTaskData(task)}} /> &nbsp;
                    <FontAwesomeIcon icon={faTrash} style = {{marginTop: '50%'}} className = "icons" onClick= {()=> deleteTask(task._id)}  /> 
                    </div>  
                 
                  </div>
                </div>
              ))}{" "}
            </>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default HireForm;
