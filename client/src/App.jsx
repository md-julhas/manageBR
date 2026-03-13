import { Routes, Route } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import EmployeeDashboard from "./pages/employee/Dashboard"
import AddCost from "./pages/employee/AddCost"
import CreateInvoice from "./pages/employee/CreateInvoice"
import AdminDashboard from "./pages/admin/Dashboard"
import Users from "./pages/admin/Users"
import CostData from "./pages/admin/CostData"
import Profits from "./pages/admin/Profits"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import { useEffect } from "react"
import Banned from "./pages/Banned"
import SendVerificationEmail from "./pages/SendVerificationEmail"
import VerifyEmail from "./pages/VerifyEmail"

export default function App() {
  // useEffect(() => {
  //   toast.info(
  //     "This is a hobby project hosted on a free-tier server, the initial data load may take about 1 minute due to server cold starts. Thanks for your patience!",
  //     { autoClose: 11000 }
  //   )
  // }, [])
  return (
    <div className="text-gray-700">
      <ToastContainer
        className="md:mt-12"
        theme="dark"
        position="top-right"
        autoClose={3000}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Employee Routes */}
        <Route element={<ProtectedRoute roles={["employee", "admin"]} />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/create-invoice" element={<CreateInvoice />} />
          <Route path="/employee/add-cost" element={<AddCost />} />
        </Route>

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/cost-data" element={<CostData />} />
          <Route path="/admin/profits" element={<Profits />} />
        </Route>

        <Route
          path="/send-verification-email"
          element={<SendVerificationEmail />}
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/banned" element={<Banned />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
