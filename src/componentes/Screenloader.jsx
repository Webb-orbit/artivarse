import { motion } from "framer-motion"
import loadingicon from "../midea/loading.svg"

const Screenloader = ({ send = "Artivarse" }) => {

  return (
    <div className=' z-[1000] fixed select-none w-full h-screen left-0  top-0 bg-black/50 flex justify-center flex-col gap-3 items-center'>
      <motion.img
        initial={{ scale: 1 }}
        animate={{ rotate: 180, scale: 1.3 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
        }}
        className=" animate-pulse"
        src={loadingicon} />
      <p className="poppins-regular text-[0.9rem] font-semibold capitalize">{send}</p>
    </div>
  )
}

export default Screenloader