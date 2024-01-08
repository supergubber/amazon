import React from 'react'
import { footerBottomItem } from '../../constants'

const FooterBottom = () => {
  return (
    <div className='w-full py-8 bg-footerBottom'>
      <div className='max-w-5xl px-4 mx-auto'>
        <div className='grid w-full grid-cols-3 gap-3 text-gray-400 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-7 place-content-center'>
          {footerBottomItem.map((item, index) => (
            <div className='cursor-pointer group' key={index}>
              <h3 className='w-24 font-semibold text-[12px] group-hover:underline text-[#DDD] leading-3 mb-[2px]'>
                {item.title}
              </h3>
              <p className='w-24 -tracking-tight text-[12px] text-[#999] group-hover:underline leading-3'>
                {item.des}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FooterBottom
