import { useEffect, useState } from "react"
import api from "../../api/axios"
import DashboardLayout from "../../layouts/DashboardLayout"

export default function Users() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    api
      .get("/admin/users")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error loading users"))
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p>{message}</p>
    </DashboardLayout>
  )
}
