import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const Search = ({bg, color="text-neutral-300"}) => {
  const {params} = useParams()
  const naviget = useNavigate()

  const { handleSubmit, register } = useForm({
    defaultValues:{
      search: params?params.replace(/-/g, " "): ""
    }
  })

  const submit = (data) => {
    let mainparam = data.search.trim().toLowerCase().replace(/\s/g, "-")
    naviget(`/search/${mainparam}`)
  }


  return (
      <div className={`bg-neutral-800 w-full  flex h-[2rem]  items-center px-3 rounded-md ${bg} ${color}`} >
        <span className=" select-none material-symbols-outlined font-semibold text-[0.9rem]">search</span>
      <form onSubmit={handleSubmit(submit)} className='w-full'>
        <input
          {...register("search", { required: true })}
          placeholder='search' maxLength={100} spellCheck="false" type="text" className={`w-full px-1 text-[0.8rem]  bg-transparent rounded-sm font-medium  outline-none placeholder:text-[0.8rem] placeholder:${color} ${color}`} />
      </form>
          </div>
  )
}

export default Search