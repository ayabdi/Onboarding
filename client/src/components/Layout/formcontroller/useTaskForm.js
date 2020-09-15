import {useState, useEffect} from 'react'
import axios from 'axios'

const useTaskForm = () => {
    
    const initialState = {
    hire: "",
    from: "Tina West",
    task: "",
    to: "",
    to_email: " ",
    note: " ",
    isCompleted: false,
    due_date: " ",
    reminder: '',
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

      const res = await axios.post('http://localhost:5000/tasks', body, config)
      console.log(res.data);
      setTaskData(initialState);

      } catch (error) {
          console.error(error.response.data)
      }}



   return {
    handleChange,
    taskData,
    onSubmit,
    setReminderArr,
    reminderArr

}}


export default useTaskForm;
