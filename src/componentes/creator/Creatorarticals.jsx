import React, { useEffect, useState } from 'react'
import Blogbase from '../../appwriteapi/blogdatabase'
import Editarticalslist from './Editarticalslist'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Noarticals from '../Noarticals'

const Creatorarticals = () => {
    const [creatorartical, setcreatorartical] = useState([])
    const [more, setmore] = useState(true)
    const { creatorid } = useSelector(state => state.creatorstore)

    const firstlist = async () => {
        try {
            let data = (await Blogbase.listblogsbycreator(creatorid)).documents
            setcreatorartical(data)
        } catch (error) {
            console.log(error);
        }
    }

    const nextblogs = async () => {
        try {
            const lastId = creatorartical[creatorartical.length - 1].$id;
            let nextdata = (await Blogbase.listcreatorblogsbyinfint(lastId, creatorid)).documents
            console.log(nextdata);
            if (nextdata.length > 0) {
                setmore(true)
                setcreatorartical(pre => [...pre, ...nextdata])
            } else {
                setmore(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        firstlist()
    }, [])
    return creatorartical?(
        <div className='w-full min-h-screen max-h-full py-10 poppins'>
            <div className='w-[85%] min-h-[50vh] mx-auto relative  rounded-md '>
                <div className='bg-black sticky top-10 w-full py-3 px-4 rounded-md ' >
                    <div className='flex justify-between py-2 select-none'>
                        <h2 className=' capitalize font-medium  text-[1.5rem]'>manage your articals</h2>
                        <Link to={"/channal/create-artical"} className='px-3 py-2 bg-green-500 text-[0.8rem] font-semibold uppercase rounded'>
                            create new
                        </Link>
                    </div>

                    <div className=' flex capitalize text-neutral-400 px-5 font-medium text-[0.9rem] gap-2'>
                        <p className='w-[50%]'>articals</p>
                        <p className='w-[15%]'>created</p>
                        <p className='w-[15%]'>last updated</p>
                        <p className='w-[10%]'>views</p>
                        <p className='w-[10%]'>likes</p>
                    </div>
                </div>

                <div>
                    {creatorartical.length !== 0 ? (<InfiniteScroll
                        next={nextblogs}
                        hasMore={more}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                        dataLength={creatorartical.length}>
                        {creatorartical.map((e) => (
                            <Editarticalslist key={e.$id} data={e} />
                        ))}
                    </InfiniteScroll>) : (
                        <Noarticals />
                    )}
                </div>

            </div>
        </div>
    ):null
}

export default Creatorarticals