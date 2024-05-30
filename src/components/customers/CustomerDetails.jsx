import { useParams } from "react-router-dom"
import { getCustomerByUserId } from "../../services/customerService.jsx"
import { useEffect, useState } from "react"
import "./Customers.css"

export const CustomerDetails = () => {

  const [customer, setCustomer] = useState({})
    // /customers/3 => this is the value
    // path ="/customer/:customerId" => this is the key

    // destructure the return with { customerId } ?
    // useParams will return an object with a key value pair
    // key is what is defined on the route (customerId)
    const { customerId } = useParams() // will return { customerId: 3}

    useEffect(() => {
        //get customerId through useParams from url
        //get data ARRAY from database
        getCustomerByUserId(customerId).then((data) => {
            //grab obj from array
            const customerObj = data[0]
            setCustomer(customerObj)
        })
    }, [customerId])

    return (
        <section className="customer">
            {/* expect user to be undefined upon first render so make optional */}
            <header className="customer-header">{customer.user?.fullName}</header>
            <div>
                <span className="customer-info">Email : </span>
                {customer.user?.email}
            </div>
            <div>
                <span className="customer-info">Address : </span>
                {customer.address}
            </div>
            <div>
                <span className="customer-info">Phone Number : </span>
                {customer.phoneNumber}
            </div>
        </section>
    )
}
