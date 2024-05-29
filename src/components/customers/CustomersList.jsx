import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService.jsx"
import"./Customers.css"
import { User } from "../../users/User.jsx"
import { Link } from "react-router-dom"

export const CustomerList = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    getNonStaffUsers().then(customerArray => {
      setCustomers(customerArray)
    })
  }, [])

  //this allows for cx's id to pop up in url. Their profile cna now be clicked and will display cx 1, 2, or 3
  return ( 
    <div className="customers">
       {customers.map((customerObj) => {
         return (
          <Link to={`customers/${customerObj.id}`}>
            <User user={customerObj}/> 
          </Link>
         )
    })}
    </div>
  )
}