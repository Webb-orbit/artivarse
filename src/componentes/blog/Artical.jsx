import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Blogbase from '../../appwriteapi/blogdatabase'
import Storagebucket from '../../appwriteapi/storage'
import Creatorbase from '../../appwriteapi/creator'
import Readerbase from '../../appwriteapi/reader'
import { useSelector } from 'react-redux'

const Artical = () => {
    const { articalid } = useParams()
    const [artical, setartical] = useState({})
    const [followers, setfollowers] = useState([])
    const [coverurl, setcoverurl] = useState("")
    const [logourl, setlogourl] = useState("")
    const [subscribed, setsubscribed] = useState(false)
    const [creatordata, setcreatordata] = useState({})
    const { userdata, readerid, status } = useSelector(state => state.authstore)


    const getartical = async () => {
        try {
            console.log("art");
            const data = await Blogbase.getoneblog(articalid)
            const cover = await Storagebucket.bcoverforview(data.coverimg)
            const creatordetail = await Creatorbase.getonecreator(data.creatorid)
            const logo = await Storagebucket.logoforpreview(creatordetail.creatorlogo)
            console.log("stoper");
            setlogourl(logo.href)
            setartical(data)
            setcreatordata(creatordetail)
            setcoverurl(cover.href)
            updates(data.$id, data.view)
            return creatordetail.$id
        } catch (error) {
            console.log(error);
        }
    }

    const initsubscription = async(id)=>{
        console.log("init");
        let allfolleows = (await Readerbase.getreaderbyuserid(userdata)).documents[0].following
        const isfo = allfolleows.includes(id)
        console.log("incude", isfo);
        setsubscribed(isfo)
        setfollowers(allfolleows)
    }

    const subscribtion = async () => {
        if (!status) return
        if (!subscribed) {
            const addnew = [...followers, creatordata.$id]
            const addfollowers = Number(eval(creatordata.followers + 1))
            try {
                setsubscribed(true)
                let sub = await Readerbase.updatereader(readerid, { following: addnew })
                if (sub) {
                    setsubscribed(true)
                    await Creatorbase.updatecreator(creatordata.$id, { followers: addfollowers })
                }
            } catch (error) {
                setsubscribed(false)
                console.log(error);
            }
        }else{
            console.log("unsubsc");
            const removesub = followers.filter((e)=> e !== creatordata.$id)
            const currentfollowers = Number(eval(creatordata.followers - 1))
            try {
                setsubscribed(false)
                let sub = await Readerbase.updatereader(readerid, { following: removesub })
                if (sub) {
                    setsubscribed(false)
                    await Creatorbase.updatecreator(creatordata.$id, { followers: currentfollowers })
                }
            } catch (error) {
                setsubscribed(true)
                console.log(error);
            }
        }
    }


    const updates = (id, preview) => {
        let timeout = setTimeout(async () => {
            console.log("run");
            const oneplus = Number(eval(preview + 1))
            let yes = await Blogbase.updateblog(id, { view: oneplus })
            if (yes) {
                clearTimeout(timeout)
            }
        }, 5000);
    }

    useEffect(() => {
        (async()=>{
          let id = await  getartical()
            if (status) {
                initsubscription(id)
            }
        })()
    }, [articalid])

    return coverurl ? (
        <>

            <div className='w-[70%]  my-5 mx-auto  relative flex justify-center select-none'>
                <div className='w-full  h-[55vh] overflow-hidden rounded-md'>
                    <img src={coverurl} className=' w-full h-full object-cover object-center' />
                </div>
                <div className=' absolute top-[35vh]   w-[85%]  backdrop-blur-sm h-full border-b-[1px] border-neutral-100/50  bg-[#020304]/80  p-3 flex flex-col items-center justify-around'>
                    <div className='flex flex-col items-center gap-2'>
                        <h1 className=' text-[1.5rem] gugi'>{artical.blogtitle}</h1>
                        <p className=' text-justify w-[85%] text-[0.9rem] text-neutral-300 poppins'>{artical.bshortdes}</p>
                    </div>

                    <div className='w-[95%] flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <Link to={`/creator/${creatordata.$id}`}>
                            <img src={logourl} className=' w-[5rem] h-[5rem] bg-white p-[2.5px] rounded-full object-cover object-center' />
                            </Link>
                            <div>
                                <p className=' font-medium text-[1.1rem]'>{creatordata.creatorname}</p>
                                <p className=' text-[0.9rem] font-medium self-start text-neutral-300  '>{`${creatordata.followers} subscribers`}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={subscribtion} className=' px-5 py-1 bg-white text-black rounded-2xl font-medium text-[0.9rem]'>
                                {subscribed ? "subscribed" : "subscribe"}
                            </button>
                        </div>
                    </div>
                    <div className='w-[95%] flex gap-4'> 
                        <p className=' text-[0.7rem] font-medium self-start text-neutral-300  '>{`${artical.view} views`}</p>
                        <p className=' text-[0.7rem] font-medium self-start text-neutral-300  '>{artical.$createdAt.substring(0, 10)}</p>
                    </div>
                </div>
            </div>

            <div className='w-[60%] pt-72 pb-20 mx-auto'>
                <pre className='roboto text-[1.1rem]  text-neutral-300 tracking-tighter leading-[1.8rem]  whitespace-break-spaces'>{artical.comtent}</pre>
            </div>

        </>
    ) : null
}

export default Artical