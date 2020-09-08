import {useState, useEffect} from 'react'
import axios from 'axios'


//set form Data
const useForm = (callback, validate) => {
   

 const [formData, setFormData] = useState({
    startDate:'',
    name: 'lol',
    email:'',
    job_title: '',
    department: '',
    hiring_manager: '',
    hm_email: ''
})
const [errors, setErrors] = useState({})
const [isSubmitting, setIsSubmitting] = useState(false);


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
 
 
//POSTING
const onSubmit =  async e => {
    e.preventDefault();
    //handle errors
    setErrors(validate(formData));
   
    setIsSubmitting(true);
    
        try { 
            const config = {          
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData);
        const res = await axios.post('http://localhost:3000/hires', body, config)
        console.log(res.data);
        
    } catch (error) {
        console.error(error.response.data)
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


return {
    handleChange,
    onSubmit,
    formData,
    errors,
    currentStep,
    decrement,
    emails,
    isSubmitting,
    deleteEmail,
    
    
   
    
}}

export default useForm;