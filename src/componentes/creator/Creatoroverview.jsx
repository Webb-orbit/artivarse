import { useMemo, useState } from 'react'
import Creatorbase from '../../appwriteapi/creator'
import Storagebucket from '../../appwriteapi/storage'
import Card from '../Card'
import { useSelector } from 'react-redux'

export const Creatoroverview = () => {
    const {userdata} = useSelector(state=> state.authstore)
    const [logo, setlogo] = useState("")
    const [banner, setbanner] = useState("")
    const [channalinfo, setchannalinfo] = useState("")
    const [edit, setedit] = useState(false)
    const [updateer, setupdateer] = useState(false)

    const [name, setname] = useState("")
    const [des, setdes] = useState("")

    const [coverloading, setcoverloading] = useState(false)
    const [logoloading, setlogoloading] = useState(false)

    const initfun = async () => {
        const channal = (await Creatorbase.getcreatorbyuserid(userdata)).documents[0]
        const bannerurl = await Storagebucket.bannerforview(channal.creatorcover)
        const logourl = await Storagebucket.logoforview(channal.creatorlogo)

        setbanner(bannerurl.href)
        setlogo(logourl.href)
        setchannalinfo(channal)
        setname(channal.creatorname)
        setdes(channal.creatordes)

        console.log(channal, logourl);
    }


    const updatechannal = async () => {
        try {
            const update = await Creatorbase.updatecreator(channalinfo.$id, { creatorname: name, creatordes: des })
            console.log("updatetion", update);
            setedit(false)
            setupdateer(pre => !pre)
        } catch (error) {
            console.log("trasrt error");
        }
    }

    const updatecover = async (e) => {
        let value = e.target.files[0]
        setcoverloading(true)
        try {
            let uploadnew = await Storagebucket.uploadbanner(value)
            if (uploadnew) {
                await Storagebucket.deletebanner(channalinfo.creatorcover)
                await Creatorbase.updatecreator(channalinfo.$id, { creatorcover: uploadnew.$id })
                setcoverloading(false)
                setupdateer(pre => !pre)
            } else {
                throw new Error("maximum upload file size limit of 3MB")
            }
        } catch (error) {
            setcoverloading(false)
            console.log(error)
        }
    }

    const updatelogo = async (e) => {
        let value = e.target.files[0]
        setlogoloading(true)
        try {
            let uploadnew = await Storagebucket.uploadlogo(value)
            if (uploadnew) {
                await Storagebucket.deletelogo(channalinfo.creatorlogo)
                await Creatorbase.updatecreator(channalinfo.$id, { creatorlogo: uploadnew.$id })
                setlogoloading(false)
                setupdateer(pre => !pre)
            } else {
                throw new Error("maximum upload file size limit of 1MB")
            }
        } catch (error) {
            setlogoloading(false)
            console.log(error)
        }
    }

    useMemo(() => {
        initfun()
    }, [updateer])

    return channalinfo ? (
        <>
            <Card lable={"edit channal info"} opener={edit} setopener={setedit} classes={"w-[70%] h-[30rem]"}>
                <div className='flex flex-col gap-5 w-[80%] mx-auto p-4 h-full justify-around'>
                    <div className='border-2 border-[#a7fb1f] rounded-sm  p-2'>
                        <div className='flex items-center'>
                            <p className=' text-neutral-400 text-[0.8rem]'>channel name</p>
                            <span className="text-neutral-400 text-[0.9rem] material-symbols-outlined">stop</span>
                        </div>
                        <div className='flex flex-col'>
                            <input type="text" value={name} onChange={(e) => setname(e.target.value)} maxLength={50} className='w-full bg-transparent border-none outline-none' />
                            <p className='text-[0.7rem] self-end'>{`${name.length}/50`}</p>
                        </div>
                    </div>

                    <div className='border-2 border-[#a7fb1f] rounded-sm   p-2'>
                        <div className='flex items-center'>
                            <p className=' text-neutral-400 text-[0.8rem]'>channel description</p>
                            <span className="text-neutral-400 text-[0.9rem] material-symbols-outlined">stop</span>
                        </div>
                        <div className='flex flex-col'>
                            <textarea spellCheck="false" value={des} onChange={(e) => setdes(e.target.value)} className='w-full h-[10rem] scrollbar resize-none bg-transparent border-none outline-none' id="des" maxLength={2000}></textarea>
                            <p className='text-[0.7rem] self-end'>{`${des.length}/2000`}</p>
                        </div>
                    </div>
                    <button onClick={updatechannal} className='px-3 py-1 bg-[#a7fb1f] text-black capitalize font-semibold text-[0.8rem] rounded-sm'>update</button>
                </div>
            </Card>

            <div>
                <input type="file" accept='.png, .jpg' onChange={updatecover} id="coverlable" className='hidden' />
                <input type="file" accept='.png, .jpg' onChange={updatelogo} id="logolable" className='hidden' />
                <div className='w-full h-[13rem] bg-neutral-900 rounded-2xl relative overflow-hidden'>
                    <label htmlFor="coverlable" className=' absolute bottom-2 right-2 cursor-pointer bg-black rounded-2xl '><span className={`p-2 material-symbols-outlined ${coverloading ? "animate-spin" : null}`}>{coverloading ? "downloading" : "filter_hdr"}</span></label>
                    <img src={banner} className=' object-cover w-full h-[13rem]' />
                </div>
                <div className=' p-4 flex gap-10  w-full items-center '>
                    <div className=' w-[9rem] relative group rounded-full '>
                        <div className='w-full h-full absolute hidden rounded-full bg-black/50 justify-center items-center group-hover:flex'>
                            <label htmlFor="logolable" className=' absolute cursor-pointer bg-black rounded-2xl '><span className={`p-2 material-symbols-outlined ${logoloading ? "animate-spin group-flex" : null}`}>{logoloading ? "downloading" : "filter_hdr"}</span></label>
                        </div>
                        <img src={logo} className='p-1 bg-white w-full object-cover rounded-full ' />
                    </div>
                    <div className=' w-[100%] gap-1 overflow-hidden flex flex-col justify-between'>
                        <h1 className='poppins font-semibold text-[3rem]'>{channalinfo.creatorname}</h1>
                        <div className='flex gap-3 text-[0.8rem] text-neutral-300 select-none'>
                            <p>1M+ flowlles</p>
                            <p>1k articals</p>
                        </div>
                        <div className=' w-[90%] overflow-hidden'>
                            <p className=' text-nowrap'>{channalinfo.creatordes}</p>
                        </div>
                        <button onClick={() => setedit(pre => !pre)} className='px-3 py-1 bg-[#a7fb1f] text-black capitalize font-semibold text-[0.8rem] rounded-sm w-fit'>edit info <span className='material-symbols-outlined text-[0.9rem]'>edit</span></button>
                    </div>
                </div>
            </div>
        </>
    ) : null
}
