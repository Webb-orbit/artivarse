import { useEffect, useState } from 'react'
import Logo from './Logo'
import Search from './Search'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AuthClient from '../appwriteapi/authentic'
import Creatorbase from '../appwriteapi/creator'

const Navbar = () => {
    const { status } = useSelector(state => state.authstore)
    const [toggle, settoggle] = useState(false)
    const [creatorhas, setcreatorhas] = useState(false)
    const [logo, setlogo] = useState()
    const [userdata, setuserdata] = useState({})

    const initfun = async () => {
        const user = await AuthClient.getcurrentuser()
        if (user) {
            setuserdata(user)
            const avatar = await AuthClient.getavatar(user.name)
            const iscreator = await Creatorbase.getcreatorbyuserid(user.$id)
            if (avatar && iscreator) {
                let cretorhave = (iscreator.total > 0)
                setlogo(avatar.href)
                setcreatorhas(cretorhave)
            }
        }
    }

    useEffect(() => {
        initfun()
    }, [])

    const navlinks = [
        {
            name: "create new",
            url: "/channal/create-artical",
            active: status,
            type: "button"
        },
        {
            name: "sign up",
            url: "/sign-up",
            active: !status,
            type: "button"
        },
    ]


    return (
        <div className='poppins relative bg-black py-2 flex h-16 items-center justify-between px-3 text-neutral-50'>
            <Logo />
            <div className='w-[30%]'>
                <Search />
            </div>
            <div className='flex w-fit justify-end items-center'>
                <div className=' w-full flex items-center justify-end gap-2'>
                    {navlinks.map((e) => (
                        e.active ? (
                            e.type == "button" ? (
                                <Link key={e.url} to={e.url} >
                                    <button className=' text-[0.8rem] font-medium border-[1px] border-neutral-500  px-3 py-1 rounded-md '>
                                        {e.name}
                                    </button>
                                </Link>
                            ) : (
                                <Link key={e.url} to={e.url}>
                                    <p className='text-[0.8rem]'>
                                        {e.name}
                                    </p>
                                </Link>
                            )
                        ) : null
                    ))}
                    {status ? (
                        <button onClick={() => settoggle(pre => !pre)}>
                            <img src={logo} className='w-[1.8rem] rounded-md' />
                        </button>
                    ) : (null)}
                </div>
            </div>

            <div className={` z-[999] absolute top-[4rem] p-4 flex-col items-center  right-2 w-[20%] h-[20rem] bg-neutral-950 outline outline-1 outline-neutral-400/70 rounded-md ${toggle ? "flex" : "hidden"}`}>
                <p className=' font-medium'>{userdata.email}</p>
                <div className='w-full h-full py-2'>
                    <Link to={"/profile"} >
                        <p className=' w-full p-2 text-[0.8rem] capitalize rounded-md font-medium text-neutral-400 hover:bg-neutral-600/50 hover:text-neutral-200'>account settings</p>
                    </Link>
                    <Link to={"/Subscriptions"} >
                        <p className=' w-full p-2 text-[0.8rem] capitalize rounded-md font-medium text-neutral-400 hover:bg-neutral-600/50 hover:text-neutral-200'>Subscriptions</p>
                    </Link>
                    {creatorhas ? (<Link to={"/channal/overview"} >
                        <p className=' w-full p-2 text-[0.8rem] capitalize rounded-md font-medium text-neutral-400 hover:bg-neutral-600/50 hover:text-neutral-200'>view your channel</p>
                    </Link>) : (<Link to={"/createchannel"} >
                        <p className=' w-full p-2 text-[0.8rem] capitalize rounded-md font-medium text-neutral-400 hover:bg-neutral-600/50 hover:text-neutral-200'>create channel</p>
                    </Link>)
                    }
                </div>
            </div>

        </div>
    )
}

export default Navbar