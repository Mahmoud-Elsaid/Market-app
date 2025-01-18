


import React from 'react'

import { Outlet } from 'react-router-dom'
import Footer from './../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { Offline ,Online } from "react-detect-offline";

export default function Layout() {
    return (
        <>
            <div >
                <Online>
                    <Navbar/>
                    <div className='mt-5 py-5'>
                     <Outlet/>
                    </div>
                    
                    <Footer/>
                </Online>
                
                <Offline>
                    <Navbar/>
                    <div className=' vh-100 d-flex justify-content-center align-items-center'> <h1> <i className="fa-solid fa-wifi"></i> You arr offline (check your internet connection!)</h1></div>
                    <Footer/>
                </Offline>
            </div>
            
                
        </>
    )
}
