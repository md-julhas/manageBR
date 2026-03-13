import { useEffect, useState } from "react"
import api from "../../api/axios"
import DashboardLayout from "../../layouts/DashboardLayout"

export default function CreateInvoice() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    api
      .get("/employee/create-invoice")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error loading create invoice page"))
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
      <p>{message}</p>
    </DashboardLayout>
  )
}
