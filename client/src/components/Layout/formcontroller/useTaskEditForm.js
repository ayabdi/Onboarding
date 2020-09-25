import {useState, useEffect} from 'react'
import axios from 'axios'

/// Email Edit controller
const useTaskEditForm = () => {
    const initialState = {
    
    _id: "",
    hire:'',
    from: "",
    task: "",
    to: "",
    to_email: " ",
    note: " ",
    isCompleted: false,
    due_date: " ",
    reminder: '',
    }
    const [taskData, setTaskData] = useState(initialState)
     
    const[reminderArray, setReminderArr] = useState([])
    
   //onChange handler
   const handleTaskEdit = event => {
    
       const {name, value} = event.target;
       const checked = event.target.checked;
       setTaskData({
           ...taskData, 
           [name]: value,
           isCompleted : checked,
       });
       
       if (name === 'reminder'){
        setReminderArr(value.split(','))
    }
   }



//edit on submit
const onTaskEdit =  async e =>  {
          e.preventDefault();
  try {
          const config = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          }
      }
      //Store email
      const body = JSON.stringify(taskData);

      const res = await axios.patch(`http://localhost:5000/tasks/${taskData._id}`, body, config)
      console.log(res.data);

      } catch (error) {
          console.error("")
      }}



   return {
    handleTaskEdit,
    taskData,
    
    onTaskEdit,
    setTaskData,
    reminderArray

}}


export default useTaskEditForm;
