import React from 'react'
import Left from './left'
import Right from './right'

function Need() {
  return (
    <div id='about' className='bg-[#F7F6F2] py-30 md:px-20 px-10 flex md:flex-row flex-col justify-between gap-15 overflow-hidden'>
      <Left />
      <Right />
    </div>
  )
}

export default Need