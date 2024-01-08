import React, { useState } from 'react'
import { logo } from '../../assets/index'
import {
  ArrowDropDownOutlined,
  LocationOnOutlined,
  Logout,
  Search,
  ShoppingCart,
} from '@mui/icons-material'
import { AllData } from '../../constants'
import HeaderBottom from './HeaderBottom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signOut } from 'firebase/auth'
import { userSignOut } from '../../Redux/splice/amazonSlice'

const Header = () => {
  const auth = getAuth()
  const dispatch = useDispatch()
  const [showAll, setShowAll] = useState(false)
  const [name, setName] = useState('All')
  const products = useSelector((state) => state.amazon.products)
  const userInfo = useSelector((state) => state.amazon.userInfo)
  console.log(userInfo)
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Sign out successfully')
        dispatch(userSignOut())
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
  }
  return (
    <div className='sticky top-0 z-50 w-full'>
      <div className='flex flex-row items-center gap-4 px-4 py-3 text-white w-ful bg-amazon_blue'>
        {/* Image start here */}
        <Link to='/'>
          <div className='headerHover'>
            <img src={logo} alt='logo' className='w-24 mt-2' />
          </div>
        </Link>
        {/* Image End here */}
        {/* Deliver Start here */}
        <div className='hidden headerHover mdl:inline-flex'>
          <LocationOnOutlined />
          <p className='text-sm font-light text-lightText'>
            Deliver to{' '}
            <span className='flex flex-col -mt-1 text-sm font-semibold text-whiteText'>
              Oman
            </span>
          </p>
        </div>
        {/* Deliver end here */}
        {/* Search Start here */}
        <div className='relative flex-row items-center justify-center flex-grow hidden h-10 rounded lgl:flex'>
          <span
            onClick={() => setShowAll(!showAll)}
            className='flex flex-row items-center justify-center w-auto h-full px-2 text-sm duration-300 bg-gray-200 border-2 cursor-pointer rounded-bl-md hover:bg-gray-300 text-amazon_blue font-titleFont rounded-tl-md'
          >
            {name}{' '}
            <span>
              <ArrowDropDownOutlined />
            </span>
          </span>
          {showAll && (
            <div>
              <ul className='absolute left-0 w-56 overflow-x-hidden overflow-auto bg-white h-80 top-10 border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50'>
                {AllData.map((item, index) => (
                  <li
                    key={index}
                    className='text-sm tracking-wide font-titleFont cursor-pointer border-b-transparent border-b-[1px] hover:border-b-amazon_blue duration-200'
                    onClick={() => setName(item.title)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* <select
            name='All'
            className='flex items-center justify-center h-full text-sm duration-300 bg-gray-200 border-2 cursor-pointer rounded-bl-md w-14 hover:bg-gray-300 text-amazon_blue font-titleFont rounded-tl-md'
          >
            {AllData.map((item, index) => (
              <option
                key={index}
                value={item.title}
                className='text-sm tracking-wide font-titleFont cursor-pointer border-b-transparent border-b-[1px] hover:border-b-amazon_blue duration-200'
              >
                {item.title}
              </option>
            ))}
          </select> */}
          <input
            type='text'
            className='flex flex-grow h-full px-2 text-base text-black border-none outline-none'
          />
          <span className='flex items-center justify-center w-12 h-full bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
            <Search />
          </span>
        </div>
        {/* Search end here */}
        {/* Signin Start here */}
        <Link to='/signin'>
          <div className='flex flex-col items-start justify-center headerHover'>
            {userInfo ? (
              <p className='text-sm font-medium text-gray-100'>
                {userInfo.userName}
              </p>
            ) : (
              <p className='text-xs font-light text-lightText'>
                Hello, sign in
              </p>
            )}

            <p className='hidden -mt-1 text-sm font-semibold text-white mdl:inline-flex'>
              Account & Lists{' '}
              <span>
                <ArrowDropDownOutlined />
              </span>
            </p>
          </div>
        </Link>
        {/* Orders Start here */}
        <div className='flex-col items-start justify-center hidden lgl:flex headerHover'>
          <p className='text-sm font-light text-white mdl:text-xs mdl:text-lightText'>
            Returns
          </p>
          <p className='-mt-1 text-sm font-semibold text-whiteText'>& Orders</p>
        </div>
        {/* Oreder End here */}
        {/* Cart Start here */}
        <Link to={'/cart'}>
          <div className='relative flex items-start justify-center headerHover '>
            <ShoppingCart />
            <p className='mt-3 text-xs font-semibold text-whiteText'>
              Cart{' '}
              <span className='absolute -top-1 p-1 text-xs font-semibold left-6 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>
        {userInfo && (
          <div
            onClick={handleLogout}
            className='relative flex flex-col items-center justify-center headerHover'
          >
            <Logout />
            <p className='hidden text-xs font-semibold text-white mdl:inline-flex'>
              Log out
            </p>
          </div>
        )}
        {/* Cart End here */}
      </div>
      <HeaderBottom />
    </div>
  )
}

export default Header
