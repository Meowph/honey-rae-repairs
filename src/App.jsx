import { Routes } from "react-router-dom"
import "./App.css"
import { Route } from "react-router-dom"
import { Login } from "./components/auth/Login.jsx"
import { Register } from "./components/auth/Register.jsx"
import { Authorized } from "./views/Authorized.jsx"
import { ApplicationViews } from "./views/ApplicationViews.jsx"

//by adding the component in self-closing tags, it renders 
export const App = () => {
  return ( 
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" 
    element={
      // check if the user is authorized first
      <Authorized>
        {/* if Auth, ApplicationViews is the CHILD component of Authorized */}
        <ApplicationViews/>
      </Authorized>
    } 
    />
  </Routes>

  )
}

/* < Outlet /> =  whenever a route is matched for the child route, the element, aka {< TicketList />}, will be rendered at  < Outlet /> */

/*element={<CustomerList/>} was removed so that each component did not render separately */

/* path=":customerId" is a ROUTE PARAMETER...  considered a key/value pair
*/