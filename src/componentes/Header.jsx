import React from 'react'
import banner from "../midea/2148151036.jpg"
import Search from './Search'
const Header = () => {
  return (
    <div className='h-[20rem] w-full bg-zinc-800 relative select-none flex justify-between'>
      <div className='px-12 pt-14 z-[2]'>
        <div className='pb-4'>
          <h1 className='gugi text-[2.8rem]  w-[80%] font-semibold text-neutral-900'>Discover, Learn, and Grow with Our Expert Articles</h1>
          <p className='text-[1rem] inter text-neutral-800 capitalize font-medium'>we believe in the power of knowledge. Dive into our extensive collection of articles</p>
        </div>
        <div className='w-[50%]'>
          <Search bg={"bg-neutral-100"} color={"text-black"} />
        </div>
      </div>
      <img src={banner} className=' z-[1] absolute w-[100%] h-full object-cover object-center ' />
    </div>
  )
}

export default Header