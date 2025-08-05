import React from 'react'
import Left from './left'
import Right from './right'

function Need() {
  return (
    <div id='about' className='bg-[#F7F6F2] py-30 lg:px-20 px-10 flex lg:flex-row flex-col justify-between gap-15 overflow-hidden'>
      <Left />
      <Right />
    </div>
  )
}

export default Need