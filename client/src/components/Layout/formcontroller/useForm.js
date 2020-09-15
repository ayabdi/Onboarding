import {useState, useEffect} from 'react'
import axios from 'axios'


//set form Data
const useForm = (callback, validate) => {
   

 const [formData, setFormData] = useState({
    startDate:' ',
    name: ' John Doe',
    email:'johnedoe@gmail.com',
    job_title: 'Developer',
    department: 'Engineering',
    hiring_manager: 'Tom Hall',
    hm_email: 'tommhall@harmonize.hq'
})
const [errors, setErrors] = useState({})
const [isSubmitting, setIsSubmitting] = useState(null);


const handleChange = event => {
    const {name, value} = event.target;
    setFormData({
        ...formData, 
        [name]: value
    });
}

/// Stepper
  const [currentStep, setCount] = useState(1)
  
  
   const increment = () => {
    if (currentStep>0 && currentStep <3) { 
    setCount(currentStep + 1)
    
    }
   }
   const decrement = event => {
     if (currentStep>1 && currentStep <=3)
     setCount(currentStep - 1)
   }
 
   const [isUnique, setIsUnique] = useState(true)
//POSTING

const onSubmit =  async e => {
    e.preventDefault();
    //handle errors
    setErrors(validate(formData, isUnique));
   
    setIsSubmitting(true);
    
        try { 
            const config = {          
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData);
        const res = await axios.post('http://localhost:5000/hires', body, config)
        console.log(res.data);
        setIsUnique(true);
    
        
    } catch (error) {
        console.error(error.response.data.errors[0].msg)

        if(error.response.data.errors[0].msg=== 'E-mail already in use'){
    
            setIsUnique(false)
            console.log(isUnique)
        }
    }
}
useEffect(() => {
 if(Object.keys(errors).length === 0 && isSubmitting ){
     callback();
     //move to next step
     increment();
 }
  
}, [errors]
)
//Fetching Emails
const [emails , fetchEmails] = useState([])

useEffect (() => {
  
    axios({
        method: 'GET',
       
        url : `http://localhost:5000/emails/find/${formData.email}`
    }).then(res => {
        fetchEmails(res.data)
    })
},[isSubmitting, emails])

//Delete Email
function deleteEmail (emailID) {
    axios({
        method: 'DELETE',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json',
           
        },
        url : `http://localhost:5000/emails/${emailID}`
    }).then(res => {
        console.log(res.data)
    })
}

//Fetching hire id by hire email
const [hireID, fetchHireID] = useState(' ')
let hireEmail
useEffect (() => {
    
    axios({
        method: 'GET',
        
        url : `http://localhost:5000/hires/${formData.email}`
    }).then(res => {
        fetchHireID(res.data)
    
        
    })

},[isSubmitting, hireID ])

//Fetching Tasks
const [tasks , fetchTasks] = useState([])

useEffect (() => {
  
    axios({
        method: 'GET',
        
        url : `http://localhost:5000/tasks/find/${hireID._id}`
    }).then(res => {
        fetchTasks(res.data)
    })
 
},[isSubmitting, tasks])

//Delete tasks
function deleteTask (taskID) {
    axios({
        method: 'DELETE',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json',
           
        },
        url : `http://localhost:5000/tasks/${taskID}`
    }).then(res => {
        console.log(res.data)
    })
}




return {
    handleChange,
    onSubmit,
    formData,
    errors,
    currentStep,
    increment,
    decrement,
    emails,
    tasks,
    isSubmitting,
    deleteEmail,
    deleteTask
    
    
   
    
}}

export default useForm;