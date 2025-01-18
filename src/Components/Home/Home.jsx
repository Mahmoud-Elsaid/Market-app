import React from 'react'
import Mainslider from '../Mainslider/Mainslider'
import Categoriesslider from '../Categoriesslider/Categoriesslider'
import Products from '../Products/Products'

export default function Home() {
  return (
    <div>
      <div className=' mb-5'>
          <Mainslider/>
      </div>
      
      <Categoriesslider/>
      <Products/>
    </div>
  )
}
