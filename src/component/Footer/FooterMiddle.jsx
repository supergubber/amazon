import React from 'react'
import { MiddleList } from '../../constants'
import FooterMiddleList from './FooterMiddleList'
import { logo, bdFlag } from '../../assets'
const FooterMiddle = () => {
  return (
    <div className='w-full text-white bg-amazon_blue'>
      {/* Top Start here */}
      <div className='w-full border-b-[1px] border-gray-500 p-10'>
        <div className='max-w-5xl mx-auto text-gray-300'>
          <div className='grid w-full grid-cols-1 md:items-start lgl:grid-cols-4 md:grid-cols-2 md:place-items-center'>
            {MiddleList.map((item, index) => (
              <FooterMiddleList
                key={index}
                title={item.title}
                listItems={item.multi}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Top End here */}
      <div className='flex items-center justify-center w-full gap-6'>
        <div>
          <img src={logo} alt='logo' className='w-20 pt-3' />
        </div>
        <div className='flex gap-2'>
          <p className='flex items-center justify-center gap-1 px-2 py-1 duration-200 border border-gray-500 cursor-pointer hover:border-amazon_yellow'>
            English
          </p>
        </div>
        <div className='flex items-center justify-center gap-1 px-2 py-1 duration-200 border border-gray-500 cursor-pointer hover:border-amazon_yellow'>
          <img src={bdFlag} alt='logo' className='w-6' />
          <p>Bangladesh</p>
        </div>
      </div>
      {/* Bottom start here */}
      {/* Bottom End here */}
    </div>
  )
}

export default FooterMiddle
