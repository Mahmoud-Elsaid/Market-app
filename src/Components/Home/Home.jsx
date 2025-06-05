

import React, { useContext } from 'react'
import './Home.module.css'
import { userContext } from '../../Context/UserContext'
import CategorySlider from '../CategorySlider/CategorySlider'
import Header from '../Header/Header'
import Products from '../Products/Products'
export default function Home() {

    let {UserToken} = useContext(userContext)

  return (
    <>
        <Header/>
        <CategorySlider/>
        <Products/>
    </>
  )
}
