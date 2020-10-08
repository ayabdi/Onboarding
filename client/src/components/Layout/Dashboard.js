import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "../css/Dashboard.scss";
import useTaskEditForm from "./formcontroller/useTaskEditForm";
import TaskModalForm from "./Modals/TaskModalForm";
import TaskEditModal from "./Modals/TaskEditModal";

import { getTime , format, parseISO} from "date-fns";
import moment from 'moment'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Accordion, Card, Button, useAccordionToggle } from "react-bootstrap";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );
  return (
    
    <div
      
      style={{ backgroundColor: "white" }}
      className="chevron-down"
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}
const Dashboard = () => {
 
  const {
    handleTaskEdit,
    onTaskEdit,
    setTaskData,
    taskData,
    reminderArray,
  } = useTaskEditForm();
  //task modal form
  const [showTask, setShowTask] = useState(false);
  const closeTaskModalHandler = () => setShowTask(false);

  //edit Task  modal form
  const[index, setIndex] = useState(0)
  const [showTaskEdit, setShowTaskEdit] = useState(false);
  const closeEditTaskModalHandler = () => setShowTaskEdit(false);

  const [hireData, getHireData] = useState([
    {
      _id: "",
      startDate: " ",
      name: " ",
      email: "",
      job_title: "",
      department: "",
      hiring_manager: "",
      hm_email: "",
    },
  ]);
  const[loading, setloading] = useState()

  const [render, setRender] = useState(false)
  const [tasksData, getTaskData] = useState([]);
  useEffect(() => {
    
    axios({
      method: "GET",

      url: `api/hires`,
    }).then((res) => {
     if(!loading){ 
      getHireData(res.data);
      setloading(true)
      setRender(true)
   
  }
   
  });
  }, [ loading, render, hireData]);
  useEffect(() => {
   
    getTaskData([])
    if(render){
    for(let i=0;i<hireData.length;i++){
      axios({
        method: "GET",
        url: `api/tasks/find/${hireData[i]._id}`,
      }).then((res2) => {
       console.log('refressh')
       console.log(tasksData[0])
      getTaskData((tasksData)=> [...tasksData, res2.data])
      
       
      });
    }
  } 
   setRender(false)
  }, [render, loading])
 
  
  const [isEdited, setIsEdited] = useState();
 
   

 const[isDashboard, setIsDashboard] = useState(false)
 

  //const hireData
  return (
    <Fragment>
      {showTask ? (
        <div onClick={closeTaskModalHandler} className="back-drop"></div>
      ) : null}
      <TaskModalForm
        show={showTask}
        close={closeTaskModalHandler}
        hireForm={hireData}
      />
      {/* {showTaskEdit ? (
        <div onClick={closeEditTaskModalHandler} className="back-drop"></div>
      ) : null}
      <TaskEditModal
        show={showTaskEdit}
        close={closeEditTaskModalHandler}
        taskForm={taskData}
        hireForm={hireData[index]}
        handleChange={handleTaskEdit}
        onSubmit={onTaskEdit}
        render ={setRender}
        reminderArr={reminderArray}
        setIsEdit={setIsEdited}
        allowEdit = {isDashboard}
      /> */}

      <div className="container" style={{ width: "100%" }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container dashboard">
          <h1 style={{textAlign: 'center'}}>Dashboard</h1>
          <hr></hr>
          <div className="row hire-info">
            <div className="col db">
              <h6>NEW HIRE</h6>{" "}
            </div>
            <div className="col db">
              <h6>TITLE</h6>
            </div>
            <div className="col db">
              <h6>MANAGER</h6>
            </div>
            <div className="col db">
              <h6>STARTDATE</h6>
            </div>
            <div className="col db">
              <h6>STATUS </h6>
            </div>
          </div>
        </div>
        <>
        
          {loading && tasksData.length!=0?  tasksData.map((tasks, i) => (
            <div key={i} className="card-body accordion">
              <Accordion className="accordion">
                <div className="row hire-info">
                  <div className="col db">
                    <h6>{tasks[0].hire.name}</h6>
                    <div className="email">{tasks[0].hire.email}</div>{" "}
                  </div>
                  <div className="col db">
                    <h6>{tasks[0].hire.job_title}</h6>
                  </div>
                  <div className="col db">
                    <h6>{tasks[0].hire.hiring_manager}</h6>
                    <div className="email"> Manager </div>{" "}
                  </div>
                  <div className="col db">
                    <h6>
                      {moment(parseISO(tasks[0].hire.startDate)).toDate().toLocaleString("default", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                 })}
                    </h6>
                  </div>
                  <div className="col db">
                    <div className = 'row' style = {{marginLeft : '0'}}>
                    <div className ='col-xs inProgress'>
                     <div className = 'in-Progress'>
                      In Progress 
                      </div>
                      </div>
                      <CustomToggle as={Button}className="chevron-down" variant="link" eventKey="0">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="chevron-down"
                          type="button"
                          onClick={() => { setIsEdited(false)} }
                        ></FontAwesomeIcon>
                      </CustomToggle>
                      </div>
                  </div>

                </div>
                <Accordion.Collapse eventKey="0">
                  <>
                    <div className="card-body accordion-body">
                      {tasksData.length > 0 ? (
                        <div
                          className="container email-preview-titles"
                          style={{ width: "95%" }}
                        >
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
                            <div  
                              className="col-sm-3 email-titles"
                              style={{ margin: "8px" }}
                            >
                              Status
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {tasksData[i].map((task, d) => (
                        <div
                          key={d}
                          className="container email-preview"
                          style={{ width: "95%" }}
                        >
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
                            
                              {task.due_date} Days before
                            </div>

                            <div className="col-sm-3 email-preview">
                            
                            {task.isCompleted? `Completed`: `In Progress`}
                          </div>

                            <div className="col-xs">
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ marginTop: "50%" }}
                                className="icons"
                                onClick={() => {
                                  setShowTaskEdit(true);
                                  setTaskData(task);
                                  setIndex(i)
                                }}
                              />{" "}
                              &nbsp;
                            
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                </Accordion.Collapse>
              </Accordion>
            </div>
          )): null}
        </>
      </div>
    </Fragment>
  );
};

export default Dashboard;
