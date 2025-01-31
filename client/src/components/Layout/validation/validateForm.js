import {useState} from 'react'
import { isDate , isAfter} from "date-fns";
import axios from 'axios'


export default function  validate(formData, isUnique, setIsUnique){
   let errors = {};
   const pattern = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

   //
    if(!formData.email){
        errors.email = 'Email address is required';
    }
     else if(!pattern.test(String(formData.email).toLowerCase())){
        errors.email = 'Email address is invalid'
     }  
     else if(isUnique === 'E-mail already in use'){
        errors.email = 'Email address already exists'
        setIsUnique('')
    }
    if(!pattern.test(String(formData.hm_email).toLowerCase())){
        errors.Hm_email = 'Email address is invalid'
    } 
    if(!isAfter(formData.startDate, new Date(1987, 1, 11))){
        errors.startDate = 'Start Date is required';
        console.log(formData.startDate)
    
    }
    if(!formData.name){
        errors.name = 'Name is required';
    }
    if(!formData.job_title){
        errors.job_title = 'Job Title is required';
    }
    if(!formData.department){
        errors.department = 'Department is required';
    }
         
    return errors;
}