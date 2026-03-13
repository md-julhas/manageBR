import { createContext, useContext, useState } from "react"

const StoreContext = createContext()

export const StoreContextProvider = ({ children }) => {
  const [test, setTest] = useState("test context value")

  const contextValue = {
    test,
    setTest,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext)
