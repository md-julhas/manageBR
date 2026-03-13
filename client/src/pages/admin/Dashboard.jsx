import { useEffect, useState } from "react"
import api from "../../api/axios"
import DashboardLayout from "../../layouts/DashboardLayout"
import { useStoreContext } from "../../context/StoreContext"

export default function AdminDashboard() {
  const [message, setMessage] = useState("Loading...")
  const { test } = useStoreContext()

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error loading admin dashboard"))
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>{message}</p>
      <b>{test}</b>
    </DashboardLayout>
  )
}
