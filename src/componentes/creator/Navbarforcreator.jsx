import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbarforcreator = () => {

    const nav = [
        {
            name:"overview",
            url:"/channal/overview"
        },
        {
            name:"your articles",
            url:"articals"
        },
        {
            name:"create new",
            url:"create-artical"
        },
        {
            name:"settings",
            url:"settings"
        },
    ]
  return (
    <div className=' z-[10] sticky top-0'>
        <div className=' flex w-full justify-start items-center py-2 px-8 gap-2 bg-black border-t-[1px] '>
        {nav.map((e)=>(
            <NavLink key={e.url} to={e.url} className={({isActive})=>`${isActive && "bg-neutral-600/50"} px-3 py-1 rounded-md`}>
                <p className='text-[0.9rem]'>
                {e.name}
                </p>
            </NavLink>
        ))}
        </div>
    </div>
  )
}
