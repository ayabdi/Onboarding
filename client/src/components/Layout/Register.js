import React , {Fragment, useState  }from 'react'

const Register = () => {
    const [formData, setFormData] = useState({
        name: 'name',
        email:'',
        job_title: '',
        department: '',
        hiring_manager: '',
        hm_email: ''
    });
   const{name, email, job_title, department, hiring_manager, hm_email} = formData;
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onSubmit = e => {
        e.preventDefault();
    }
    return (
        <Fragment>
            <header>
               <div className="spacer">
                &nbsp;
            </div>
            <br/>
            <br/>

            <div className='container-small'>
                Jane Doe's Workflow
            </div>
        </header>

        <div class='container pb'>
            <ul class='progress-bars'>
                <li class='col-sm-3 active'> Add new hire information</li>
                <li class='col-sm-3'> Schedule automated emails</li>
                <li class='col-sm-3'>Create tasks</li>
            </ul>
        </div>
        <br/>
        <div className="card" style={{width: "53rem"}}>

        <div className="card-body new-hire">
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
                                <button type="button" className="btn btn-primary px-4 float-right new-hire">Next</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-body ">
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
            <div class="card-body ">
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
