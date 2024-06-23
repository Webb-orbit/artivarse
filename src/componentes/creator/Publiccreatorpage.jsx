import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Creatorbase from '../../appwriteapi/creator'
import Storagebucket from '../../appwriteapi/storage'
import Blogbase from '../../appwriteapi/blogdatabase'
import Ariticalcards from '../blog/Ariticalcards'

const Publiccreatorpage = () => {
  const [coverurl, setcoverurl] = useState("")
  const [logourl, setlogourl] = useState("")
  const [articalscount, setarticalscount] = useState("")
  const [articals, setarticals] = useState([])
  const [creatrodata, setcreatrodata] = useState([])
  const { creatorid } = useParams()

  const fetchdata = async () => {
    let creator = await Creatorbase.getonecreator(creatorid)
    let cover = await Storagebucket.bannerforview(creator.creatorcover)
    let logo = await Storagebucket.logoforpreview(creator.creatorlogo)

    let listblogs = await Blogbase.listallblogsbycreator(creatorid)
    console.log("listblogs", listblogs);

    setarticalscount(listblogs.total)
    setarticals(listblogs.documents)

    setcoverurl(cover.href)
    setlogourl(logo.href)
    setcreatrodata(creator)
    console.log(creator);
  }


  useEffect(() => {
    fetchdata()
  }, [])

  return  (
    <>
      <div className='w-[70%] mx-auto py-5 flex flex-col gap-5 '>
        <div className='w-full rounded-md h-[13rem] bg-neutral-900 overflow-hidden'>
          <img src={coverurl} className='w-full h-full object-cover object-center' />
        </div>

        <div className='w-full flex items-center gap-3 py-4'>
          <img src={logourl} className=' border-[2.5px] border-[#a7e642] w-[9rem] h-[9rem] rounded-full object-cover object-center' />
          <div className='w-full h-full flex flex-col  gap-2'>
            <h1 className='poppins font-semibold text-[2rem] text-neutral-100 w-[90%] overflow-hidden'>{creatrodata.creatorname}</h1>
            <div className='flex gap-3 text-[0.8rem] text-neutral-300 select-none'>
              <p>{creatrodata.followers} followers</p>
              <p>{articalscount} articals</p>
            </div>
            <p className=' w-[90%] overflow-hidden text-nowrap'>{creatrodata.creatordes}</p>
            <button  className=' px-5 py-1 w-fit bg-black text-white rounded-2xl font-medium text-[0.9rem]'>
            subscribed
            <span className="text-[0.9rem] material-symbols-outlined">check</span>
            </button>
          </div>
        </div>
      </div>

      <div className='w-[90%] mx-auto my-10 flex gap-3 flex-wrap'>
      {articals?.map((e)=>(
        <Ariticalcards key={e.$id} datas={e} logo={false}/>
      ))

      }
      </div>
    </>
  )
}

export default Publiccreatorpage