import { isDate , isAfter} from "date-fns";

export default function  validate(emailData){
   let errors = {};
   const pattern = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

    if(!emailData.email){
        errors.email = 'Email address is required';
    }
     else if(!pattern.test(String(emailData.email).toLowerCase())){
        errors.email = 'Email address is invalid'
    } 
    // if(!pattern.test(String(emailData.hm_email).toLowerCase())){
    //     errors.Hm_email = 'Email address is invalid'
    // } 
    if(!isAfter(emailData.startDate, new Date(1987, 1, 11))){
        errors.startDate = 'Start Date is required';
        console.log(emailData.startDate)
    
    }
    if(!emailData.name){
        errors.name = 'Name is required';
    }
    if(!emailData.job_title){
        errors.job_title = 'Job Title is required';
    }
    if(!emailData.department){
        errors.department = 'Department is required';
    }
         
    return errors;
}