import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Blogbase from '../../appwriteapi/blogdatabase'
import { useSelector } from 'react-redux'
import CreateArtical from './CreateArtical'

const Editartical = () => {
    const {articalid} = useParams()
    const naviget = useNavigate()
    const { creatorid } = useSelector(state => state.creatorstore)
    const [editedblog, seteditedblog] = useState(null)

    const Navigate = async()=>{
        const allblogs = (await Blogbase.listallblogsbycreator(creatorid)).documents
        const varify = allblogs.filter((e)=>e.$id == articalid)
        if (varify.length>0) {
            seteditedblog(varify[0])
        }else{
            naviget("/")
        }
        console.log("varify", varify);
 
    }

    useEffect(()=>{
        Navigate()
    },[articalid])

  return editedblog?(
    <div>
        Editartical {articalid}
        <CreateArtical edit={editedblog}/>
    </div>
  ):null
}

export default Editartical