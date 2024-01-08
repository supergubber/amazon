import React from 'react'

const FooterMiddleList = ({ title, listItems }) => {
  return (
    <div className='w-full mt-5 lg:mt-0'>
      <h3 className='mb-3 text-base font-semibold text-white font-titleFont'>
        {title}
      </h3>
      <ul className='flex flex-col gap-2 text-sm font-bodyFont'>
        {listItems.map((items, index1) => (
          <li key={index1} className='ml-1 footerLink'>
            {items.title1}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterMiddleList
