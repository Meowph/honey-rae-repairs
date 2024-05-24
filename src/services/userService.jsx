export const getNonStaffUsers = () => {
  return fetch("http://localhost:8088/users?isStaff=false").then((res) => res.json()
)
}