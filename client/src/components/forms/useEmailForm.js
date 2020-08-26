import {useState, useEffect} from 'react'
import axios from 'axios'

const useEmailForm = () => {

    
    const [emailData, setEmailData] = useState({
       to: '',
       from:'',
       subject: '',
       message: '',
   })
     
   
   const handleChange = event => {
       const {name, value} = event.target;
       setEmailData({
           ...emailData, 
           [name]: value
       });
   }


//    const onSubmit =  async e => {
//     e.preventDefault();
    
//     try {
//          email(emailData) 
//     } catch (error) {
//          console.error(error.response.data)
//     }
    
//    }
   return {
    handleChange,
    emailData,
   
       
}}
export default useEmailForm;
