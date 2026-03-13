import { useEffect, useState } from "react"
import api from "../../api/axios"
import DashboardLayout from "../../layouts/DashboardLayout"

export default function CostData() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    api
      .get("/admin/cost-data")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error loading cost data"))
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Cost Data</h1>
      <p>{message}</p>
    </DashboardLayout>
  )
}
