export const getAllEmployees = () => {
  return fetch ("http://localhost:8088/employees?_expand=user").then((res) => res.json()
)
}

export const getEmployeeByUserId = (userId) => {
  return fetch (`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&suserId=${userId}`
).then((res) => res.json())
}

// (employee) is new employee obj
export const updateEmployee = (employee) => {
  return fetch(`http://localhost:8088/employees/${employee.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(employee)
  })
}