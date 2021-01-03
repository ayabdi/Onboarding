import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

import Stepper from "./stepper/Stepper";
import useForm from "./formcontroller/useForm";
import validate from "./validation/validateForm";
import NewHireform from "./forms/NewHireform";
import "react-datepicker/dist/react-datepicker.css";
import useEmailForm from "./formcontroller/useEmailForm";

import useTaskForm from "./formcontroller/useTaskForm";
import Emails from "./forms/Emails";
import Tasks from "./forms/Tasks";
import Footer from "./forms/Footer";
import Header from "./forms/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";

const NewHirePage = () => {
  useEffect(() => { 
    document.title = "Harmonize | Hire";
  }, []);

  const {
    handleChange,
    onSubmit,
    formData,
    errors,
    currentStep,
    setCount,
    templateData,
    emails,
    tasks,
    isSubmitting,
    isSubmitted,
    deleteEmail,
    setRenderEmails,
    deleteTask,
    setRenderTasks,
    setTemplateName,
    templateName,
    createTemplate,
    newTemplateData,
  } = useForm(submit, validate);

  const location = useLocation();

  //form controllers
  const { scheduleEmails } = useEmailForm();
  const { scheduleTasks } = useTaskForm();

  const [isValid, setisValid] = useState(false);
  function submit() {
    console.log("Successfull Submitted");
    setisValid(true);
  }

  /// Stepper
  const stepsArray = [
    "Add new hire information",
    "Schedule automated emails",
    "Create Tasks",
  ];

  const hirepage = (
    <Fragment>
      <Header
        setTemplateName={setTemplateName}
        templateName={templateName}
        templateData={templateData}
        location={location}
      />
      <Stepper
        direction="horizontal"
        currentStepNumber={currentStep - 1}
        steps={stepsArray}
        stepColor="purple"
      />
      <Container style={{ margin: "0 auto", width: "53rem" }}>
        <Row>
          <Col
            style={{
              marginBottom: "20px",
              maxWidth: "125px",
              height: "20px",
              padding: "0",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            <Link to="/workflow" className="link">
              <FontAwesomeIcon
                icon={faAngleDoubleLeft}
                style={{ height: "20px", width: "18px", margin: "auto" }}
              />{" "}
               Previous
            </Link>
          </Col>
        </Row>
      </Container>

      <div className="card" style={{ width: "53rem" }}>
        <NewHireform
          handleChange={handleChange}
          onSubmit={onSubmit}
          formData={formData}
          errors={errors}
          currentStep={currentStep}
          setCount={setCount}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
        />
        <Emails
          currentStep={currentStep}
          setCount={setCount}
          formData={formData}
          setRenderEmails={setRenderEmails}
          emails={emails}
          deleteEmail={deleteEmail}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
        />
        <Tasks
          currentStep={currentStep}
          setCount={setCount}
          formData={formData}
          setRenderTasks={setRenderTasks}
          tasks={tasks}
          deleteTask={deleteTask}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
        />
        <Footer
          scheduleEmails={scheduleEmails}
          emails={emails}
          scheduleTasks={scheduleTasks}
          tasks={tasks}
          isSubmitted={isSubmitted}
          createTemplate={createTemplate}
        />
      </div>
    </Fragment>
  );

  const access_token = localStorage.getItem("ACCESS_TOKEN");
  const refresh_token = localStorage.getItem("REFRESH_TOKEN");

  if (access_token === null || refresh_token === null) {
    window.location = "/login";
    return (null);
  }

  return (
    <Fragment>
      {location.state != null ? hirepage : <Redirect to="/workflow" />}
    </Fragment>
  );
};
export default NewHirePage;
