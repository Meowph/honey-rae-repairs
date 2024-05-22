import { useEffect, useState } from "react"
import { getAllTickets } from "./services/ticketService.js"
import "./App.css"

// <> </> is a react fragment which wraps the other elements. JSX only allows for one parent element
export const App = () => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([]) //leaving this as empty () shows error in console

  //Two Arguments: function & array (dependency array)... Function = WHAT we want to happen... Array = WHEN we want it to happen
  useEffect(() => {
    getAllTickets().then(ticketsArray => {
      setAllTickets(ticketsArray)
      console.log("tickets set!")
    })
  }, []) //Empty dependency array? ONLY runs function on initial render of component

  useEffect(() => {
    if(showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency ===true)
      setFilteredTickets(emergencyTickets)

    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets])

  return ( 
      <div className="tickets-container">
        <h2>Tickets</h2>
        <div>
          <button className="filter-btn btn-primary" 
          onClick={ () => {setShowEmergencyOnly(true)}}>
            Emergency
            </button>
          <button className="filter-btn btn-info"
        onClick={() => {setShowEmergencyOnly(false)}}>
          Show All
        </button>
        </div>
        <article className="tickets">
          {filteredTickets.map(ticket => {
            return (
              <section className="ticket" key= {ticket.id}>
                <header className="ticket-info">#{ticket.id}</header>
                <div>{ticket.description}</div>
                <footer>
                  <div>
                    <div className="ticket-info" key={ticket.id}>Emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                  </div>
                </footer>
              </section>
            )
          })}
        </article>
      </div>
  )
}

//Setter function from useState is used instead of counter++ because it tells React to re-render the info. It tells the computer that the state changed and the HTM needs to be re-rendered

//JS info/expression = info in { }