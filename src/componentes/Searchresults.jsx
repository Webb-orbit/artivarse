import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Blogbase from '../appwriteapi/blogdatabase'
import Ariticalcards from './blog/Ariticalcards'

const Searchresults = () => {
  const { params } = useParams()
  const [articals, setarticals] = useState(null)

  const letmakearray = async () => {
    let rowparam = params.replace(/-/g, " ")
    let arrkeywords = params.split("-")
    let finile = [...arrkeywords, rowparam]
    let blogkeyword = (await Blogbase.glogsbykeywords(finile)).documents
    setarticals(blogkeyword)
  }

  useEffect(() => {
    letmakearray()
  }, [params])


  return articals?(
    <>
      <div className='text-[1.1rem] font-medium mx-2' >Search: {params.replace(/-/g, " ")}</div>
      <div className='w-[90%] mx-auto my-40 flex gap-3 flex-wrap'>
        {articals.length>0? articals.map((e) => (
          <Ariticalcards key={e.$id} datas={e} />
        )):<div className='w-full text-center'>no results found</div>}
      </div>
    </>
  ):null
}

export default Searchresults