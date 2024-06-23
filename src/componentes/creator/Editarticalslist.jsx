import React, { useEffect, useState } from 'react'
import Storagebucket from '../../appwriteapi/storage';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../Card';
import Blogbase from '../../appwriteapi/blogdatabase';

const Editarticalslist = ({ data }) => {
    const [coverurl, setcoverurl] = useState("")
    const [deleteation, setdeleteation] = useState(false)
    const [startdelete, setstartdelete] = useState(false)
    const navi = useNavigate()


    const fetchcover = async () => {
        try {
            const cover = await Storagebucket.coverforpreview(data.coverimg)
            setcoverurl(cover.href)
        } catch (error) {
            console.log(error);
        }
    }

    const deletearticle = async()=>{
        try {
            setstartdelete(true)
            let deletecover = await Storagebucket.deletebcover(data.coverimg)
            let deleteartical = await Blogbase.deleteblog(data.$id)
            if (deletecover && deleteartical) {
                setdeleteation(false)
                setstartdelete(false)
            }
        } catch (error) {
            console.log(error);
            setstartdelete(false)
        }
    }

    useEffect(() => {
        fetchcover()

        return () => {
            setcoverurl("")
        }
    }, [])

    return (
        <>
            <Card lable={"Please confirm your action."} opener={deleteation} setopener={setdeleteation} classes={"h-[70%] w-[70%]"}>
                <div className='flex flex-col items-center justify-around w-full h-[70%]'>
                <h3 className=' text-center py-5 poppins'>Are you sure you want to delete the article?</h3>
                <p className='text-[1rem] w-[80%] text-center text-neutral-300 font-semibold'>{data.blogtitle}</p>
                <div className='flex items-start gap-3'>
                <button onClick={deletearticle} disabled={startdelete} className={`px-3 py-2 bg-red-500 text-black font-semibold rounded-lg ${startdelete && "animate-pulse"} `}>Yes, delete the Article.</button>
                <button onClick={() => setdeleteation(pre => !pre)} disabled={startdelete}  className={`px-3 py-2  bg-green-500 text-white font-semibold rounded-lg ${startdelete?"opacity-50":"opacity-100"}`}>No, keep the Article</button>
                </div>
                </div>
            </Card>

            <div className='py-3 flex gap-2 bg-black px-5 hover:bg-neutral-900'>
                <div className=' flex gap-2 w-[50%] items-center h-[5rem]'>
                    <div className='  w-[9rem] h-[5rem] overflow-hidden'>
                        <Link to={`/artical/${data.$id}`}>
                            <img src={coverurl} className=' w-full h-full object-cover object-center ' />
                        </Link>
                    </div>
                    <div className='w-full group h-full'>
                        <p className='text-[0.8rem] font-semibold'>{data.blogtitle.substring(0, 60)}</p>
                        <div className='group-hover:hidden'>
                            <p className='text-[0.7rem] text-neutral-300'>{data.bshortdes}</p>
                        </div>
                        <div className=' hidden gap-2 group-hover:flex h-full items-center justify-start'>
                            <button onClick={() => navi(`/channal/edit-artical/${data.$id}`)} className="material-symbols-outlined text-[1rem]">edit</button>
                            <button onClick={() => setdeleteation(pre => !pre)} className="material-symbols-outlined text-[1rem] ">delete</button>
                        </div>
                    </div>
                </div>

                <div className='text-[0.8rem] w-[15%]'>
                    <p>{data.$createdAt.substring(0, 10)}</p>
                </div>

                <div className='text-[0.8rem] w-[15%]'>
                    <p>{data.$updatedAt.substring(0, 10)}</p>
                </div>

                <div className='text-[0.8rem] w-[10%]'>
                    <p>{data.view}</p>
                </div>

                <div className='text-[0.8rem] w-[10%]'>
                    <p>{data.likes}</p>
                </div>
            </div>
        </>
    )
}

export default Editarticalslist