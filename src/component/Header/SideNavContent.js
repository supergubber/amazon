import { KeyboardArrowRight } from '@mui/icons-material'
import React from 'react'

const SideNavContent = ({ title, one, two, three }) => {
  return (
    <div className='py-3 border-b-[1px] border-b-gray-300'>
      <h3 className='px-6 mb-1 text-lg font-semibold font-titleFont'>
        {/* Digital Content & Devices */}
        {title}
      </h3>
      <ul className='text-sm'>
        <li className='flex items-center justify-between p-6 py-2 cursor-pointer hover:bg-zinc-200'>
          {one}{' '}
          <span>
            <KeyboardArrowRight />
          </span>
        </li>
        <li className='flex items-center justify-between p-6 py-2 cursor-pointer hover:bg-zinc-200'>
          {two}{' '}
          <span>
            <KeyboardArrowRight />
          </span>
        </li>
        <li className='flex items-center justify-between p-6 py-2 cursor-pointer hover:bg-zinc-200'>
          {three}{' '}
          <span>
            <KeyboardArrowRight />
          </span>
        </li>
      </ul>
    </div>
  )
}

export default SideNavContent
