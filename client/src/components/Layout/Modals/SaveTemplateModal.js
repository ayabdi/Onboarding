import React from "react";


const SaveTemplateModal = ({show, close, handleClick, template}) => {
  return (
    <div
      className="modal-wrapper delete"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
        <div className="modal-header delete">
        <p>Are You Sure You Want To Save This As a Template?</p>
    
      </div>
        
      <div className="modal-footer delete">
      <button
          onClick={close}
          className="btn btn-light "
          
        >
          Cancel
        </button>
      <button
          type="submit"
          onClick={() => {
            close();
            handleClick()
          }}
          form="taskFormEdit"
          className="btn btn-primary btn mod"
        >
          Save
        </button>
      
       
      </div>
    </div>
  );
};

export default SaveTemplateModal;
