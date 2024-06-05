import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.jsx"
import { assignTicket, updateTicket } from "../../services/ticketService.jsx"

export const Ticket = ({ticket, currentUser, getAndSetTickets}) => {
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

    const handleClaim = () => {
      const currentEmployee = employees.find(employee => employee.userId === currentUser.id)

      //Once claim button is clicked, a new ticket will post to database with the key value pairs below
      const newEmployeeTicket = {
        employeeId: currentEmployee.id,
        serviceTicketId: ticket.id,
      }
      //Once new employee ticket is created and posted in the database
      assignTicket(newEmployeeTicket).then(() => {
      //We will want to 
        getAndSetTickets()
      })
    }

    const handleClose = () => {
      const closedTicket = {
        id: ticket.id,
        userId: ticket.userId,
        description: ticket.description,
        emergency: ticket.emergency,
        dateCompleted: new Date(),
      }

      //once posted, tickets will be re-fetched and set so either Claim or Close Button will appear
      updateTicket(closedTicket).then(() => {
        getAndSetTickets()
      })
    }

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
    <div className="btn-container">
      {/*If the logged in user is an employee and there's no employee ticket associated with the service ticket,
       then a button to claim the ticket should display*/}
       {currentUser.isStaff && !assignedEmployee ? (
       <button className="btn btn-secondary" onClick={handleClaim}>
        Claim
        </button>
       ) : ( 
        ""
      )}
      {/*If the logged in user is the assigned employee for the ticket, and there is no dateCompleted,
       then a button to close the ticket should display */}
       {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? (
       <button className="btn btn-warning" onClick={handleClose}>
        Close
        </button>
       ) : (
        ""
       )}
    </div>
  </footer>
</section>
  )
}