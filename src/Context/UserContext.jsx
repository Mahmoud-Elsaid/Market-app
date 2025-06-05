



import React, { createContext, useState } from 'react'

export let userContext = createContext();

export default function UserContextProvider({children}) {

const [UserToken, setUserToken] = useState(null);
const [userData, setUserData] = useState(null)
    
    return (
        <userContext.Provider value={{UserToken , setUserToken , userData, setUserData}}>
            {children}
        </userContext.Provider>
  )
}
