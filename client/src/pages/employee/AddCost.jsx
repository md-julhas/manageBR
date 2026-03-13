import { useEffect, useState } from "react"
import api from "../../api/axios"
import DashboardLayout from "../../layouts/DashboardLayout"

export default function AddCost() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    api
      .get("/employee/add-cost")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error loading add cost page"))
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Add Cost</h1>
      <p>{message}</p>
    </DashboardLayout>
  )
}
