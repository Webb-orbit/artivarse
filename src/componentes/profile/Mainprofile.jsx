import React from 'react'
import { Profileheader } from './Profileheader'
import { Outlet } from 'react-router-dom'
import Profilesidebar from './Profilesidebar'

const Mainprofile = () => {
    return (
        <>
            <Profileheader classes={" h-[20vh]"} />
            <div className='flex w-full justify-between'>
                <div className='w-[20%] h-[100vh] sticky top-0'>
                    <Profilesidebar />
                </div>
                <div className='w-[75%]'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Mainprofile