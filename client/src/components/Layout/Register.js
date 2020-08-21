import React , {Fragment, useState  }from 'react'
import Stepper from '../Stepper/Stepper'
import axios from 'axios'

function Register  (props)  {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        job_title: '',
        department: '',
        hiring_manager: '',
        hm_email: ''
    });
   const{name, email, job_title, department, hiring_manager, hm_email} = formData;
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onSubmit = async e => {
        e.preventDefault();

        const newHire = {name, email, job_title, department, hiring_manager, hm_email}
        try { 
            const config = {          
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(newHire);

        const res = await axios.post('/hires', body, config);
        console.log(res.data);
        } catch (error) {
            console.error(error.response.data)
        }
    }
   /// Stepper
    const stepsArray = [
        // "Create your account",
        "Add new hire information",
        "Schedule automated emails",
        "Create Tasks",
      
      ];
      const [currentStep, setCount] = useState(1)
      
      
       const increment = () => {
        if (currentStep>0 && currentStep <3) { 
        setCount(currentStep + 1)
        
        }
       }
       const decrement = () => {
         setCount(currentStep - 1)
       }
       console.log(currentStep)
      //is card active
   
    
         
    
    return (

        <Fragment>
        <div className="stepper-container-horizontal">
          <Stepper
            direction="horizontal"
            currentStepNumber={currentStep - 1}
            steps={stepsArray}
            stepColor="purple"
          />
        </div>
        <div className="card" style={{width: "53rem"}}>
           
        <div className={`card-body  ${currentStep === 1 ?"card-body-active":"card-body"}  }`}>
            <h5 className="card-title ">New Hire Information</h5>
            <p className="card-text ">Please enter details for the new hires</p>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 custom">
                        <form className='hire-form' onSubmit={e => onSubmit(e)}>
                            <div className="form-group row">
                                <div className="col-sm-3 cmsize">
                                    <label className='conrol-label' >New Hire's Full Name</label>
                                        <input 
                                        type="text"
                                         className="form-control textbox-size" 
                                         name="name" 
                                         value={name} 
                                         onChange={e=> onChange(e)}
                                         />
                                </div>
                                <div className="col-sm-3 cmsize">
                                    <label className='conrol-label' >New Hire's email</label>
                                        <input 
                                        type="text" 
                                        className="form-control textbox-size" 
                                        value={email}
                                        name="email" 
                                        onChange={e=> onChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-3 cmsize">
                                    <label className='conrol-label'>Job Title</label>
                                        <input 
                                        type="text"
                                        className="form-control textbox-size "
                                        name="job_title"
                                        value={job_title}
                                        onChange={e=> onChange(e)}
                                        />
                                </div>
                                <div className="col-sm-3 cmsize">
                                    <label className='conrol-label' >Department</label>
                                        <input
                                         type="text"
                                        className="form-control textbox-size" 
                                        name="department"
                                        value={department}
                                        onChange={e=> onChange(e)}
                                        />
                                       
                               </div>
                               

                               
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-3 cmsize">
                                    <label className='conrol-label'>Hiring Manager</label>
                                        <input 
                                        type="text" 
                                        className="form-control textbox-size" 
                                        name="hiring_manager"
                                        value={hiring_manager}
                                        onChange={e=> onChange(e)}/>
                                </div>
                                <div className="col-sm-3 cmsize">
                                    <label className='conrol-label' >Hiring Manager's Email</label>
                                        <input
                                        type="text" 
                                        className="form-control textbox-size" 
                                        name="hm_email" 
                                        value={hm_email}
                                        onChange={e=> onChange(e)}
                                        />
                                     
                                </div>
                                <button onClick={increment} type="button" className={`"btn btn-primary px-4 float-right"  ${currentStep === 1 ?"btn btn-primary px-4 float-right":"remove-button"}  }`}>Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        <div class={`card-body  ${currentStep === 2 ?"card-body-active":"card-body"}  }`}>
                <div class="row">
                    <div class="col-sm-7">
                        <h5 class="card-title ">Automated Emails</h5>
                        <p class="card-text ">Schedule emails to be sent out automatically</p>
                    </div>
                    <div class="col-sm-3 float-right">
                        <button type="button" class="btn btn-primary px-4">Schedule an email</button>
                    </div>

                </div>

            </div>
            <div class={`card-body  ${currentStep === 3 ?"card-body-active":"card-body"}  }`}>
                <div class="row">
                    <div class="col-md-10">
                        <h5 class="card-title ">Tasks</h5>
                        <p class="card-text ">Email reminders will be sent out in # of days before task due date, if not completed</p>
                    </div>
                    <div class="col-sm-3 float-right">
                        <button type="button" class="btn btn-primary px-4">Create a task</button>
                    </div>

                </div>
            </div>
        </div>

        </Fragment>
    )
}


export default Register
