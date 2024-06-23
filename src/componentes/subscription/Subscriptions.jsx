import React, { useEffect, useState } from 'react'
import Readerbase from '../../appwriteapi/reader'
import { useSelector } from 'react-redux'
import Sidelist from './Sidelist'
import Subscriptioncard from './Subscriptioncard'


const Subscriptions = () => {
  const [scribers, setscribers] = useState([])
  const [scriberlogo, setscriberlogo] = useState([])
  const { userdata } = useSelector(state => state.authstore)

  const fetchdata = async () => {
    let subs = (await Readerbase.getreaderbyuserid(userdata)).documents[0].following  
    setscribers(subs)
  }



  useEffect(() => {
     fetchdata()
  }, [])

  return scribers ? (
    <>
      {console.log(scribers)}
      <div className=' flex justify-between gap-5'>

        <div className='scrollbar p-3 bg-neutral-950 w-[20%] h-screen sticky top-0 select-none overflow-y-scroll'>
          <h2 className=' font-medium capitalize mb-4'>Subscriptions</h2>
          {scribers.map((e) => (
            <Sidelist key={e} id={e} />
          ))}
        </div>

        <div className=' w-[80%]   flex gap-10 flex-col items-center py-8'>
        {scribers.map((e) => (
          <Subscriptioncard key={e} id={e} />
          ))}
        </div>
      </div>
    </>
  ) : null
}

export default Subscriptions