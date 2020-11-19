import React from 'react'
import TaskModalForm from "../Modals/TaskModalForm"
import DeleteModal from '../Modals/DeleteModal'
import TaskEditModal from '../Modals/TaskEditModal'
const Tasks = ({currentStep, setCount,formData,
    isSubmitting,
    isSubmitted, 
    setRenderTasks,
    tasks,
    deleteTask}) => {
    return (
        <div
        onClick={isSubmitted ? () => setCount(3) : null}
        className={`card-body  ${
          currentStep === 3 ? "card-body-active" : "card-body"
        }  }`}
      >
        <div className="row">
          <div className="col-md-10" style={{ width: "60%" }}>
            <h5 className="card-title ">Tasks</h5>
            <p className="card-text ">
              Email reminders will be sent out in # of days before task due
              date, if not completed
            </p>
          </div>
          <TaskModalForm
            hireForm={formData}
            render={setRenderTasks}
            currentStep={currentStep}
          />
          <>
            {tasks.length > 0 && isSubmitting ? (
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
            ) : null}
            {isSubmitting
              ? tasks.map((task, i) => (
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
                        <TaskEditModal
                          task={task}
                          hireForm={formData}
                          render={setRenderTasks}
                        />
                        &nbsp;
                        <DeleteModal ID={task._id} Delete={deleteTask} />
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </>
        </div>
      </div>
    )
}

export default Tasks
