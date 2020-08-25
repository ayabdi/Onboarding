import React from "react";
const ModalForm = ({ show, close }) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <p>Schedule an email</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>

      <div class="row">
        <div class="col left">
          <div class="modal-content column">
            <form className="modal-form">
              <div className="form-group row">
                <div className="col-sm-6">
                  <label className="conrol-label">To</label>
                  <input
                    type="text"
                    className="form-control text-box-sm"
                    name="name"
                  />
                </div>
                <div className="col-sm-6">
                  <label className="conrol-label">From</label>
                  <input type="text" className="form-control text-box-sm" />
                </div>
              </div>
              <div className="form-group row">
              <div className="col">
              <label className="conrol-label">Subject</label>
                  <input type="text" className="form-control text-box-sm" />
                  </div>
              </div>
              <div className="form-group row">
              <div className="col">
              <label className="conrol-label">Message</label>
                  <textarea type="text" className="form-control text-box-large" ></textarea>
                  </div>
              </div>
              <div className="form-group row">
              <div className="col">
              <label className="conrol-label">Send email</label>
                  <input type="text" className="form-control text-box-sml"/>
                  </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col right">
          <div class="modal-content column">2 of 2</div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={close} className="btn-cancel">
          Close
        </button>
      </div>
    </div>
  );
};
export default ModalForm;
