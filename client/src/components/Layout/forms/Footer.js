import React from "react";
import { Link} from "react-router-dom";
import SaveTemplateModal from "../Modals/SaveTemplateModal";
const Footer = ({ scheduleEmails, emails, scheduleTasks, tasks, isSubmitted, createTemplate}) => {
  return (
    <div className="row">
      <div
        className="col-sm-3 float-right workflow-submit "
        style={{ marginRight: "150px" }}
      >
     <SaveTemplateModal
        save={createTemplate}
        isSubmitted={isSubmitted}
      /> 
      </div>
      <div
        className="col-sm-3 float-right workflow-submit "
        style={{ paddingRight: "0" }}
      >
        <button
          type="button"
          onClick={() => {
            scheduleEmails(emails);
            scheduleTasks(tasks);
          }}
          className={
            isSubmitted
              ? `btn btn-primary px-4 custom active`
              : `btn btn-primary px-4 custom`
          }
        >
          <Link to="/dashboard" className="deco-none">
            {" "}
            Set up Workflow{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Footer;
