import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthClient from '../appwriteapi/authentic'
import { useDispatch } from 'react-redux'
import { storelogin } from '../store/Authslice'

const Signup = () => {
  const dispatch = useDispatch()
  const naviget = useNavigate()

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  const [error, seterror] = useState("")

  const controlle = async (e) => {
    e.preventDefault()
    seterror("")
    try {
      let creation = await AuthClient.firstcreate(email, password, name)
      if (creation) {
        dispatch(storelogin({ id: creation.$id, varyfied: creation.emailVerification }))
        naviget("/")
      }
    } catch (error) {
      seterror(error)
      console.error(error);
    }
  }

  return (
    <div className='w-full min-h-screen max-h-full flex justify-center items-center bg-neutral-900'>
      <div className='w-[35%] h-[80%] flex flex-col justify-around gap-6'>
        <div className='w-full'>
          <h2 className='text-[1.5rem] poppins text-center capitalize'>sign up to Artiverse</h2>
          <p className='text-[0.8rem] poppins text-center text-neutral-300'>create and share your articles on our platform</p>
        </div>
        <p className=' text-red-100 text-right text-[0.7rem]'>{error.response ? error.response.message : null}</p>
        <div>
          <form onSubmit={controlle}>
            <input placeholder='email' type="email" onChange={(e) => setemail(e.target.value)} value={email} spellCheck="false" className='w-full rounded-md mt-4 h-10 px-2 text-[0.9rem] bg-black/50 outline-1 outline-neutral-400/50 outline' />

            <input placeholder='password' type="text" onChange={(e) => setpassword(e.target.value)} value={password} spellCheck="false" className='w-full mt-4  rounded-md h-10 px-2 text-[0.9rem] bg-black/50 outline-1 outline-neutral-400/50 outline' />

            <input placeholder='name' type="text" onChange={(e) => setname(e.target.value)} value={name} spellCheck="false" className='w-full mt-4  rounded-md h-10 px-2 text-[0.9rem] bg-black/50 outline-1 outline-neutral-400/50 outline' />


            <button className='w-full mt-8 rounded-md h-8 px-2 text-[1rem] font-medium  bg-[#a7fb1f] text-black outline-1 outline-neutral-400/50 outline' type="submit">sign up</button>
          </form>
        </div>
        <div className='flex flex-col items-center gap-8'>
          <p className=''>or authorized with</p>
          <div className='w-full flex justify-around'>
            <button onClick={() => AuthClient.createvaryfy()} className=' w-[40%] bg-[#ffffff] text-black py-1 rounded-md capitalize font-semibold '>google</button>
            <button onClick={async () => console.log(await AuthClient.getcurrentuser())} className=' w-[40%] bg-[#cb88ff] text-black py-1 rounded-md capitalize font-semibold '>github</button>
          </div>
        </div>
        <div>
<p className=' capitalize text-[0.8rem]'>alrady have an account? <Link className=' text-lime-200 font-medium' to={"/login"}>login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup