import React, { useEffect, useState } from 'react'
import { Creatoroverview } from './Creatoroverview'
import Ariticalcards from '../blog/Ariticalcards'
import Blogbase from '../../appwriteapi/blogdatabase'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Noarticals from '../Noarticals'

const Overview = () => {
  const {creatorid} = useSelector(state=> state.creatorstore)
  const [artics, setartics] = useState()
  const [more, setmore] = useState(true)

  async function getarticals () {
    try {
      let data = (await Blogbase.listblogsbycreator(creatorid)).documents
      setartics(data)
    } catch (error) {
      console.log(error);
    }
  }

  const nextblogs = async()=>{
    try {
      const lastId = artics[artics.length - 1].$id;
      let nextdata = (await Blogbase.listcreatorblogsbyinfint(lastId, creatorid)).documents
      if (nextdata.length>0) {
        setartics(pre=>[...pre, ...  nextdata])
        setmore(true)
      } else {
        setmore(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getarticals()
  },[])
  return artics?(
    <>
    <div className='w-[70%] h-full mx-auto py-5'>
        <Creatoroverview/>
    </div>
    
   { artics.length!==0?(<InfiniteScroll 
      dataLength={artics.length}
      next={nextblogs}
      hasMore={more}
      loader={<h4>Loading...</h4>}
      className='w-[90%] mx-auto my-10 flex gap-x-3 gap-y-10 flex-wrap'>

      {artics.map((e)=>(
        <Ariticalcards key={e.$id} datas={e}/>
      ))}
    </InfiniteScroll>):(<Noarticals/>)}

    </>
  ):null
}

export default Overview