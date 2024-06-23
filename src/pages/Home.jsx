import React, { useEffect, useState } from 'react'
import Header from '../componentes/Header'
import Ariticalcards from '../componentes/blog/Ariticalcards'
import Creatorbase from '../appwriteapi/creator'
import Blogbase from '../appwriteapi/blogdatabase'
import { useSelector } from 'react-redux'

import InfiniteScroll from 'react-infinite-scroll-component'


const Home = () => {
  const [artics, setartics] = useState([])
  const [more, setmore] = useState(true)

 async function getarticals () {
    try {
      let data = (await Blogbase.listblog()).documents
      setartics(data)
    } catch (error) {
      console.log(error);
    }
  }

  const nextblogs = async()=>{
    try {
      const lastId = artics[artics.length - 1].$id;
      let nextdata = (await Blogbase.listblogsbyinfint(lastId)).documents
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
  return (
    <>
    <Header/>

      <InfiniteScroll 
      dataLength={artics.length}
      next={nextblogs}
      hasMore={more}
      loader={<h4>Loading...</h4>}
      className='w-[90%] mx-auto my-40 flex gap-3 flex-wrap'>

      {artics.map((e)=>(
        <Ariticalcards key={e.$id} datas={e}/>
      ))
      
    }
    </InfiniteScroll>

    </>
  )
}

export default Home