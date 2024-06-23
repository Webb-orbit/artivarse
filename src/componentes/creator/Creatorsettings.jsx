import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card'
import Creatorbase from '../../appwriteapi/creator'
import { useNavigate } from 'react-router-dom'
import Storagebucket from '../../appwriteapi/storage'
import Blogbase from '../../appwriteapi/blogdatabase'

const Creatorsettings = () => {
  const [confirm, setconfirm] = useState(false)
  const [startdelete, setstartdelete] = useState(false)
  const { creatorid } = useSelector(state => state.creatorstore)
  const { userdata } = useSelector(state => state.authstore)
  const naviget = useNavigate()

  const deletecreator= async()=>{
    try {
      setstartdelete(true)
      const creatordata =   (await Creatorbase.getcreatorbyuserid(userdata)).documents[0]
      const deletecover = await Storagebucket.deletebanner(creatordata.creatorcover)
      const deletelogo = await Storagebucket.deletelogo(creatordata.creatorlogo)
      const allarticals  = (await Blogbase.listallblogsbycreator(creatorid)).documents

       let blogs =  await Promise.all(allarticals.map(async(e)=>{
          await Storagebucket.deletebcover(e.coverimg)
          await Blogbase.deleteblog(e.$id)
          return true;
        }))

      const deletedcreator = await Creatorbase.deletecreator(creatorid)
      if (deletedcreator && blogs && deletecover && deletelogo) {
        setstartdelete(false)
        setconfirm(false)
        naviget("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card lable={"confirm your action"} opener={confirm} setopener={setconfirm}>
        <div className='flex flex-col items-center justify-around w-full h-[70%]'>
          <h3 className=' text-center py-5 poppins'>Are you sure you want to delete the creator account?</h3>
          <div className='flex items-start gap-3'>
            <button onClick={deletecreator} disabled={startdelete} className={`px-3 py-2 bg-red-500 text-black font-semibold rounded-lg ${startdelete && "animate-pulse"} `}>Yes, delete the account.</button>

            <button onClick={() => setconfirm(pre => !pre)} disabled={startdelete} className={`px-3 py-2  bg-green-500 text-white font-semibold rounded-lg ${startdelete ? "opacity-50" : "opacity-100"}`}>No, keep the account</button>
          </div>
        </div>
      </Card>
      <div className='w-[90%] mx-auto min-h-screen max-h-full  p-10'>
        <div className='py-10'>
          <h3 className=' text-[1.2rem] capitalize'>settings</h3>
          <p className='text-[1.8rem]'>Set up Artivarse exactly how you want it</p>
        </div>
        <div className=' flex flex-col gap-10'>
          <div className='flex items-center justify-between w-[50%]'>
            <p className=' capitalize font-semibold text-[1rem]'>user id</p>
            <p className='px-3 rounded-xl  py-2 border-2 border-neutral-400'>{userdata}</p>
          </div>

          <div className='flex items-center justify-between w-[50%]'>
            <p className=' capitalize font-semibold text-[1rem]'>creator id</p>
            <p className='px-3 rounded-xl  py-2 border-2 border-neutral-400'>{creatorid}</p>
          </div>

          <div className='flex items-center justify-between w-[50%]'>
            <div>
            <p className=' capitalize font-semibold text-[1rem]'>delete channel</p>
            <p className=' capitalize font-semibold text-[0.7rem] text-neutral-400'>Deleting your Artivarse channel won't close your Artivarse Account</p>
            </div>
            <button onClick={() => setconfirm(pre => !pre)} className='px-3 rounded-md  py-1 inter text-[0.9rem] capitalize font-semibold border-neutral-400'>delete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Creatorsettings