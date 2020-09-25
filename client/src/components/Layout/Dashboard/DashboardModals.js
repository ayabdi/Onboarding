import React, {useState, useEffect, Fragment} from 'react'
import useTaskEditForm from "../formcontroller/useTaskEditForm";
import useForm from "../formcontroller/useForm";
import TaskModalForm from "../TaskModalForm"
import TaskEditModal from "../TaskEditModal";

function DashboardModals() {

   
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
         {showTaskEdit ? (
          <div onClick={closeEditTaskModalHandler} className="back-drop"></div>
        ) : null}
        <TaskEditModal
          show={showTaskEdit}
          close={closeEditTaskModalHandler}
          taskForm={taskData}
          hireForm ={hireData}
           handleChange = {handleTaskEdit}
           onSubmit = {onTaskEdit}
           reminderArr={reminderArray}
       />
       </Fragment>    
            
      
    )
}

export default DashboardModals
