import { useEffect, useState } from "react"
import "./Tickets.css"
import { getAllTickets } from "../../services/ticketService.jsx"
import { Ticket } from "../tickets/Ticket.jsx"
import { TicketFilterBar } from "../tickets/TicketFilterBar.jsx"


// <> </> is a react fragment which wraps the other elements. JSX only allows for one parent element
// currentUser is being captured here in props
export const TicketList = ({currentUser}) => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([]) //leaving this as empty () shows error in console
  const [searchTerm, setSearchTerm] = useState(" ")

  const getAndSetTickets = () => {
    getAllTickets().then(ticketsArray => {
      if (currentUser.isStaff) {
        setAllTickets(ticketsArray)
      } else {
        const customerTickets = ticketsArray.filter(
          ticket => ticket.userId === currentUser.id
        )
        setAllTickets(customerTickets)
      }
    })
  }

  //Two Arguments: function & array (dependency array)... Function = WHAT we want to happen... Array = WHEN we want it to happen
  useEffect(() => {
    getAndSetTickets()
  }, [currentUser]) //Empty dependency array [ ]? ONLY runs function on initial render of component

  useEffect(() => {
    if(showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)

    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets])

  //This shows when the searchTerm state changes 
  useEffect(() => {
    const foundTickets = allTickets.filter(ticket => 
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      setFilteredTickets(foundTickets)
  }, [searchTerm, allTickets])

  return ( 
      <div className="tickets-container">
        <h2>Tickets</h2>
          <TicketFilterBar 
          setShowEmergencyOnly={setShowEmergencyOnly} 
          setSearchTerm={setSearchTerm}
          />

        <article className="tickets">
          {filteredTickets.map((ticketObj) => {
            return (
            <Ticket 
            ticket={ticketObj} 
            currentUser={currentUser}
            getAndSetTickets={getAndSetTickets} 
            key={ticketObj.id}
            />
            )
          })}
        </article>
      </div>
  )
}

//Setter function from useState is used instead of counter++ because it tells React to re-render the info. It tells the computer that the state changed and the HTM needs to be re-rendered

//JS info/expression = info in { }

//ticket=(ticketObj) is a prop with a key value pair for the component of Ticket, which is being rendered from Ticket.jsx (anytime a prop is passed onto a component a kye value pair is created on props obj for component)