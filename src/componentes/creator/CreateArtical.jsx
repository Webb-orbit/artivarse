import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Storagebucket from '../../appwriteapi/storage'
import Blogbase from '../../appwriteapi/blogdatabase'
import { useSelector } from 'react-redux'
import Screenloader from '../Screenloader'
import { useNavigate } from 'react-router-dom'

const CreateArtical = ({ edit = null }) => {
    const [coverurl, setcoverurl] = useState("");
    const [coverforupload, setcoverforupload] = useState("");
    const [tags, settags] = useState([]);
    const [tag, settag] = useState("");
    const [selectcatagory, setselectcatagory] = useState("");

    const navi = useNavigate()
    const { creatorid } = useSelector(state => state.creatorstore)
    const { handleSubmit, register, watch, formState: { errors, isSubmitting }, setError } = useForm({
        defaultValues: {
            blogtitle: edit?.blogtitle || "",
            bshortdes: edit?.bshortdes || "",
            content: edit?.comtent || ""
        }
    });
    const watchAllFields = watch();



    const ifedit = async () => {
        try {
            let precover = await Storagebucket.coverforpreview(edit.coverimg)
            setcoverurl(precover.href)
            settags(edit.btags)
            setselectcatagory(edit.category)
        } catch (error) {
            console.log(error);
        }
    }

    const uploadcover = (e) => {
        let value = e.target.files[0]
        let cover = URL.createObjectURL(value)
        setcoverurl(cover)
        setcoverforupload(value)
        console.log(value, coverforupload);
    }

    const createblog = async (data) => {
        try {
            if (edit) {
                const upload = coverforupload ? await Storagebucket.uploadbcover(coverforupload) : null
                if (upload) {
                    await Storagebucket.deletebcover(edit.coverimg)
                }

                let updatecover = upload ? upload.$id : edit.coverimg
                const update = await Blogbase.updateblog(edit.$id, { ...data, category: selectcatagory, btags: tags, coverimg: updatecover })
                if (update) {
                    navi("/channal/overview")
                    console.log("artical updated");
                }

            } else {
                if (selectcatagory && tags.length > 1 && coverforupload) {
                    const uploadfile = await Storagebucket.uploadbcover(coverforupload)
                    if (uploadfile) {
                        const upartical = await Blogbase.createblog(data.blogtitle, data.bshortdes, 0, 0, data.content, selectcatagory, tags, creatorid, uploadfile.$id)
                        if (upartical) {
                            navi("/channal/overview")
                            console.log("susses naviget to list");
                        } else {
                            await Storagebucket.deletebcover(uploadfile.$id)
                        }
                    }
                } else {
                    setError("root", { message: "Please fill in all required details before submitting the form." })
                }
            }
        } catch (error) {
            setError("root", { message: error.response.message })
            console.log("toast", error);
        }
    }

    const Categorylist = [
        {
            name: "Technology",
        },
        {
            name: "Health",
        },
        {
            name: "Lifestyle",
        },
        {
            name: "Business",
        },
        {
            name: "Entertainment",
        },
        {
            name: "Science",
        },
        {
            name: "News",
        },
        {
            name: "Travel",
        },
        {
            name: "Education",
        },
        {
            name: "Opinion",
        },
        {
            name: "Sports",
        },
        {
            name: "Food & Drink",
        },
        {
            name: "Fashion & Beauty",
        },
    ]

    const addtag = () => {
        if (tag !== "") {
            if (tags.toString().length <= 250) {
                settags(pre => [...pre, tag])
                settag("")
            }
        }
    }

    const removetag = (targetedtag) => {
        console.log(targetedtag);
        let newtags = tags.filter((e) => e !== targetedtag)
        settags(newtags)
        console.log(newtags);
    }

    useEffect(() => {
        if (edit) {
            ifedit()
        }
    }, [])
    return (
        <>
            {isSubmitting && <Screenloader send={"uploading"} />}
            <div className='w-[60%] mx-auto py-10 poppins'>
                <h1 className=' capitalize text-[2.3rem]'>artical details</h1>
                <form onSubmit={handleSubmit(createblog)} className=" my-10 flex flex-col gap-10 items-start">

                    <fieldset className={`w-full border-2  p-2 rounded-md flex flex-col border-[#a7fb1f] ${errors.blogtitle && "border-red-500"}`}>
                        <legend className='mx-5 px-2 capitalize text-neutral-200 text-[0.9rem]'>title: <span className='animate-pulse'>{`${errors.blogtitle ? errors.blogtitle.message : ""}`}</span></legend>
                        <textarea className=' text-[0.9rem] w-full bg-transparent  scrollbar resize-none border-none outline-none' maxLength={100} spellCheck="false"
                            {...register("blogtitle", { required: "Required" })}
                        ></textarea>
                        <p className=' self-end text-[0.6rem] text-neutral-200'>{watchAllFields.blogtitle?.length}/100</p>
                    </fieldset>

                    <fieldset className={`w-full border-2  p-2 rounded-md flex flex-col border-[#a7fb1f] ${errors.bshortdes && "border-red-500"}`}>
                        <legend className='mx-5 px-2 capitalize text-neutral-200 text-[0.9rem]'>short decription: <span className='animate-pulse'>{`${errors.bshortdes ? errors.bshortdes.message : ""}`}</span></legend>
                        <textarea className=' text-[0.9rem] h-[5rem] w-full bg-transparent  scrollbar resize-none border-none outline-none' maxLength={200} spellCheck="false"
                            {...register("bshortdes", { required: "Required" })}
                        ></textarea>
                        <p className=' self-end text-[0.6rem] text-neutral-200'>{watchAllFields.bshortdes?.length}/200</p>
                    </fieldset>

                    <div>
                        <p className=' capitalize py-1 font-medium text-[0.9rem]'>Thumbnail/Cover</p>
                        <p className=' capitalize py-1 text-neutral-400 text-[0.7rem] w-[90%]'>Choose or upload an image that represents your video's content. An eye-catching thumbnail can attract and engage viewers effectively.</p>
                        <input type="file" id="cover" className='hidden' onChange={uploadcover} accept='.jpg, .png' />
                        <div className="w-[16rem] h-[9rem] bg-neutral-950 overflow-hidden rounded-sm">
                            <label htmlFor='cover' className='cursor-pointer'>
                                {coverurl ? (<img src={coverurl} className=' object-cover w-full h-full' />) : (<div className=' flex items-center justify-center w-full h-full'><span className="material-symbols-outlined">landscape</span></div>)}
                            </label>
                        </div>
                    </div>

                    <fieldset className={`w-full border-2  p-2 rounded-md flex flex-col border-[#a7fb1f] ${errors.content && "border-red-500"}`}>
                        <legend className='mx-5 px-2 capitalize text-neutral-200 text-[0.9rem]'>main content: <span className='animate-pulse'>{`${errors.content ? errors.content.message : ""}`}</span></legend>
                        <textarea placeholder='The Beginning: The Big Bang The prevailing scientific theory about the origin of the universe is the Big Bang theory. According to this model, approximately 13.8 billion years ago, the universe began from an incredibly hot, dense state. This singularity exploded, leading to a rapid expansion that continues to this day. In the first few seconds after the Big Bang, the universe was a hot soup of particles, but as it expanded, it cooled, allowing quarks and electrons to form. These particles eventually combined to form protons and neutrons, leading to the creation of simple atoms like hydrogen and helium....' className=' text-[0.9rem] h-[30rem] w-full bg-transparent  scrollbar resize-none border-none outline-none' maxLength={50000} spellCheck="false"
                            {...register("content", { required: "Required", minLength: { value: 200, message: "Content must be at least 200 characters." } })}
                        ></textarea>
                        <p className=' self-end text-[0.6rem] text-neutral-200'>{watchAllFields.content?.length}/50000</p>
                    </fieldset>

                    <div>
                        <div className='py-4'>
                            <p className=' capitalize  font-medium text-[0.9rem]'>Category</p>
                            <p className=' capitalize py-1 text-neutral-400 text-[0.7rem] w-[90%]'>Assign your article to a relevant category to help viewers find it more easily.</p>
                        </div>
                        <div className='flex gap-2 items-center w-full flex-wrap'>
                            {Categorylist.map((e) => (
                                <button key={e.name} type='button' onClick={() => setselectcatagory(e.name)} className={`px-3 py-1 rounded-md lowercase font-semibold text-[0.8rem] border-2  ${e.name == selectcatagory && "bg-[#a7fb1f] text-black border-transparent"}`}>
                                    {e.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className='py-4'>
                            <p className=' capitalize  font-medium text-[0.9rem]'>tags</p>
                            <p className=' capitalize py-1 text-neutral-400 text-[0.7rem] w-[90%]'>Tags are descriptive keywords that you can add to your article to help readers find your content. <sub>min: 2 tags</sub></p>
                        </div>
                        <p className='text-[0.6rem]'>{`${tags.toString().length}/250`}</p>
                        <div className='flex items-center gap-3 mt-2'>
                            <textarea type="text" onSubmit={addtag} maxLength={50} value={tag} onChange={(e) => settag(e.target.value)} className=' w-[50%]  rounded-md  scrollbar min-h-7 resize-none p-2 text-[0.9rem] bg-black/50 outline-1 outline-neutral-400/50 outline' ></textarea>
                            <button onClick={addtag} type="button" className='px-3 py-1 rounded-md lowercase bg-[#a7fb1f] text-black  font-semibold text-[0.8rem] '>add</button>
                        </div>
                        <div className='flex gap-2 items-center w-full flex-wrap py-4 '>
                            {tags.map((e, id) => (
                                <button onClick={() => removetag(e)} type="button" key={id} className=' cursor-pointer text-[0.9rem] py-1 px-2 rounded-md select-none bg-neutral-700/50'>{e}</button>
                            ))}
                        </div>
                    </div>
                    <p className=' capitalize font-medium border-none outline outline-1 outline-neutral-300/50  animate-bounce w-fit text-[0.9rem] bg-neutral-800/50 p-2 rounded-md'>{errors.root ? errors.root.message : "all fine"}</p>

                    <button type="submit" className='px-3 w-full py-1 rounded-md lowercase bg-[#a7fb1f] text-black  font-semibold text-[0.8rem] '>{edit ? "update" : "upload"}</button>
                </form>
            </div>
        </>
    )
}

export default CreateArtical
