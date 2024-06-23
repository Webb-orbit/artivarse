import React, { useMemo, useState } from 'react'
import AuthClient from '../../appwriteapi/authentic'
import Creatorbase from '../../appwriteapi/creator'
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbarforcreator } from './Navbarforcreator'
import { useDispatch, useSelector } from 'react-redux'
import { creatorlogin } from '../../store/Creatorslice'

const Mailchannal = () => {
  const navig = useNavigate()
  const [channalinfo, setchannalinfo] = useState("")
  const {userdata} = useSelector(state=> state.authstore)
  const disp = useDispatch()

    const initfun = async()=>{
      try {
        const channal = (await Creatorbase.getcreatorbyuserid(userdata)).documents[0]
        if (channal) {
          setchannalinfo(channal)
          disp(creatorlogin(channal.$id))
          console.log("challdcsc",channal);
        }else{
          navig("/createchannel")
        }
      } catch (error) {
        console.log(error);
      }
    }

    useMemo(()=>{
        initfun()
    },[])

  return channalinfo?(
    <>
      <Navbarforcreator/>
      <Outlet/>
    </>
  ):null
}

export default Mailchannal