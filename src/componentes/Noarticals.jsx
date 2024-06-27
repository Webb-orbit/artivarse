import React from 'react'
import noimg from "../midea/nomore.png"
import { Link } from 'react-router-dom'
const Noarticals = () => {
  return (
    <div className='w-full flex flex-col gap-2 items-center justify-center min-h-[80vh] max-h-full'>
        <img src={noimg} className='w-[25rem]' />
        <h3 className="uppercase font-semibold text-[1.5rem] animate-pulse">No articles found!</h3>
        <Link to={"/channal/create-artical"} className='px-5 py-2 bg-green-500 text-[0.8rem] font-semibold uppercase rounded'>create</Link>
    </div>
  )
}

export default Noarticals