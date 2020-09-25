import {useState, useEffect} from 'react'
import axios from 'axios'

const useEmailForm = () => {
    
    const initialState = {
        hire: " ",
        to: " ",
       from:" ",
       fromName:"Tom Hall",
       subject: " Welcome to The Team! ",
       message: "Hi John, Welcome to The Company! ",
       date: " ",
       //# of days before start date
       daysBefore: "30"
    }
    const [emailData, setEmailData] = useState(initialState)
     
   
   const handleChange = event => {
       const {name, value} = event.target;
       setEmailData({
           ...emailData, 
           [name]: value
       });
   }
//    const [emailFormEdit, setEmailForm] = useState(initialState);
//   const handleEdit = event => {
//     const {name, value} = event.target;
//     setEmailData({
//         ...emailFormEdit, 
//         [name]: value
//     });
// }


const onSubmit =  async e =>  {
          e.preventDefault();
  try {
          const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      //Store email
      const body = JSON.stringify(emailData);

      const res = await axios.post('http://localhost:5000/emails', body, config)
    //  console.log(res.data);
      setEmailData(initialState);

      } catch (error) {
          console.error(error.response.data)
      }}



   return {
    handleChange,
    emailData,
    onSubmit,setEmailData

}}


export default useEmailForm;
