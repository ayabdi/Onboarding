import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Stepper from "./stepper/Stepper";
import useForm from "./formcontroller/useForm";
import SaveTemplateModal from "./Modals/SaveTemplateModal";
import validate from "./validation/validateForm";
import NewHireform from "./forms/NewHireform";
import "react-datepicker/dist/react-datepicker.css";
import useEmailForm from "./formcontroller/useEmailForm";

import useTaskForm from "./formcontroller/useTaskForm";
import Emails from "./forms/Emails";
import Tasks from "./forms/Tasks";
import Footer from "./forms/Footer";
import Header from "./forms/Header";

const NewHirePage = () => {
  const {
    handleChange,
    onSubmit,
    formData,
    errors,
    currentStep,
    increment,
    decrement,
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

  return (
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
          createTemplate = {createTemplate}
        />
      </div>
    </Fragment>
  );
};
export default NewHirePage;
