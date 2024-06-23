import { Link } from 'react-router-dom'
import Creatorbase from '../../appwriteapi/creator'
import Storagebucket from '../../appwriteapi/storage'
import { useCallback, useEffect, useState } from 'react'

const Sidelist = ({id}) => {
  const [creatordata, setcreatordata] = useState([])
  const [logourl, setlogourl] = useState("")

  const cretorsdata = async()=>{
      let creator = await Creatorbase.getonecreator(id)
      let logo = await Storagebucket.logoforpreview(creator.creatorlogo)
      setcreatordata(creator)
      setlogourl(logo.href)
      console.log(creator);
  }

  useEffect(()=>{
    cretorsdata()
  },[id])
  return creatordata && logourl? (
    <>
    <Link to={`/creator/${creatordata.$id}`}>
    <div className='flex gap-2 items-center my-1 rounded-lg p-2 hover:bg-neutral-800 h-12'>
    <img src={logourl} className='w-[1.8rem] h-[1.8rem] object-cover object-center rounded-full' />
    <p className='poppins text-[0.8rem] font-medium text-ellipsis  line-clamp-2 text-nowrap'>{creatordata.creatorname}</p>
    </div>
    </Link>
    </>
  ):<><div className=' animate-pulse my-1 rounded-lg p-2 bg-neutral-800 h-12'></div> </>
}

export default Sidelist