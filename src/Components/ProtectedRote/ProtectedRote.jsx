


import { Navigate } from 'react-router-dom'

export default function ProtectedRote({children}) {

    if(localStorage.getItem("token")){
        return children
    }
    else
    {
        return <Navigate to='/login'/>
    }

}
