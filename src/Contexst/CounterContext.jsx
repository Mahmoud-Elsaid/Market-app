

import  { createContext, useState } from 'react'

export let CounterContext = createContext() ;

export default function CounterContextProvider({children}) {
    const [relatedProduct, setRelatedProduct] = useState();
    
    

  return <CounterContext.Provider value={{relatedProduct , setRelatedProduct }}>
    {children}
  </CounterContext.Provider>
    

}
