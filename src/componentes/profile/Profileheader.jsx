import React from 'react'

export const Profileheader = ({classes}) => {

  return (
    <>
    <div className={`w-full  bg-neutral-800/50 ${classes}` }>
        <div className='w-full h-full flex items-center'>
          <h1 className=' text-[2.5rem] ml-20 capitalize poppins'>profile</h1>
        </div>
    </div>
    </>
  )
}
