import React from 'react'
import {Link} from "react-router-dom"

const Logo = () => {
  return (
    <div className='flex items-center justify-start w-[25%]'>
        <Link to={"/"}>
        <h2 className=' capitalize gugi text-[1.3rem] font-semibold text-neutral-100 tracking-[1px]'>artivarse</h2>
        </Link>
    </div>
  )
}

export default Logo