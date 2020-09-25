import React from "react";


const DeleteEmailModal = ({show, close, ID, onDelete}) => {
  return (
    <div
      className="modal-wrapper delete"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
        <div className="modal-header delete">
        <p>Are You Sure You Want To Delete This?</p>
    
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
            onDelete(ID)
          }}
          form="taskFormEdit"
          className="btn btn-primary btn mod"
        >
          Delete
        </button>
      
       
      </div>
    </div>
  );
};

export default DeleteEmailModal;
