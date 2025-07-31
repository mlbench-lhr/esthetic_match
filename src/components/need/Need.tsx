import React from 'react'
import Left from './left'
import Right from './right'

function Need() {
  return (
    <div className='bg-[#F7F6F2] py-20 px-20 flex flex-row justify-between gap-15 overflow-hidden'>
      <Left />
      <Right />
    </div>
  )
}

export default Need