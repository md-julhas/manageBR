import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import "./index.css"
import { StoreContextProvider } from "./context/StoreContext"
import { HelmetProvider } from "react-helmet-async"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AuthContextProvider>
          <StoreContextProvider>
            <App />
          </StoreContextProvider>
        </AuthContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)
