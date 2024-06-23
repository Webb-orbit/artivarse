import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthClient from '../appwriteapi/authentic'
import Screenloader from './Screenloader'

const Varifituser = () => {
  const [error, seterror] = useState(false)
  const [param] = useSearchParams()
  const naviget = useNavigate()
  const userid = param.get("userId")
  const secret = param.get("secret")

  const updater = async () => {
    try {
      seterror(false)
      const up = await AuthClient.Verifyuser(userid, secret)
      if (up) {
        naviget("/")
      }
    } catch (error) {
      seterror(true)
    }
  }

  useEffect(() => {
    updater()
  }, [])

  return !error?(
  <div className='w-full h-screen bg-black poppins'>
      <Screenloader send='varyfiing' />
    </div>):(<>
  <div className='w-full h-screen bg-black poppins'>
    something went worn
  </div>
  </>
  )
}

export default Varifituser