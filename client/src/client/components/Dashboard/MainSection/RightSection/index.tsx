import React from 'react'
import Calender from './Calender'
import MessageSection from './MessageSection'

const RightSection = () => {
  return (
    <div className='w-2/5'>
      <Calender />
      <MessageSection/>
    </div>
  )
}

export default RightSection
