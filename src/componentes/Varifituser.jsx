import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthClient from '../appwriteapi/authentic'
import Screenloader from './Screenloader'
import { useDispatch } from "react-redux"
import { storelogin } from '../store/Authslice'

const Varifituser = () => {
  const [error, seterror] = useState(false)
  const [param] = useSearchParams()
  const userid = param.get("userId")
  const secret = param.get("secret")
  const naviget = useNavigate()
  const dispatch = useDispatch()

  const updater = async () => {
    try {
      seterror(false)
      const up = await AuthClient.Verifyuser(userid, secret)
      if (up) {
        dispatch(storelogin({ varyfied: true }))
        naviget("/")
      }
    } catch (error) {
      seterror(true)
    }
  }

  useEffect(() => {
    updater()
  }, [])

  return !error ? (
    <div className='w-full h-screen bg-black poppins'>
      <Screenloader send='varyfying' />
    </div>) : (<>
      <div className='w-full h-screen bg-black poppins'>
        something went worn
      </div>
    </>
  )
}

export default Varifituser