import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Storagebucket from '../../appwriteapi/storage';
import Creatorbase from '../../appwriteapi/creator';
import Card from "../Card"

const Ariticalcards = ({ datas, logo = true }) => {
  const [coverurl, setcoverurl] = useState("")
  const [logourl, setlogourl] = useState("")
  const [menubar, setmenubar] = useState(false)
  const [shareopener, setshareopener] = useState(false)
  const [creatoor, setcreatoor] = useState([])

  const getcover = async () => {
    try {
      let cover = await Storagebucket.coverforpreview(datas.coverimg)
      const creator = await Creatorbase.getonecreator(datas.creatorid)
      const logo = await Storagebucket.logoforpreview(creator.creatorlogo)
      setcreatoor(creator)
      setcoverurl(cover.href)
      setlogourl(logo.href)
    } catch (error) {
      console.log("erron on articard", error);
    }
  }

  const copy  = (id)=>{
    navigator.clipboard.writeText(`http://localhost:5173/artical/${id}`)
    setmenubar(false)
    setshareopener(false)

  }
  useEffect(() => {
    getcover()


    return () => {
      setcoverurl("")
      setlogourl("")
      setcreatoor([])
    }
  }, [])

  return coverurl && logourl ? (
    <>
    <Card lable={"share"} opener={shareopener} setopener={setshareopener} >
      <div className='w-[80%] h-[80%] flex mx-auto flex-col justify-around items-center gap-3'>
      <p className=' text-neutral-400 text-[0.9rem] font-medium'>{datas.blogtitle}</p>
      <div className='w-full flex gap-5 items-center'>
        <Link to={`https://x.com/intent/post?url=http://localhost:5173/artical/${datas.$id}`} target="_blank">x</Link>
        <Link to={`https://api.whatsapp.com/send/?text=http://localhost:5173/artical/${datas.$id}`} target="_blank">whatapp</Link>
        <button onClick={()=> copy(datas.$id)}>copy</button>
      </div>
      </div>
    </Card>
    
      <div className=' w-[30%]  select-none group hover:bg-neutral-900/50 my-6 mx-3 '>
        <Link className=' w-fit' to={`/artical/${datas.$id}`} >
          <div className='w-full h-[13rem] overflow-hidden relative rounded-md'>
            <img src={coverurl} className='w-full h-full object-cover object-center  ' />
            <p className=' hidden group-hover:block duration-200 rounded-sm text-[0.7rem] bg-black/90 font-medium px-1 bottom-1 right-1 w-fit absolute text-neutral-300 overflow-hidden  '>{`${datas.$createdAt.substring(0, 10)}`}</p>
          </div>
        </Link>
        <div className=' w-[97%] mx-auto py-2 relative'>
          <div className='flex items-center justify-between min-h-[2.5rem]'>
            <Link className=' w-full' to={`/artical/${datas.$id}`} >
              <p className=' text-[0.9rem] font-semibold overflow-hidden inter'>{datas.blogtitle}</p>
            </Link>
            <button onClick={() => setmenubar(pre => !pre)} className=" text-[1.1rem] material-symbols-outlined">more_vert</button>
            <div className={` absolute bottom-24 right-0 w-[90%] rounded-md h-[10rem] bg-neutral-950 outline outline-1 outline-neutral-400/50 p-3 z-40 ${menubar ? "block" : "hidden"}`}>
            <button onClick={()=> setshareopener(pre=>!pre)} className='px-2 py-1 rounded-md hover:bg-neutral-800 duration-75 font-medium inter w-full text-left'>share</button>
            </div>
          </div>
          <div className='flex items-center gap-2 overflow-hidden w-[90%]'>
            {
              logo && <Link to={`/creator/${datas.creatorid}`} className=' overflow-hidden'>
                <img src={logourl} className='w-[2.5rem]  rounded-full  object-cover object-center' />
              </Link>
            }
            <div className=' w-full'>
              {logo && <p className='w-[80%] text-[0.8rem] text-nowrap text-neutral-400 font-medium overflow-hidden '>{creatoor.creatorname}</p>}

              {!logo && <p className='w-[99%] text-[0.8rem]  text-neutral-400 font-medium overflow-hidden '>{datas.bshortdes.substring(0, 100)}...</p>}

              <p className=' text-[0.8rem] text-neutral-200 font-medium overflow-hidden  '>{`${datas.view} views . ${creatoor.followers} followers`}</p>
            </div>
          </div>
        </div>

      </div>
    </>
  ) : (<>
    <div className='w-[30%] bg-neutral-800 mx-3 animate-pulse h-[18rem] rounded-md'></div>
  </>)
}

export default Ariticalcards