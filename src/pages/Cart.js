import { CheckCircle } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrementQuantity,
  deleteProduct,
  incrementQuantity,
  removeAll,
} from '../Redux/splice/amazonSlice'
import { motion } from 'framer-motion'
import { emptyCart } from '../assets'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const products = useSelector((state) => state.amazon.products)
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)
  console.log(products)
  const navigate = useNavigate()
  useEffect(() => {
    let Total = 0
    products.map((item) => {
      Total += item.quantity * item.price
      return setTotalPrice(Total)
    })
    if (products.length === 0) {
      setTotalPrice(0)
    }
  }, [products])

  const DeleteItem = (index) => {
    dispatch(deleteProduct(index))
    let Total = 0
    products.map((item) => {
      if (Total > 0) {
        Total -= item.price * item.quantity
      } else {
        Total = 0
      }

      return setTotalPrice(Total)
    })
  }

  return (
    <div className='w-full h-full p-4 bg-gray-100'>
      {products.length > 0 ? (
        <div className='container grid gap-8 mx-auto md:grid-cols-5'>
          <div className='w-full h-full col-span-4 px-4 bg-white'>
            <div className='flex items-center justify-between font-titleFont border-b-[1px] border-b-gray-400 py-3'>
              <h2 className='text-3xl font-medium'>Shopping Cart</h2>
              <h4 className='text-xl font-normal'>Subtitle</h4>
            </div>
            <div>
              {products.map((item, index) => (
                <div
                  key={index}
                  className='w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6'
                >
                  <div className='flex items-center justify-between w-full '>
                    <div className='w-1/5 '>
                      <img
                        className='object-contain w-full h-44'
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className='w-3/5'>
                      <h2 className='text-lg font-semibold'>{item.title}</h2>
                      <p className='text-sm '>
                        {item.description.substring(0, 200)} one
                      </p>
                      <p className='text-base '>
                        Unit Price{' '}
                        <span className='font-semibold'> ${item.price}</span>
                      </p>
                      <div className='bg-[#F0F2F2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md'>
                        <p>Qty:</p>
                        <p
                          className='px-1 duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-bg-zinc-400'
                          onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                          -
                        </p>
                        <p>{item.quantity}</p>
                        <p
                          className='px-1 duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-bg-zinc-400'
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                          +
                        </p>
                      </div>
                      <button
                        className='py-1 mt-2 text-white duration-300 bg-red-500 rounded-lg w-36 hover:bg-red-700 active:bg-red-900'
                        onClick={() => DeleteItem(index)}
                      >
                        Delete Item
                      </button>
                    </div>
                    <div>
                      <p className='text-lg font-semibold font-titleFont '>
                        {(item.price * item.quantity).toFixed(3)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full py-2'>
              <button
                onClick={() => dispatch(removeAll())}
                className='px-10 py-2 text-lg font-semibold tracking-wide text-white bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-50 font-titleFont'
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full col-span-1 p-4 bg-white h-52'>
            <div>
              <p>
                <span>
                  <CheckCircle className='text-green-500 bg-white rounded-full' />
                </span>
                Your order qualifies for FREE Shipping Choose this option at
                checkout. See details
              </p>
            </div>
            <div>
              <p className='flex items-center justify-between gap-2 px-10 py-1 font-semibold'>
                Total :{' '}
                <span className='text-lg font-bold'>
                  ${Number(totalPrice).toFixed(3)}
                </span>
              </p>
            </div>
            <button className='w-full text-base font-medium border border-yellow-500 font-titleFont bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-200 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'>
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='flex items-center justify-center gap-4 py-10'
        >
          <div>
            <img
              src={emptyCart}
              alt=''
              className='p-4 mx-auto rounded-lg w-80'
            />
          </div>
          <div className='flex flex-col items-center p-4 bg-white rounded-md shadow-lg w-96'>
            <h1 className='text-xl font-bold font-titleFont'>
              Your Cart feels lonely
            </h1>
            <p className='text-sm text-center'>
              Your Shopping cart lives to server. Give it purpose - fill it with
              books, electronics videos, etc. and make it happy
            </p>
            <button
              onClick={() => navigate('/')}
              className='px-8 py-2 mt-6 text-lg font-semibold bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 font-titleFont'
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Cart
