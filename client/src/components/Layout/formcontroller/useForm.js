import { useState, useEffect } from "react";
import axios from "axios";

const useForm = (callback, validate) => {
  //set form Data
  const [formData, setFormData] = useState({
    startDate: " ",
    name: " John Doe",
    email: "johnedoe@gmail.com",
    job_title: "Developer",
    department: "Engineering",
    hiring_manager: "Tom Hall",
    hm_email: "tommhall@harmonize.hq",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //set Template Data
  const [templateData, fetchTemplateData] = useState({
    name: "",
    emails: [{}],
    tasks: [{}],
  });

  //Create Template Data
  const [newTemplateData, setNewTemplateData] = useState({
    name: "",
    emails: [{ subject: "", daysBefore: " ", message: " " }],
    tasks: [
      { task: "", note: "", due_date: "", reminder: "", to: "", to_email: "" },
    ],
  });
  /// Stepper
  const [currentStep, setCount] = useState(1);

  const increment = () => {
    if (currentStep > 0 && currentStep < 3) {
      setCount(currentStep + 1);
    }
  };
  const decrement = (event) => {
    if (currentStep > 1 && currentStep <= 3) setCount(currentStep - 1);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hireID, fetchHireID] = useState({ _id: " " });

  const onSubmit = async (e) => {
    e.preventDefault();
    //handle errors
    setIsSubmitting(true);
    setErrors(validate(formData));
    if (!isSubmitted) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(formData);
        const res = await axios.post("api/hires", body, config);
        setIsSubmitted(true);
        console.log(res.data);
        setErrors({});
      } catch (error) {
        //  console.error(error.response.data.errors[0].msg);
        setIsSubmitted(true);
        //  setErrors((errors)=> ({...errors, email: error.response.data.errors[0].msg}))
      }
      console.log(errors);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      callback();
      //move to next step
      increment();
      console.log("errors");
    }
  }, [errors]);

  //Fetching Emails
  const [emails, setEmails] = useState([]);
  const [renderEmails, setRenderEmails] = useState(false);

  const fetchEmails = async () => {
    setRenderEmails(false);
    await axios({
      method: "GET",
      url: `api/emails/find/${formData.email}`,
    }).then((res) => {
      setEmails(res.data);
    });
  };
  useEffect(() => {
    if (isSubmitted) {
      fetchEmails(emails);
    }
  }, [isSubmitting, renderEmails, currentStep]);

  //Delete Email
  const deleteEmail = async (emailID) => {
    await axios.delete(`api/emails/${emailID}`).then((res) => {
      setRenderEmails(true);
    });
  };

  //Fetching Tasks
  const [tasks, setTasks] = useState([]);
  const [renderTasks, setRenderTasks] = useState(false);
  const fetchTasks = async () => {
    if (isSubmitting) {
      await axios({
        method: "GET",
        url: `api/hires/${formData.email}`,
      }).then((res) => {
        fetchHireID(res.data[0]);
        // console.log(hireID);
        if (res.data[0] != null) {
          axios({
            method: "GET",
            url: `api/tasks/find/${res.data[0]._id}`,
          }).then((res2) => {
            setTasks(res2.data);
          });
        }
        setRenderTasks(false);
      });
    }
  };
  useEffect(() => {
    fetchTasks(tasks);
  }, [isSubmitting, renderTasks]);

  //Delete tasks
  const deleteTask = async (taskID) => {
    await axios.delete(`api/tasks/${taskID}`).then((res) => {
      setRenderTasks(true);
    });
  };

  //function to post template email
  const [test, settest] = useState();
  const [emailTemplates, setEmailTemplates] = useState({ emails: [] });
  const [taskTemplates, setTaskTemplates] = useState({ tasks: [] });
  const addEmailTemplate = (res) => {
    var emails = res.data[0].emails;
    emails.map(async (email) => [
      (email.date = formData.startDate),
      (email.from = "Tom Hall"),
      (email.to = formData.email),

      await axios.post("api/emails", email).then((res2) => {
        console.log(res2.data);
        console.log("template Emails posted");
      }),
    ]);

    setRenderEmails(true);
  };

  const addTaskTemplate = (res) => {
    var tasks = res.data[0].tasks;
    tasks.map(async (task) => [
      (task.isCompleted = false),
      (task.from = "Tom Hall"),
      (task.hire_email = formData.email),

     await axios.post("api/tasks", task).then((res) => {
        console.log(res.data);
        console.log("template tasks posted");
      }),
    ]);
    setRenderTasks(true);
  };

  //fetch selected template data
  const fetchtemplate = async () => {
    try {
      await axios({
        method: "GET",
        url: `api/templates/name/${templateData.name}`,
      }).then((res) => {
        addEmailTemplate(res);
        addTaskTemplate(res);
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    if (isSubmitted) {
      fetchtemplate();
    }
  }, [isSubmitting, isSubmitted]);

  //Creating Templates
  const [templateName, setTemplateName] = useState();
  const createTemplate = async () => {
    newTemplateData.name = templateName;
    if (emails.length != 0) {
      let i;
      for (i = 0; i < emails.length; i++) {
        newTemplateData.emails[i].subject = emails[i].subject;
        newTemplateData.emails[i].message = emails[i].message;
        newTemplateData.emails[i].daysBefore = emails[i].daysBefore;
      }
    }
    if (tasks.length != 0) {
      let d;
      for (d = 0; d < tasks.length; d++) {
        newTemplateData.tasks[d].task = tasks[d].task;
        newTemplateData.tasks[d].note = tasks[d].note;
        newTemplateData.tasks[d].due_date = tasks[d].due_date;
        newTemplateData.tasks[d].reminder = tasks[d].reminder;
        newTemplateData.tasks[d].to = tasks[d].to;
        newTemplateData.tasks[d].to_email = tasks[d].to_email;
      }
    }
    if (emails.length != 0) {
      await axios.post("api/templates", newTemplateData).then((res) => {
        console.log(res.data);
      });
    }
    console.log(newTemplateData);
  };

  return {
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
  };
};

export default useForm;
