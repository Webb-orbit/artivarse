import { useEffect, useState } from 'react'
import AuthClient from '../../appwriteapi/authentic';
import { useNavigate } from 'react-router-dom';

const Danger = () => {
  const naviget = useNavigate()
  const [session, setsession] = useState([])

  const getsessons = async()=>{
    try {
      let get = (await AuthClient.listsession()).sessions
      setsession(get)
      console.log(get);
    } catch (error) {
      console.log(error);
    }
  }

  const logoutforall = async()=>{
    try {
      let deletes = await AuthClient.logoutall()
      if(deletes) {
        naviget("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteaccount = async()=>{
    try {
      console.log("hello");
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getsessons()
  },[])

  return (
    <div className='p-10'>
      <h2 className="select-none text-[1.9rem] capitalize poppins">danger zone</h2>
      <div className='p-6 border-b-[1px]'>
        <h3 className='select-none text-[1rem] capitalize poppins'>sign out for all devices</h3>
          <p className='text-[0.8rem] text-neutral-300'>logout all won't delete your artivarse Account!</p>
        <div className='flex items-center gap-4 w-full overflow-x-scroll scrollbar  my-5 inter'>
        {session.map((e)=>(
          <div key={e.$id} className={` relative cursor-default select-none bg-neutral-800 px-4 py-2 rounded-md text-[0.9rem] text-neutral-300 `}>
           {e.current && <div className=' w-1 h-1 rounded-full bg-green-500 absolute right-2 top-2'></div>}
            <p>{e.osCode}</p>
            <p>{e.clientName} {e.clientType}</p>
            <p className='text-[0.8rem]'>id {e.$id}</p>
          </div>
        ))}
        </div>
        <button onClick={logoutforall} className="px-2 py-1 m-4 text-[0.9rem] rounded-md font-medium capitalize bg-red-600">logout all</button>
      </div>

      <div className='p-6'>
        <h3 className='select-none text-[1rem] capitalize poppins'>delete account</h3>
        <p className='text-[0.8rem] text-neutral-300'>Deleting your creator account will remove all articles, subscriptions, and any associated data from the account!</p>
        <button onClick={deleteaccount} className="px-2 py-1 m-4 text-black text-[0.9rem] rounded-md font-medium capitalize bg-red-600">delete account</button>
      </div>
    </div>
  )
}

export default Danger