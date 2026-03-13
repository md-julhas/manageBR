import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  if (!user) return null;

  // Menu configuration
  const menuItems = {
    admin: [
      { path: "/admin/dashboard", label: "Dashboard" },
      { path: "/admin/users", label: "Users" },
      { path: "/admin/cost-data", label: "Cost Data" },
      { path: "/admin/profits", label: "Profits" },
    ],
    employee: [
      { path: "/employee/dashboard", label: "Dashboard" },
      { path: "/employee/create-invoice", label: "Create Invoice" },
      { path: "/employee/add-cost", label: "Add Cost" },
    ],
  };

  // Determine current route type
  const isAdminRoute = pathname.startsWith("/admin");
  const currentMenuType = isAdminRoute ? "admin" : "employee";

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">
        {currentMenuType === "admin" ? "Admin Menu" : "Employee Menu"}
      </h2>
      
      <nav className="flex flex-col space-y-2">
        {/* Render current menu items */}
        {menuItems[currentMenuType].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`hover:bg-gray-700 p-2 rounded ${
              pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}

        {/* Add switch button for admin users */}
        {user.role === "admin" && (
          <Link
            to={
              isAdminRoute 
                ? "/employee/dashboard" 
                : "/admin/dashboard"
            }
            className="hover:bg-gray-700 p-2 rounded mt-4 border-t border-gray-700 pt-4"
          >
            {isAdminRoute ? "Switch to Employee View" : "Access Admin Dashboard"}
          </Link>
        )}
      </nav>
    </aside>
  );
}