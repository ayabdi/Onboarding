import {useState, useEffect} from 'react'
import axios from 'axios'

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
     
   
   const handleEdit = event => {
       const {name, value} = event.target;
       setEmailData({
           ...emailData, 
           [name]: value
       });
   }


const onEdit =  async e =>  {
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
     // setEmailData(initialState);

      } catch (error) {
          console.error("")
      }}



   return {
    handleEdit,
    emailData,
    onEdit,
    setEmailData
    
    

}}


export default useEmailEditForm;
