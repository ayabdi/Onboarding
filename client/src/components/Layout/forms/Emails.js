import React ,{ useState, useEffect} from 'react'
import useForm from "../formcontroller/useForm";
import EmailModalForm from "../Modals/EmailModalForm"
import DeleteModal from '../Modals/DeleteModal'
import EditEmailModal from '../Modals/EditEmailModal'
const Emails = ({currentStep, setCount,formData,
    isSubmitting,
    isSubmitted, 
    setRenderEmails,
    emails,
    deleteEmail}) => {
 
    return (
        <div>
           <div
          className={`card-body  ${
            currentStep === 2 ? "card-body-active" : "card-body"
          }  }`}
          onClick={isSubmitted ? () => setCount(2) : null}
        >
          <div className="row">
            <div className="col-sm-7">
              <h5 className="card-title ">Automated Emails</h5>
              <p className="card-text ">
                Schedule emails to be sent out automatically
              </p>
            </div>
            <div className="col-sm-3 float-right">
              <EmailModalForm
                render={setRenderEmails}
                hireForm={formData}
                submitting={isSubmitting}
                currentStep={currentStep}
              />
            </div>

            <>
              {emails.length > 0 && isSubmitting ? (
                <div className="container email-preview-titles">
                  <div className="row email-preview">
                    <div
                      className="col-sm-3 email-titles"
                      style={{ margin: "8px" }}
                    >
                      Subject
                    </div>
                    <div
                      className="col-sm-3 email-titles"
                      style={{ margin: "8px" }}
                    >
                      To
                    </div>
                    <div
                      className="col-sm-3 email-titles"
                      style={{ margin: "8px" }}
                    >
                      Scheduled For
                    </div>
                  </div>
                </div>
              ) : null}
              {isSubmitted
                ? emails.map((email, i) => (
                    <div key={i} className="container email-preview">
                      <div className="row email-preview">
                        <div className="col-sm-3 email-preview">
                          {email.subject}
                        </div>
                        <div
                          className="col-sm-3 email-preview"
                          style={{ margin: "8px" }}
                        >
                          {email.hire.name}
                          <br />
                          <div className="email">{email.to}</div>
                        </div>
                        <div className="col-sm-3 email-preview">
                          {" "}
                          {email.daysBefore} Days before
                        </div>

                        <div className="col-xs">
                          <EditEmailModal
                            render={setRenderEmails}
                            email={email}
                          />
                          <DeleteModal ID={email._id} Delete={deleteEmail} />
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </>
          </div>
        </div> 
        </div>
    )
}

export default Emails
