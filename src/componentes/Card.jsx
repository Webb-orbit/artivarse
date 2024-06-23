
const Card = ({lable, opener=false, children, setopener, classes}) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-screen backdrop-blur-sm  bg-neutral-500/40 justify-center items-center z-50 ${opener?"flex":"hidden"}`}>
         <div className={`w-[50%] bg-neutral-950 p-4 h-[50vh] rounded-md flex flex-col gap-2 ${classes}`}>
            <div className='flex justify-between items-start'>
                <p className=' w-[90%] font-medium capitalize poppins'>{lable}</p>
                <button onClick={()=> setopener(false)} className="material-symbols-outlined">close</button>
            </div>

            <div className='w-[95%] h-full overflow-y-scroll scrollbar self-center'>
                {children}
            </div>

        </div>
    </div>
  )
}

export default Card