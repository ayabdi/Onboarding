import React, { Fragment, useState } from "react";
import PropTypes, { func } from "prop-types";
import DatePicker from "react-datepicker";

import Stepper from "../Stepper/Stepper";
import useForm from "../forms/useForm";
import ModalForm from "./ModalForm";
import axios from "axios";
import validate from "../forms/validateForm";

import 'react-datepicker/dist/react-datepicker.css'

const HireForm = () => {
  const { handleChange, onSubmit, formData, errors, currentStep } = useForm(
    submit,
    validate
  );
  const [isValid, setisValid] = useState(false);
  function submit() {
    console.log("Successfull Submitted");
    setisValid(true);
  }
  //modal form
  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);

  //     //set form Data
  //     const [formData, setFormData] = useState({
  //         name: '',
  //         email:'',
  //         job_title: '',
  //         department: '',
  //         hiring_manager: '',
  //         hm_email: ''
  //     });
  //    const{name, email, job_title, department, hiring_manager, hm_email} = formData;

  //     const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  //     const onSubmit = e => {
  //         e.preventDefault();
  //         createHire(formData)

  // const creatHire = {name, email, job_title, department, hiring_manager, hm_email}
  //     try {
  //         const config = {
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     }
  //     //Post to database
  //     const body = JSON.stringify(creatHire);

  //     const res = await axios.post('/hires', body, config);
  //     console.log(res.data);
  //     } catch (error) {
  //         console.error(error.response.data)
  //     }

  /// Stepper
  const stepsArray = [
    // "Create your account",
    "Add new hire information",
    "Schedule automated emails",
    "Create Tasks",
  ];

  //Date Picker
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Fragment>
      {show ? (
        <div onClick={closeModalHandler} className="back-drop"></div>
      ) : null}
      <ModalForm show={show} close={closeModalHandler} />
      <header>
        <div className="spacer">&nbsp;</div>
        <br />
        <br />

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
        >
          <h5 className="card-title ">New Hire Information</h5>
          <p className="card-text ">Please enter details for the new hires</p>
          <div className="container">
            <div className="row">
              <div className="col-md-10 custom">
                <form className="hire-form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">
                        Start Date
                      </label>
                    
                      <DatePicker
                      selected = {selectedDate}
                      onChange = {date => setSelectedDate(date)}
                      className = "form-control textbox-size" 
                      dateFormat="MMMM d, yyyy"
                     />
                    

                      {/* <input
                        type="text"
                        className=
                        name="name"
                       // value={formData.name}
                        onChange={handleChange}
                      /> */}
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
                onClick={() => setShow(true)}
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
          </div>
        </div>
        <div
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default HireForm;
