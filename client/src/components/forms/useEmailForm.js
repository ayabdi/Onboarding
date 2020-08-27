import {useState, useEffect} from 'react'
import axios from 'axios'

const useEmailForm = () => {

    
    const [emailData, setEmailData] = useState({
       to: '',
       from:'',
       subject: '',
       message: '',
       date: '',
       //# of days before start date
       daysBefore: ''
   })
     
   
   const handleChange = event => {
       const {name, value} = event.target;
       setEmailData({
           ...emailData, 
           [name]: value
       });
   }




const onSubmit =  e => {
          e.preventDefault();
          
  
  
  try {
          const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      //Send email
      const body = JSON.stringify(emailData);

      const res =  axios.post('/send_email', body, config);
      console.log(res.data);
      console.log('success!')
      console.log(body);
      } catch (error) {
          console.error(error.response.data)
      }}
   return {
    handleChange,
    emailData,
   onSubmit
   
       
}}
export default useEmailForm;
