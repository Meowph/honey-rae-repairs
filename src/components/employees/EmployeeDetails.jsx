import { useParams } from "react-router-dom"
import { getEmployeeByUserId } from "../../services/employeeService.jsx"
import { useEffect, useState } from "react"
import "./Employees.css"

export const EmployeeDetails = () => {

    const [employee, setEmployee] = useState({})
    // /employees/3 => this is the value
    // path ="/employee/:employeeId" => this is the key

    // destructure the return with { employeeId } ?
    // useParams will return an object with a key value pair
    // key is what is defined on the route (employeeId)
    const { employeeId } = useParams() // will return { employeeId: 3}

    useEffect(() => {
        //get employeeId through useParams from url
        //get data ARRAY from database
        getEmployeeByUserId(employeeId).then((data) => {
            //grab obj from array
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    }, [employeeId])

    return (
        <section className="employee">
            {/* expect user to be undefined upon first render so make optional */}
            <header className="employee-header">{employee.user?.fullName}</header>
            <div>
                <span className="employee-info">Email : </span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Specialty : </span>
                {employee.specialty}
            </div>
            <div>
                <span className="employee-info">Rate : </span>
                {employee.rate}
            </div>
            <footer>
                <div>
                    <p className="employee-footer">Currently working on {employee.employeeTickets?.length} tickets</p>
                </div>
            </footer>
        </section>
    )
}