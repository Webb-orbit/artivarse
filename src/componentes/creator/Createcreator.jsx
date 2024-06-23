import { useState } from 'react'
import Storagebucket from '../../appwriteapi/storage'
import Creatorbase from '../../appwriteapi/creator'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Screenloader from '../Screenloader'

const Createcreator = () => {
    const [coverurl, setcoverurl] = useState("")
    const [logourl, setlogourl] = useState("")
    const [logoforupload, setlogoforupload] = useState("")
    const [coverforupload, setcoverforupload] = useState("")
    const navi = useNavigate()
    const { userdata, emailvariy } = useSelector(state => state.authstore)

    const { handleSubmit, register, watch, formState: { errors, isSubmitting }, setError } = useForm();
    const watchAllFields = watch()

    const uploadcover = (e) => {
        let value = e.target.files[0]
        let cover = URL.createObjectURL(value)
        setcoverurl(cover)
        setcoverforupload(value)
        console.log(value);
    }

    const uploadlogo = (e) => {
        let value = e.target.files[0]
        let cover = URL.createObjectURL(value)
        setlogourl(cover)
        setlogoforupload(value)
        console.log(value);
    }

    const submitcreate = async (data) => {
        console.log("creataaaaaaaaaaaaaa", data);
        try {
            let uploadlogo = await Storagebucket.uploadlogo(logoforupload)
            let uploadcover = await Storagebucket.uploadbanner(coverforupload)
            if (uploadlogo && uploadcover) {
                const create = await Creatorbase.createcreator(data.channalname, uploadlogo.$id, uploadcover.$id, data.channaldes, userdata)
                if (create) {
                    navi("/channal/overview")
                    console.log("created toast");
                }else{
                    await Storagebucket.deletebanner(uploadcover.$id)
                    await Storagebucket.deletelogo(uploadlogo.$id)
                    console.log("deletefiles");
                }
            }
        } catch (error) {
            console.log(error);
            setError("root", {message:error.response.message})
        }
    }


    return (
        <>
         {isSubmitting && <Screenloader send={"createing"} />}
            {!emailvariy && <>
                <div className='w-full h-screen flex flex-col items-center justify-center'>
                    <p>Verify your email first</p>
                    <Link className='text-[#a7fb1f]' to={"/profile"}>Verify email</Link>
                </div>
            </>}

            <div className=' w-[70%] mx-auto py-10'>
            <h2 className="select-none text-[1.5rem] my-6 capitalize poppins"><span className=" font-medium text-[#a7fb1f]">create</span> channal</h2>
                <input type="file" id='coverinput' accept='.png, .jpg' onChange={uploadcover} className='hidden' />
                <input type="file" id='uploadlogo' accept='.png, .jpg' onChange={uploadlogo} className='hidden' />
                <div className='  h-[13rem] relative '>
                    <label htmlFor="coverinput" className=' cursor-pointer bg-black rounded-full absolute bottom-2 right-2'><span className="p-2 material-symbols-outlined">filter_hdr</span></label>
                    {coverurl?(<img src={coverurl} className='w-full h-full object-cover rounded-2xl bg-neutral-800' />):(<div className='w-full h-full object-cover rounded-2xl bg-neutral-900'></div>)}

                    <div className='w-[9rem] h-[9rem] relative group rounded-full left-8 top-[-50%]'>
                        <div className='w-full h-full absolute hidden rounded-full bg-black/50 justify-center items-center group-hover:flex'>
                            <label htmlFor="uploadlogo" className=' cursor-pointer bg-black rounded-full '><span className="p-2 material-symbols-outlined">filter_hdr</span></label>
                        </div>
                        <img src={logourl} className='p-1 bg-white w-full h-full object-cover rounded-full' />
                    </div>
                </div>

                <div className='w-[70%] mx-auto mt-[5rem]'>
                    <div>

                        <div className='flex flex-col gap-5 pb-10'>

                            <fieldset className={`w-full border-2  p-2 rounded-md flex flex-col border-[#a7fb1f] ${errors.channalname && "border-red-500"}`}>
                                <legend className='mx-5 px-2 capitalize text-neutral-200 text-[0.9rem]'>name: <span className='animate-pulse'>{`${errors.channalname ? errors.channalname.message : ""}`}</span></legend>
                                <textarea className=' text-[0.9rem] w-full bg-transparent  scrollbar resize-none border-none outline-none' maxLength={50} spellCheck="false"
                                    {...register("channalname", { required: "Required" })}
                                ></textarea>
                                <p className=' self-end text-[0.6rem] text-neutral-200'>{watchAllFields.channalname?.length}/50</p>
                            </fieldset>

                            <fieldset className={`w-full border-2  p-2 rounded-md flex flex-col border-[#a7fb1f] ${errors.channaldes && "border-red-500"}`}>
                                <legend className='mx-5 px-2 capitalize text-neutral-200 text-[0.9rem]'>channal description: <span className='animate-pulse'>{`${errors.channaldes ? errors.channaldes.message : ""}`}</span></legend>
                                <textarea className=' text-[0.9rem] w-full bg-transparent h-[20rem] scrollbar resize-none border-none outline-none' maxLength={2000} spellCheck="false"
                                    {...register("channaldes", { required: "Required" })}
                                ></textarea>
                                <p className=' self-end text-[0.6rem] text-neutral-200'>{watchAllFields.channaldes?.length}/2000</p>
                            </fieldset>

                        </div>
                    </div>
                    <p className=' capitalize font-medium border-none outline outline-1 outline-neutral-300/50  animate-bounce w-fit text-[0.9rem] bg-neutral-800/50 p-2 rounded-md'>{errors.root?errors.root.message:"all fine"}</p>
                    <button className='px-6 py-1 bg-[#a7fb1f] capitalize text-[1.1rem] text-black font-medium rounded-md' onClick={handleSubmit(submitcreate)}>create channel</button>
                </div>
            </div>
        </>
    )
}

export default Createcreator