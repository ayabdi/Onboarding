import {useState, useEffect} from 'react'
import axios from 'axios'

/// Email Edit controller
const useTaskEditForm = () => {
    const initialState = {
    
    _id: "",
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
     
   //onChange handler
   const handleTaskEdit = event => {
       const {name, value} = event.target;
       setTaskData({
           ...taskData, 
           [name]: value
       });
   }

//Fetching hire id by hire email
const [hireID, fetchHireID] = useState(null)
const [hireEmail, fetchHireEmail] = useState(null)
useEffect (() => {
    axios({
        method: 'GET',
       
        url : `http://localhost:5000/hire/find/${hireEmail}`
    }).then(res => {
        fetchHireID(res.body._id)
    })
},[ hireEmail])

//Fetching Tasks
const [tasks , fetchTasks] = useState([])

useEffect (() => {
  
    axios({
        method: 'GET',
       
        url : `http://localhost:5000/tasks/find/${hireID}`
    }).then(res => {
        fetchTasks(res.data)
    })
},[hireID, tasks])


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
    fetchHireEmail
    
    

}}


export default useTaskEditForm;
