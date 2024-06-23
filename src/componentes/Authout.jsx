import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Screenloader from './Screenloader'

const Authout = ({ reqauth = true, child }) => {
    const navigate = useNavigate()
    const {status} = useSelector(state => state.authstore)
    const [loading, setloading] = useState(true)
    console.log("status", status);

    useEffect(() => {
        if (reqauth && status !== reqauth) {
            navigate("/login")
        } else if(!reqauth && status !== reqauth){
            navigate("/")
        }
            setloading(false)
    }, [navigate, status, reqauth])

    return loading? (<Screenloader send='establishing...'/>):(<>{child}</>)
}

export default Authout