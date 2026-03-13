import { useEffect, useState } from "react"
import api from "../../api/axios"
import DashboardLayout from "../../layouts/DashboardLayout"

export default function Profits() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    api
      .get("/admin/profits")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error loading profits"))
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Profits</h1>
      <p>{message}</p>
    </DashboardLayout>
  )
}
