import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.jsx"

export const Ticket = ({ticket}) => {
    const [employees, setEmployees] = useState ([]) 
    const [assignedEmployee, setAssignedEmployee] = useState({})

    //invoke getAllEmployees function in order to get the employees form the database. 
    //Then, set employees state with the employeeArray that came back from database
    useEffect(() => {
      getAllEmployees().then((employeeArray) => {
        setEmployees(employeeArray)
      })
    }, [])

    // Watch for when employees state changes 
    // By adding a ? after [0], it runs ticket, then .employeeTickets. If it comes back undefined, meaning employee.id would === undefined instead of employeeId. The ? stops it right after the [0] so the employeeId property is accessed
    //If employee is found, it will become an object, if not, it will come back as undefined
    // Using ? is best when you expect to get undefined back. IF you don't, but that is what shows, don't just throw a chaining operator to "fix" the problem
    useEffect(() => {
      const foundEmployee = employees.find(
        (employee) => employee.id === ticket.employeeTickets[0]?.employeeId)
        setAssignedEmployee(foundEmployee)
    }, [employees, ticket])

  return (
  <section className="ticket" >
  <header className="ticket-info">#{ticket.id}</header>
  <div>{ticket.description}</div>
  <footer>
    <div>
      <div className="ticket-info">assignee</div>
      <div>{assignedEmployee ? assignedEmployee.user?.fullName : "None"}</div>
    </div>
    <div>
      <div className="ticket-info" key={ticket.id}>Emergency</div>
      <div>{ticket.emergency ? "yes" : "no"}</div>
    </div>
  </footer>
</section>
  )
}