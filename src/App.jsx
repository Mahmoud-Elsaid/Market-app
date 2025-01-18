

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from "./Components/Layout/Layout.jsx"
import Login from "./Components/Login/Login.jsx"
import Register from "./Components/Register/Register.jsx"
import Home from "./Components/Home/Home.jsx"
import Products from "./Components/Products/Products.jsx"
import Brands from "./Components/Brands/Brands.jsx"
import Categories from "./Components/Categories/Categories.jsx"
import Cart from "./Components/Cart/Cart.jsx"
import Notfound from "./Components/Notfound/Notfound.jsx"
import Categoriesdetailes from './Components/Categoriesdetailes/Categoriesdetailes.jsx';
import { useContext, useEffect } from 'react';
import { UserContext } from './Contexst/UserContext.jsx';
import ProtectedRote from './Components/ProtectedRote/ProtectedRote.jsx';
import Productsdetails from './Components/Productsdetails/Productsdetails';
import Onlinepaydetails from './Components/Onlinepaydetails/Onlinepaydetails';
import Allorders from './Components/Allorders/Allorders.jsx';
import Branddetails from './Components/Branddetails/Branddetails.jsx';

export default function App() {
    let {setToken} = useContext(UserContext);
    
    useEffect(()=>{
        setToken(localStorage.getItem("token"));
    } , [])

    
  
    let routers = createBrowserRouter([
        {path:"/" ,element:<Layout/> ,children:[
            { index: true, element:  <Register/> },
            {path:"/login" , element: <Login/>},
            {path:"/register" , element:<Register/>},
            {path:"/home" , element: <ProtectedRote><Home/></ProtectedRote>},
            {path:"/products" , element: <ProtectedRote><Products/></ProtectedRote> },
            {path:"/productsdetails/:productsId" , element: <ProtectedRote><Productsdetails/></ProtectedRote> },
            {path:"/brands" , element:<ProtectedRote><Brands/></ProtectedRote> },
            {path: ":brandsdetails/:brandId",element:<ProtectedRote><Branddetails/></ProtectedRote> },
            {path:"/categories" , element: <ProtectedRote><Categories/></ProtectedRote>},
            {path: ":categoriesdetails/:categoryId",element:<ProtectedRote><Categoriesdetailes /></ProtectedRote> },
            {path:"/cart" , element:<ProtectedRote><Cart/></ProtectedRote> },
            {path:"/Onlinepaydetails" , element:<ProtectedRote><Onlinepaydetails/></ProtectedRote> },
            {path:"/Allorders" , element:<ProtectedRote><Allorders/></ProtectedRote> },

            {path:"*" , element:<Notfound/>},
        ]}
    ])
    
  return (<RouterProvider  router={routers} ></RouterProvider>
  )
}
