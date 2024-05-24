import "./App.css"
import { TicketList } from "./components/TicketList.jsx"
import { CustomerList } from "./components/customers/CustomersList.jsx"

//by adding the component in self-closing tags, it renders 
export const App = () => {
  return <>
    {/* <TicketList /> */}
    < CustomerList />
  </>
}