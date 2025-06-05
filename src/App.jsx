
import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Category from './Components/Category/Category';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import { userContext } from './Context/UserContext';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Check from './Components/check/check';
import Profile from './Components/Profile/Profile';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import Onlinepaydetails from './Components/OnlinPayment/OnlinePayment';
import ProfileDetails from './Components/ProfileDetails/ProfileDetails';
import AllOrders from './Components/AllOrders/AllOrders';



let routes = createBrowserRouter([
  {path:'/' , element:<Layout/> , children:[
    {index:true , element:<Home/>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'home' , element:<Home/>},
    {path:'Products' , element:<Products/>},
    {path:'ProductDetails/:productCategory/:productId' , element:<ProductDetails/>},
    {path:'cart' , element:<Cart/>},
    {path:'category' , element:<Category/>},
    {path:'categoryProducts/:categoryId' , element:<CategoryProducts/>},
    {path:'brands' , element:<Brands/>},
    {path:'brandProducts/:brandId' , element:<BrandProducts/>},
    {path:'check' , element:<Check/>},
    {path:'allorders' , element:<AllOrders/>},
    {path:'onlinepayment' , element:<Onlinepaydetails/>},
    {path:'profile' , element:<Profile/> , children:[
          {path:'profileDetails' , element:<ProfileDetails/>},

    ]},
    {path:'*' , element:<NotFound/>},
  ]}
])

export default function App() {

  let {setUserToken}  = useContext(userContext)
  useEffect(()=>{
      setUserToken(localStorage.getItem('Token'));
  } , [])
  
  return <RouterProvider router={routes}></RouterProvider>
}


