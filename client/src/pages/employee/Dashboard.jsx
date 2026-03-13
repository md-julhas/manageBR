import { useEffect, useState } from "react"
import api from "../../api/axios"
import DashboardLayout from "../../layouts/DashboardLayout"

export default function EmployeeDashboard() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    api
      .get("/employee/dashboard")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error loading dashboard"))
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
      <p>{message}</p>
    </DashboardLayout>
  )
}
