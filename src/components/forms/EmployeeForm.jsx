import { useEffect, useState } from "react"
import "./Form.css"
import { getEmployeeByUserId, updateEmployee } from "../../services/employeeService.jsx"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = ({currentUser}) => {
  const [employee, setEmployee] = useState({})

  //After defining, the useNavigate hook will return a function that allows us to nav to diff paths in application
  const navigate = useNavigate()

  //[currentUser] will run once currentUser comes back from local storage
  useEffect(() => {
    getEmployeeByUserId(currentUser.id).then(data => {
      const employeeObj = data[0]
      setEmployee(employeeObj)
    })
  },[currentUser])

  const handleSave = (event) => {
    event.preventDefault() //prevents default refresh trigger, so console.log will display text
    console.log("clicked!")

    const editedEmployee = {
      id: employee.id,
      specialty: employee.specialty,
      rate: employee.rate,
      userId: employee.userId,
    }
//one employee is posted to database, want application to navigate /employee/currentUserId
    updateEmployee(editedEmployee).then(() => {
      navigate (`/employees/${currentUser.id}`)
    })
  }

  return (
  <form className="profile">
    <h2>Update Profile</h2>
    <fieldset>
      <div className="form-group">
        <label>Specialty</label>
        <input 
        type="text"
        value={employee.specialty}
        onChange={(event) => {
          //the ... (spread operator) is saying to take all properties of current obj & past them in new obj
          const copy = {...employee} //copy of state
          copy.specialty = event.target.value //changed the specialty property to be what user types into input
          setEmployee(copy) //New employee Obj
        }}
        required
        className="form-control"
        />
      </div>
    </fieldset>
    <fieldset>
      <div className="form-group">
        <label>Hourly Rate:</label>
        <input 
        type="number"
        value={employee.rate}
        required
        onChange={(event) => {
          const copy = {...employee} //copy of state
          copy.rate = event.target.value //changed the specialty property to be what user types into input
          setEmployee(copy) //New employee Obj
        }}
        className="form-control"
        />
      </div>
    </fieldset>
    <fieldset>
      <div className="form-group">
       <button className="form-btn btn-primary" onClick={handleSave}>Save Profile</button>
      </div>
    </fieldset>
  </form>
  //Anything done to submit within a <form /> 9like clicking a button to save info) will, by default, trigger a rerender of the application
  )
}