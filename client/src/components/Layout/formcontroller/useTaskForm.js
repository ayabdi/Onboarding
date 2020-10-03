import {useState, useEffect} from 'react'
import axios from 'axios'

const useTaskForm = () => {
    
    const initialState = {
    hire_email: "",
    from: "Tina West",
    task: "Create Email Address for hire",
    to: "John Smith",
    to_email: " ",
    note: "Did You complete the Task? ",
    isCompleted: false,
    due_date: "20 ",
    reminder: '2,1',
    }
    const [taskData, setTaskData] = useState(initialState)
    
    const[reminderArr, setReminderArr] = useState([])
   
   const handleChange = event => {
       const {name, value} = event.target;
       setTaskData({
            ...taskData, 
           [name]: value
       });
       if (name === 'reminder'){
           setReminderArr(value.split(','))
       }

   }


const onSubmit =  async e =>  {
          e.preventDefault();
  try {
          const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      //Store task
      const body = JSON.stringify(taskData);

      const res = await axios.post('api/tasks', body, config)
     // console.log(res.data);
      setTaskData(initialState);

      } catch (error) {
          console.error(error.response.data)
      }}



   return {
    handleChange,
    taskData,
    setTaskData,
    onSubmit,
    setReminderArr,
    reminderArr

}}


export default useTaskForm;
