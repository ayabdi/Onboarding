import {useState, useEffect} from 'react'
import axios from 'axios'

/// Email Edit controller
const useEmailEditForm = () => {
    
    const [isSubmittingEmail, setIsSubmittingEmail] = useState(false) 
    const initialState = {
        _id: " ",
        hire: " ",
        to: " ",
       from:" ",
       fromName: "",
       subject: " ",
       message: " ",
       date: " ",
       //# of days before start date
       daysBefore: " "
    }
    const [emailData, setEmailData] = useState(initialState)
     
   //onChange handler
   const handleEmailEdit = event => {
       const {name, value} = event.target;
       setEmailData({
           ...emailData, 
           [name]: value
       });
   }

//edit on submit
const onEmailEdit =  async e =>  {
          e.preventDefault();
  try {
          const config = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          }
      }
      //Store email
      const body = JSON.stringify(emailData);

      const res = await axios.patch(`http://localhost:5000/emails/${emailData._id}`, body, config)
      console.log(res.data);

      } catch (error) {
          console.error("")
      }}



   return {
    handleEmailEdit,
    emailData,
    onEmailEdit,
    setEmailData
    
    

}}


export default useEmailEditForm;
