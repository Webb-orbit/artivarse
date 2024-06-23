import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Card from './Card'
import AuthClient from '../appwriteapi/authentic'

export const Changepassword = () => {
    const [newpassword, setnewpassword] = useState("")
    const [repet, setrepet] = useState("")
    const [param] = useSearchParams()
    const userid = param.get("userId")
    const secret = param.get("secret")
    const naveget= useNavigate()
    const neve = ()=>{naveget("/")}

    const changepassword = async(e)=>{
        e.preventDefault()
        if (newpassword !== repet) return
        if (newpassword == repet) {
            const change = await AuthClient.updatepassword(userid, secret, newpassword, repet)
            if (change) {
                console.log(change);
                naveget("/profile")
            }
        }
    }

  return (
    <div>
        <Card opener={true} setopener={neve}>
        <div className="w-full h-full ">
        <form onSubmit={changepassword} className="flex w-full h-full  flex-col items-center justify-center gap-6">
          <div>
          <input placeholder="your newpassword" type="text"  value={newpassword} spellCheck="false" onChange={(e)=>setnewpassword(e.target.value)} className=" px-2 py-1 bg-neutral-900 rounded-md text-[0.9rem] outline-none w-[80%]" />
          <input placeholder="repeat password" type="text"  value={repet} spellCheck="false" onChange={(e)=>setrepet(e.target.value)} className="px-2 py-1 bg-neutral-900 rounded-md text-[0.9rem] outline-none w-[80%]" />
          </div>
        <button type="submit" className="px-2 py-1 w-[50%] text-[0.8rem] rounded-md font-medium capitalize text-black bg-[#a7fb1f]">get email</button>
        </form>
      </div>
        </Card>
    </div>
  )
}
