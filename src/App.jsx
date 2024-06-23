import { useEffect, useState } from 'react'
import AuthClient from './appwriteapi/authentic'
import { useDispatch } from 'react-redux'
import { storelogin, storelogout } from './store/Authslice'
import Navbar from './componentes/Navbar'
import { Outlet } from 'react-router-dom'
import Readerbase from './appwriteapi/reader'
import Screenloader from './componentes/Screenloader'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)

  const fetchuserauth = async () => {
    setloading(true)
    try {
      const currentacc = await AuthClient.getcurrentuser()
      if (currentacc) {
        const reader = await Readerbase.getreaderbyuserid(currentacc.$id)
        if (reader.total>0) {
          dispatch(storelogin({ id: currentacc.$id, varyfied: currentacc.emailVerification, reader:reader.documents[0].$id }))
          setloading(false)
          console.log("precreated", currentacc, reader.documents[0].$id );
        }else{
          const createreader = await Readerbase.createreader(currentacc.$id)
          if (createreader) {
            dispatch(storelogin({ id: currentacc.$id, varyfied: currentacc.emailVerification, reader:createreader.$id }))
            setloading(false)
          console.log("nowcreated", currentacc, createreader.$id);
          }
        }
      } else {
        dispatch(storelogout())
      }
    } catch (error) {
      setloading(false)
      console.log("err", error);
    }
  }

  useEffect(() => {
    fetchuserauth()
  }, [])

  return loading ? (
    <Screenloader/>
  ) : (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App