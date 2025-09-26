import React from 'react'
import Left from './left'
import Right from './right'

function Need() {
  return (
    <div id='about' className='bg-[#F7F6F2] py-10 lg:py-20 lg:px-20 px-8 relative '>
      <div className='flex flex-col xl:flex-row justify-between items-start max-w-[1440px] mx-auto w-full gap-10'>
        <div className='flex-1 '>
          <Left />
        </div>
        {/* Give Right component enough space and ensure it doesn't get clipped */}
        <div className='lg:max-w-full mx-auto relative'>
          <Right />
        </div>
      </div>
    </div>
  )
}

export default Need