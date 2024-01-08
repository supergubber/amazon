import React from 'react'
import Banner from '../component/Home/Banner'
import Products from './Products'

const Home = () => {
  return (
    <div>
      <Banner />
      <div className='w-full py-10 -mt-14 lg:-mt-36'>
        <Products />
      </div>
    </div>
  )
}

export default Home
