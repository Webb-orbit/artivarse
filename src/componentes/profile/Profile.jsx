import { useEffect, useState } from "react"
import AuthClient from "../../appwriteapi/authentic"
import { useDispatch } from "react-redux"
import { storelogout } from "../../store/Authslice"
import { useNavigate } from "react-router-dom"
import Card from "../Card"

export const Profile = () => {
  const [userdata, setuserdata] = useState()
  const [logo, setlogo] = useState("")
  const [emailtoggle, setemailtoggle] = useState(false)
  const [nametoggle, setnametoggle] = useState(false)
  const [passwordtoggle, setpasswordtoggle] = useState(false)
  const [updater, setupdater] = useState(false)

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [newname, setnewname] = useState("")

  const dispach = useDispatch()
  const navig = useNavigate()

  const logoutfun = async () => {
    let log = await AuthClient.appwritelogout()
    if (log) {
      dispach(storelogout())
      navig("/login")
    }
  }

  const varifyemail = async () => {
    try {
      let vary = await AuthClient.createvaryfy()
      if (vary) {
        console.log("toast show");
      }
    } catch (error) {
      console.log("toast show", error);
    }
  }
  const updateemails = async(e)=>{
    e.preventDefault()
    try {
      let update = await AuthClient.updateemail(email, password)
      if (update) {
        console.log("susses");
        setupdater(pre=> !pre)
        setemailtoggle(false)
        setnametoggle(false)
        setpasswordtoggle(false)
      }
    } catch (error) {
      console.log("toast show", error);
    }
  }
  const updatename= async(e)=>{
    e.preventDefault()
    try {
      let update = await AuthClient.updatename(newname)
      if (update) {
        console.log("susses");
        setupdater(pre=> !pre)
        setemailtoggle(false)
        setnametoggle(false)
        setpasswordtoggle(false)
      }
    } catch (error) {
      console.log("toast show", error);
    }
  }

  const changepassword  = async(e)=>{
    e.preventDefault()
    try {
      let update = await AuthClient.changepassword(userdata.email)
      if (update) {
        console.log("susses");
        setupdater(pre=> !pre)
        setemailtoggle(false)
        setnametoggle(false)
        setpasswordtoggle(false)
      }
    } catch (error) {
      console.log("toast show", error);
    }
  }

  useEffect(() => {
    (async () => {
      const user = await AuthClient.getcurrentuser()
      if (user) {
        const avatar = await AuthClient.getavatar(user.name)
        if (avatar) {
          setlogo(avatar.href)
          setuserdata(user)
        }
      }
    })()
  }, [updater])

  return userdata ? (
    <>
      <div className="py-10">
        <div className="w-[80%]">
          <div className="flex justify-between  items-center">
            <h2 className="select-none text-[1.9rem] capitalize poppins"><span className=" font-medium text-[#a7fb1f]">account</span> overview</h2>
            <button onClick={logoutfun} className="px-2 py-1 text-[0.7rem] rounded-md font-medium capitalize bg-red-600">logout</button>
          </div>

          <div className="mt-16 flex items-canter gap-6">
            <img src={logo} className="w-[3rem] rounded-lg self-center" />
            <div>
              <h3 className="text-[2rem] font-medium">{userdata.name}</h3>
              <p className="text-[0.7rem] uppercase font-semibold">user id: {userdata.$id}</p>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex justify-between w-[60%] poppins mt-5">
              <p className="text-[#a7fb1f] capitalize font-medium select-none">name:</p>
              <p>{userdata.name}</p>
            </div>

            <div className="flex justify-between w-[60%] poppins mt-5 relative">
              <p className="text-[#a7fb1f] capitalize font-medium select-none">email:</p>
              <div className="flex items-center gap-1 group">
                <p>{userdata.email}</p>
                <span className={`material-symbols-outlined text-[1rem]  cursor-default ${userdata.emailVerification ? "text-white" : "text-red-400"}`}>{userdata.emailVerification ? "verified_user" : "unknown_5"}</span>
                <span className=" absolute font-semibold hidden group-hover:block bottom-5 right-[-4rem] outline outline-1  bg-black px-2 py-1 rounded-sm text-[0.7rem]">{userdata.emailVerification ? "verified" : "unverified"}</span>
              </div>
            </div>

            <div className="flex justify-between w-[60%] poppins mt-5">
              <p className="text-[#a7fb1f] capitalize font-medium select-none">joined:</p>
              <p>{userdata.registration.substring(0, 10)}</p>
            </div>
          </div>

          <div className=" w-full flex flex-col items-start mt-[5rem] gap-4" >
            <button onClick={()=>setemailtoggle(pre=> !pre)} className="px-2 select-none py-1 text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f] ">change email</button>

            {!userdata.emailVerification && <button onClick={varifyemail} className="px-2 select-none py-1 text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f]">Verify email</button>}

            <button onClick={()=>setpasswordtoggle(pre=> !pre)} className="px-2 py-1 select-none text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f]">change password</button>

            <button onClick={()=>setnametoggle(pre=> !pre)} className="px-2 select-none py-1 text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f]">change name</button>
          </div>

        </div>
      </div>

      <Card lable={"change email"} opener={emailtoggle} setopener={setemailtoggle}>
        <div className="w-full h-full ">
        <form onSubmit={updateemails} className="flex w-full h-full  flex-col items-center justify-center gap-6">
          <input placeholder="newemail" type="text" value={email} spellCheck="false" onChange={(e)=>setemail(e.target.value)} className="px-2 border-2 border-[#a7fb1f] py-1 bg-neutral-800 rounded-md text-[0.9rem] outline-none w-[80%]" />
          <input placeholder="password" type="text" value={password} spellCheck="false" onChange={(e)=>setpassword(e.target.value)} className="px-2 border-2 border-[#a7fb1f] py-1 rounded-md bg-neutral-900 text-[0.9rem] outline-none w-[80%]" />
          <button type="submit" className="px-2 py-1 w-[50%] text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f]">submit</button>
        </form>
        </div>
      </Card>

      <Card lable={"change name"} opener={nametoggle} setopener={setnametoggle}>
      <div className="w-full h-full ">
        <form onSubmit={updatename} className="flex w-full h-full  flex-col items-center justify-center gap-6">
        <input placeholder="your name" type="text"  value={newname} spellCheck="false" onChange={(e)=>setnewname(e.target.value)} className="px-2 border-2 border-[#a7fb1f] py-1 bg-neutral-900 rounded-md text-[0.9rem] outline-none w-[80%]" />
        <button type="submit" className="px-2 py-1 w-[50%] text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f]">submit</button>
        </form>
      </div>
      </Card>

      <Card lable={"change password"} opener={passwordtoggle} setopener={setpasswordtoggle}>
      <div className="w-full h-full ">
        <form onSubmit={changepassword} className="flex w-full h-full  flex-col items-center justify-center gap-6">
          <div className="flex items-center flex-col">
        <p className=" capitalize text-[0.9rem]">get email to change password</p>
          <p className=" font-medium text-[0.7rem]">{userdata.email}</p>
          </div>
        <button type="submit" className="px-2 py-1 w-[50%] text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f]">get email</button>
        </form>
      </div>
      </Card>
    </>
  ) : null
}
