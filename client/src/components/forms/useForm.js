import {useState, useEffect} from 'react'
import axios from 'axios'

import validate from './validateForm'
//set form Data
const useForm = (callback, validate) => {
   

 const [formData, setFormData] = useState({
    startDate:'',
    name: '',
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
   const decrement = () => {
     setCount(currentStep - 1)
   }
 
 

const onSubmit =  async e => {
    e.preventDefault();
    //handle errors
    setErrors(validate(formData));
    setIsSubmitting(true);
    
//    if (Object.keys(errors).length === 0) {
//      increment;
//    }
    
    //     try { 
    //         const config = {          
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const body = JSON.stringify(formData);
    //     const res = await axios.post('/hires', body, config);
    //     console.log(res.data);
    // } catch (error) {
    //     console.error(error.response.data)
    // }
}
useEffect(() => {
 if(Object.keys(errors).length === 0 && isSubmitting){
     callback();
     //move to next step
     increment();
 }
  
}, [errors])

return {
    handleChange,
    onSubmit,
    formData,
    errors,
    currentStep
   
    
}}

export default useForm;