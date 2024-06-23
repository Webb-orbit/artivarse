import React, { useEffect, useState } from 'react'
import Creatorbase from '../../appwriteapi/creator'
import Storagebucket from '../../appwriteapi/storage'
import Blogbase from '../../appwriteapi/blogdatabase'
import Readlist from './Readlist'
import { Link } from 'react-router-dom'

const Subscriptioncard = ({id}) => {
  const [creatordata, setcreatordata] = useState()
  const [logourl, setlogourl] = useState("")
  const [blogs, setblogs] = useState([])
  
  const fetchdatas = async()=>{
    let creator = await Creatorbase.getonecreator(id)
    let logo = await Storagebucket.logoforpreview(creator.creatorlogo)
    let latestblogs = (await Blogbase.listblogsbycreator(id)).documents
    console.log(latestblogs);
    setcreatordata(creator)
    setlogourl(logo.href)
    setblogs(latestblogs)
  }

  useEffect(()=>{
    fetchdatas()
  },[])

  return logourl?(
    <div className=' w-[90%] h-fit p-3 bg-neutral-900 rounded-md flex flex-col gap-6'>
      <div className=' flex gap-3'>
        <Link to={`/creator/${creatordata.$id}`}>
        <img src={logourl} className='w-[4.5rem] h-[4.5rem] rounded-full object-cover object-center' />
        </Link>
        <div>
          <h4 className=' text-[1.2rem] font-semibold roboto'>{creatordata.creatorname}</h4>
          <p className='text-[0.7rem] font-medium capitalize inter text-neutral-300 '>{creatordata.followers} followers</p>
          <p className=''>{creatordata.creatordes.substring(0, 150)}...</p>
        </div>
      </div> 
      <div className='w-full '>
        <h5 className=' text-[1rem] font-semibold roboto mb-2'>latest articals</h5>
      <div className=' gap-3 w-full flex justify-between overflow-x-scroll scrollbar'>
        {blogs.map((e)=>(
          <Readlist key={e.$id} data={e}/>
        ))}
      </div>
        </div>
    </div>
  ):<p>loadding</p>
}

export default Subscriptioncard