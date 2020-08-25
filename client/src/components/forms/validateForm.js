

export default function  validate(formData){
   let errors = {};
   
    if(!formData.email){
        errors.email = 'Email address is required';
    }
    // } else if(!/\S+@\S\.\S+/.test(formData.email)){
    //     errors.email = 'Email address is invalid'
    // } 
  
    return errors;
}