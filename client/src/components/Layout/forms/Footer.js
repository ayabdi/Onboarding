import React from "react";
import { Link} from "react-router-dom";
import SaveTemplateModal from "../Modals/SaveTemplateModal";
const Footer = ({ scheduleEmails, emails, scheduleTasks, tasks, isSubmitted, createTemplate}) => {
  const btnStyle = {
    width: "135px",height: '33px',
    padding: "0 5px",
    margin: "0px 0px 20px 10px",
    opacity: '0.6',
    pointerEvents: 'none'
  };
  const btnactive = {
    ...btnStyle, opacity:'1',  pointerEvents: 'auto'
  }
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
         
          onClick={() => {
            scheduleEmails(emails);
            scheduleTasks(tasks);
          }}
          className= 'ob-btn formbtn'
          style={isSubmitted? btnactive: btnStyle}
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
