import React from 'react'
import Left from './left'
import Right from './right'

function Need() {
  return (
    <div id='about' className='bg-[#F7F6F2] py-30 lg:px-20 px-10 relative'>
      <div className='flex xl:flex-row flex-col justify-between gap-15 lg:gap-20 xl:gap-32'>
        <div className='flex-1 xl:max-w-lg'>
          <Left />
        </div>
        {/* Give Right component enough space and ensure it doesn't get clipped */}
        <div className='flex-1 relative'>
          <Right />
        </div>
      </div>
    </div>
  )
}

export default Need