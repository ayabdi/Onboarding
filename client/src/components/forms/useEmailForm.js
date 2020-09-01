import {useState, useEffect} from 'react'
import axios from 'axios'

const useEmailForm = () => {
     
    const initialState = {
        hire: " ",
        to: " ",
       from:" ",
       subject: " ",
       message: " ",
       date: " ",
       //# of days before start date
       daysBefore: " "
    }
    const [emailData, setEmailData] = useState(initialState)
     
   
   const handleChange = event => {
       const {name, value} = event.target;
       setEmailData({
           ...emailData, 
           [name]: value
       });
   }
const [submitting , isSubmitting] = useState(false)
const onSubmit =  async e =>  {
          e.preventDefault();
  try {
          const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      //Send email
      const body = JSON.stringify(emailData);

      const res = await axios.post('http://localhost:5000/emails', body, config)
      console.log(res.data);
      setEmailData(initialState);
    

      } catch (error) {
          console.error(error.response.data)
      }}

 // Edit Email
const [emailEdit, setEmailEdit] = useState({})
function editEmail (emailID) {
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
    emailData,
    onSubmit,

}}


export default useEmailForm;
