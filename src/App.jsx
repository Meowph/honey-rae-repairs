import { Outlet, Routes } from "react-router-dom"
import "./App.css"
import { TicketList } from "./components/TicketList.jsx"
import { CustomerList } from "./components/customers/CustomersList.jsx"
import { EmployeeList } from "./components/employees/EmployeesList.jsx"
import { Route } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar.jsx"
import { Welcome } from "./components/welcome/Welcome.jsx"
import { CustomerDetails } from "./components/customers/CustomerDetails.jsx"

//by adding the component in self-closing tags, it renders 
export const App = () => {
  return ( 
  <Routes>
    <Route 
    path="/" 
    element={
    <>
     < NavBar />
     < Outlet /> 
    </>
    }>
      <Route index element={< Welcome />} />
      <Route path="tickets" element={< TicketList />} /> 
      <Route path="/customers" element={< EmployeeList/>} />
      <Route path="customers">
        <Route index element={< CustomerList />} />
        <Route path=":customerId" element={<CustomerDetails />} />
      </Route>
    </Route>
  </Routes>

  )
}

/* < Outlet /> =  whenever a route is matched for the child route, the element, aka {< TicketList />}, will be rendered at  < Outlet /> */

/*element={<CustomerList/>} was removed so that each componene t did not render seperatelty */

/* path=":customerId" is a ROUTE PARAMETER...  considered a key/value pair
*/