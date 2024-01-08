import { AccountCircle, Menu, Close } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import SideNavContent from './SideNavContent'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
const HeaderBottom = () => {
  const userInfo = useSelector((state) => state.amazon.userInfo)
  const [sidebar, setSidebar] = useState(false)
  const ref = useRef()
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false)
      }
    })
  }, [ref, sidebar])
  return (
    <div className='w-full px-4 h-[36px] bg-amazon_light text-white flex items-center'>
      {/* ListItems Start here */}
      <ul className='flex items-center gap-2 text-sm tracking-wide'>
        <li
          className='flex items-center gap-1 headerHover'
          onClick={() => setSidebar(true)}
        >
          <Menu /> All
        </li>
        <li className='hidden headerHover md:inline-flex'>Today's Deals</li>
        <li className='hidden headerHover md:inline-flex'>Customer Service</li>
        <li className='hidden headerHover md:inline-flex'>Gift Cards</li>
        <li className='hidden headerHover md:inline-flex'>Sell</li>
      </ul>
      {/* ListItems End here */}
      {/* SideNav Start here */}
      {sidebar && (
        <div className='fixed top-0 left-0 w-full h-screen text-black bg-opacity-50 bg-amazon_blue'>
          <div className='relative w-full h-full'>
            <motion.div
              ref={ref}
              initial={{ s: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='w-[80%] md:w-[350px] h-full bg-white border border-black'
            >
              <div className='flex items-center w-full gap-4 px-6 py-2 text-white bg-amazon_light'>
                {userInfo ? (
                  <img
                    className='w-10 h-10 rounded-full'
                    src={userInfo.image}
                    alt='userimg'
                  />
                ) : (
                  <AccountCircle />
                )}
                {userInfo ? (
                  <h3 className='text-lg font-bold tracking-wide font-titleFont'>
                    {userInfo.userName}
                  </h3>
                ) : (
                  <h3 className='text-lg font-bold tracking-wide font-titleFont'>
                    Hello, Sign In
                  </h3>
                )}
              </div>
              <SideNavContent
                title='Digital Content & Devices'
                one='Amazon Music'
                two='Kindle E-reader & Books'
                three='Amazon Appstore'
              />
              <SideNavContent
                title='Shop By Department'
                one='Electronics'
                two='Computer'
                three='Smart Home'
              />
              <SideNavContent
                title='Programs && Features'
                one='Gift Cards'
                two='Amazon live'
                three='international Shopping'
              />
              <SideNavContent
                title='Help & Settings'
                one='Your Account'
                two='Customer Service'
                three='Contact Us'
              />
              <span
                onClick={() => setSidebar(false)}
                // className='absolute cursor-pointer top-0 left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-gray-300'
                className='absolute top-0 cursor-pointer left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-200 hover:text-white duration-300'
              >
                <Close />
              </span>
            </motion.div>
          </div>
        </div>
      )}
      {/* sideNav End here */}
    </div>
  )
}

export default HeaderBottom
