import React from 'react'
import { NavLink } from 'react-router-dom'

const Profilesidebar = ({classes}) => {

  const sidenev = [
    {
      url:"/profile",
      name:"profile",
    },
    {
      url:"dangerzone",
      name:"dangerzone"
    },
  ]
  return (
    <>
    <div className={` h-full w-full  overflow-y-scroll scrollbar ${classes}`}>
        <div className='flex flex-col gap-4 mt-10 mx-2'>
          {sidenev.map((e)=>(
            <NavLink to={e.url} key={e.url} className={({isActive})=>`${isActive?" border-white/90 hover:text-zinc-100":null} p-2 text-[0.9rem] text-zinc-100 duration-50 border-2 border-transparent capitalize font-medium rounded-md ${!isActive?"hover:bg-neutral-700/50":null}`}>
              <div >
                <p>{e.name}</p>
              </div>
            </NavLink>
          ))}
        </div>
    </div>
    </>
  )
}

export default Profilesidebar