import React ,{ useState, useEffect} from 'react'
import useForm from "../formcontroller/useForm";
import DatePicker from "react-datepicker";
import { getTime, getDate, format } from "date-fns";
import validate from "../validation/validateForm";
const NewHireform = ({handleChange,
    onSubmit,
    formData,
    errors,
    currentStep,
    setCount,
    isSubmitting,
    isSubmitted}) => {
  
      const [isValid, setisValid] = useState(false);

  function submit() {
    console.log("Successfull Submitted");
    setisValid(true);
  }
  //Date Picker
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    formData.startDate = new Date(getTime(selectedDate));
  }, [selectedDate]);

    return (
        <>
        <div
          className={`card-body  ${
            currentStep === 1 ? "card-body-active" : "card-body"
          }  }`}
          onClick={isSubmitted ? () => setCount(1) : null}
        >
          <h5 className="card-title ">New Hire Information</h5>
          <p className="card-text ">Please enter details for the new hires</p>
          <div className="container">
            <div className="row">
              <div className="col-md-10 custom">
                <form className="hire-form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">Start Date</label>
                        
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(getTime(date))}
                        minDate={new Date()}
                        className="form-control textbox-size"
                        dateFormat="MMMM dd,yyyy"
                      />
                      {errors.startDate && <p>{errors.startDate}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">
                        New Hire's Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">New Hire's email</label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                      />
                      {errors.email && <p>{errors.email}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">Job Title</label>
                      <input
                        type="text"
                        className="form-control textbox-size "
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                      />
                      {errors.job_title && <p>{errors.job_title}</p>}
                    </div>

                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">Department</label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      />
                      {errors.department && <p>{errors.department}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">Hiring Manager</label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        name="hiring_manager"
                        value={formData.hiring_manager}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-3 cmsize">
                      <label className="conrol-label">
                        Hiring Manager's Email
                      </label>
                      <input
                        type="text"
                        className="form-control textbox-size"
                        name="hm_email"
                        value={formData.hm_email}
                        onChange={handleChange}
                      />
                    </div>
                    <div></div>
                    <button
                      type="submit"
                      className={`"btn btn-primary px-4 float-right"  ${
                        currentStep === 1
                          ? "btn btn-primary px-4 float-right"
                          : "btn btn-primary px-4 float-right remove-button"
                      }  }`}
                    >
                      {" "}
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
     </>
    )
}

export default NewHireform
