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
  const [emailTemplates, setEmailTemplates] = useState({ emails: [] });
  const [taskTemplates, setTaskTemplates] = useState({ tasks: [] });

  //Create Template Data
  const [newTemplateData, setNewTemplateData] = useState({
    name: "",
    emails: [{subject:'', daysBefore: ' ', message: ' '}],
    tasks: [{task: '', note: '', due_date:'', reminder: '', to: '', to_email: ''}],
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
  const [isUnique, setIsUnique] = useState()
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
        const res = await axios.post(
          "http://localhost:5000/hires",
          body,
          config
        );
        setIsSubmitted(true);
        console.log(res.data);
        setErrors({})
       
       
      } catch (error) {
        console.error(error.response.data.errors[0].msg);
        setIsSubmitted(false);
        console.log(isSubmitted);
        setErrors((errors)=> ({...errors, email: error.response.data.errors[0].msg}))
      }
      console.log(errors)
      
    //   if(error.response.data.errors[0].msg=== 'E-mail already in use'){
          
    //       setIsUnique(false)
    //       console.log(isUnique)
    //   }}
      //else patch form
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      callback();
      //move to next step
      increment();
      console.log('errors')
    }
  }, [errors]);

  //Fetching Emails

  const [emails, setEmails] = useState([]);
  const [renderEmails, setRenderEmails] = useState(false);

  const fetchEmails = async () => {
    setRenderEmails(false);
    axios({
      method: "GET",

      url: `http://localhost:5000/emails/find/${formData.email}`,
    }).then((res) => {
      setEmails(res.data);
      //console.log("emails fetched");
      
    });
  };
  useEffect(() => {
  if(isSubmitted){
    fetchEmails(emails);
  }
    ///console.log('emailse rendedered fetched')
  }, [isSubmitting, renderEmails, currentStep]);

  //Delete Email

  function deleteEmail(emailID) {
    axios({
      method: "DELETE",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `http://localhost:5000/emails/${emailID}`,
    }).then((res) => {
      //console.log(res.data);
      setRenderEmails(true);
    });
    setRenderEmails(false);
  }
  //Fetching hire id by hire email

  //Fetching Tasks
  const [tasks, setTasks] = useState([]);
  const [renderTasks, setRenderTasks] = useState(false);
  const fetchTasks = async () => {
    if (isSubmitting) {
      axios({
        method: "GET",
        url: `http://localhost:5000/hires/${formData.email}`,
      }).then((res) => {
        fetchHireID(res.data[0]);
       // console.log(hireID);
        if (res.data[0] != null) {
          axios({
            method: "GET",
            url: `http://localhost:5000/tasks/find/${res.data[0]._id}`,
          }).then((res2) => {
            //setRenderTasks(true);
            setTasks(res2.data);
          });
          
        }
        setRenderTasks(false);
      });
    }
  };
  useEffect(() => {
    fetchTasks(tasks);
  }, [isSubmitting, renderTasks, currentStep]);

  //Delete tasks
  function deleteTask(taskID) {
    axios.delete(`http://localhost:5000/tasks/${taskID}`).then((res) => {
     // console.log(res.data);
      setRenderTasks(true);
    });
  }

  //function to post template email
  const [test, settest] = useState();
  function postTemplates(res) {
    //emails
    setEmailTemplates((emailTemplates) => [
      { ...emailTemplates, emails: res.data[0].emails },
    ]);
    let i;
    for (i = 0; i <= res.data[0].emails.length; i++) {
     // setIsSubmitted(true);
      setEmailTemplates((emailTemplates) => [
        ...emailTemplates,
        {
          ...emailTemplates[0].emails[i],
          date: formData.startDate,
          from: "Tom Hall",
          to: formData.email,
        },
      ]);
      axios
        .post("http://localhost:5000/emails", emailTemplates[i])
        .then((res2) => {
          console.log(res2.data);
          console.log("template Emails posted");
        });
    }
    //tasks
    setTaskTemplates((taskTemplates) => [
      { ...taskTemplates, tasks: res.data[0].tasks },
    ]);
    let z;
    for (z = 0; z <= res.data[0].tasks.length; z++) {
      setTaskTemplates((taskTemplates) => [
        ...taskTemplates,
        {
          ...taskTemplates[0].tasks[z],
          hire_email: formData.email,
          from: "Tom Hall",
          isCompleted: false,
        },
      ]);

      axios
        .post("http://localhost:5000/tasks", taskTemplates[z])
        .then((res3) => {
          console.log(res3.data);
          
        });
    }
    setRenderTasks(true);
    setRenderEmails(true)
     settest(true);
  }

  //fetch selected template data
  useEffect(() => {
    if (isSubmitted) {
      try {
       // setIsSubmitted(true);
        axios({
          method: "GET",
          url: `http://localhost:5000/templates/name/${templateData.name}`,
        }).then((res) => {
          postTemplates(res);
        });
      } catch (error) {
        console.error(error.response.data);
        settest(true)
      }
    } else {
      console.log("fail");
    }
  }, [isSubmitting, isSubmitted, test]);

const [templateName , setTemplateName] = useState(" ")
  const createTemplate = async () => {

    //  setNewTemplateData(...newTemplateData, { name: "Template" });
       newTemplateData.name = templateName
       if(emails.length!=0){
        let i
        for(i = 0; i<emails.length; i++){   
          newTemplateData.emails[i].subject= emails[i].subject;
          newTemplateData.emails[i].message = emails[i].message;
          newTemplateData.emails[i].daysBefore=  emails[i].daysBefore;
        }
      
       }
       if(tasks.length!=0){
        let d
        for(d = 0; d<tasks.length; d++){   
          newTemplateData.tasks[d].task= tasks[d].task;
          newTemplateData.tasks[d].note = tasks[d].note;
          newTemplateData.tasks[d].due_date=  tasks[d].due_date;
          newTemplateData.tasks[d].reminder = tasks[d].reminder;
          newTemplateData.tasks[d].to = tasks[d].to;
          newTemplateData.tasks[d].to_email = tasks[d].to_email;
        }
       }
       if(emails.length!=0){
       axios.post("http://localhost:5000/templates", newTemplateData)
       .then((res) => {
        console.log(res.data);
        });
    }
          console.log(newTemplateData)
          console.log("ASDAS")
    
  };
  


  //create a new Template

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
    createTemplate,
    newTemplateData
  };
};

export default useForm;
