import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthClient from '../appwriteapi/authentic'
import { useDispatch } from 'react-redux'
import { storelogin } from '../store/Authslice'
import Card from './Card'
import { useForm } from 'react-hook-form'

const Login = () => {
  const dispatch = useDispatch()
  const naviget = useNavigate()
  const [passwordtoggle, setpasswordtoggle] = useState(false)
  const [passemail, setpassemail] = useState("")

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()

  const controllelog = async (data) => {
    try {
      console.log(data)
      let loog = await AuthClient.login(data.email, data.password)
      if (loog) {
        dispatch(storelogin({ "id": loog.$id, "varyfied": loog.emailVerification }))
        naviget("/")
      }
    } catch (error) {
      console.error(error);
      setError("root", { message: error.response.message })
    }
  }

  const changepassword = async (e) => {
    e.preventDefault()
    try {
      let update = await AuthClient.changepassword(passemail)
      if (update) {
        console.log("susses");
        setpasswordtoggle(false)
      }
    } catch (error) {
      console.log("toast show", error);
    }
  }

  return (
    <>
      <div className='w-full min-h-screen max-h-full flex justify-center items-center bg-neutral-900'>
        <div className='w-[35%] h-[80%] flex flex-col justify-around gap-6'>
          <div className='w-full'>
            <h2 className='text-[1.5rem] poppins text-center capitalize'>login to Artiverse</h2>
            <p className='text-[0.8rem] poppins text-center text-neutral-300'>create and share your articles on our platform</p>
          </div>
          <p className=' text-red-400 text-right text-[0.7rem]'>{errors.root && errors.root.message}</p>
          <div>
            <form onSubmit={handleSubmit(controllelog)}>
              <input placeholder='email' type="email" autoComplete='false' spellCheck="false" className='w-full rounded-md mt-4 h-10 px-2 text-[0.9rem] bg-black/50 outline-1 outline-neutral-400/50 outline' {
                ...register("email", { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, required: "email is must" })
              } />
              {errors.email && <p>{errors.email.message}</p>}
              <input placeholder='password' autoComplete='false' type="text" spellCheck="false" className='w-full mt-4  rounded-md h-10 px-2 text-[0.9rem] bg-black/50 outline-1 outline-neutral-400/50 outline'
                {
                ...register("password", { required: "password  is must" })
                }
              />
              {errors.password && <p>{errors.password.message}</p>}
              <button className='w-full mt-8 rounded-md h-8 px-2 text-[1rem] font-medium  bg-[#a7fb1f] text-black outline-1 outline-neutral-400/50 outline' type="submit">{isSubmitting ? "loading" : "login"}</button>
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
            <p className=' capitalize text-[0.8rem]'>don&#039;t have an account? <Link className=' text-lime-200 font-medium' to={"/sign-up"}>sign up</Link></p>
            <button onClick={() => setpasswordtoggle(pre => !pre)} className=' capitalize text-[0.8rem]'>forget password</button>
          </div>
        </div>
      </div>

      <Card lable={"change password"} opener={passwordtoggle} setopener={setpasswordtoggle}>
        <div className="w-full h-full ">
          <form onSubmit={changepassword} className="flex w-full h-full  flex-col items-center justify-center gap-6">
            <div className="flex items-center flex-col w-[50%]">
              <p className=" capitalize text-[0.9rem]">get email to change password</p>
              <input placeholder="your email" type="email" className="px-2  border-2 border-[#a7fb1f] py-1 bg-neutral-900 rounded-md text-[0.9rem] outline-none w-full" value={passemail} onChange={(e) => setpassemail(e.target.value)}
              />
            </div>
            <button type="submit" className="px-2 py-1  text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f]">change password</button>
          </form>
        </div>
      </Card>

    </>
  )
}

export default Login