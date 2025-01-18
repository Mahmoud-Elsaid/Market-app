import { createContext, useState } from "react"



export let UserContext = createContext()

export default function UserContextProvider({children}) {


    const [token, setToken] = useState(null);

    return (
        <UserContext.Provider value={{token , setToken}}>
            {children};
        </UserContext.Provider>
  )
}
