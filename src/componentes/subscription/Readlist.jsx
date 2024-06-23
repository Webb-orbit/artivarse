import React, { useEffect, useState } from 'react'
import Storagebucket from '../../appwriteapi/storage'
import { Link } from 'react-router-dom'

const Readlist = ({ data }) => {
    const [coverurl, setcoverurl] = useState("")

    const fetchimg = async () => {
        const cover = await Storagebucket.bcoverforview(data.coverimg)
        setcoverurl(cover.href)
    }

    useEffect(() => {
        fetchimg()
    }, [])
    return (
        <Link to={`/artical/${data.$id}`}>
        <div className='w-[15rem] select-none '>
            <img src={coverurl} className='w-full h-[8rem] object-cover object-center' />
            <p className='text-[0.7rem] inter my-2'>{data.blogtitle}</p>
            <p className='text-[0.6rem] inter my-2'>{data.view} views </p>
        </div>
        </Link>
    )
}

export default Readlist