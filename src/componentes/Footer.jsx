import Logo from './Logo'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className=' border-t-2 border-neutral-400 flex items-end justify-between px-4 py-2'>
            <div>
                <Logo />
                <p className='text-[0.9rem] text-neutral-300'>&#169;  All rights reserved |
                    Privacy Policy . Terms of Use.</p>
            </div>
            <div>
                <Link className='text-neutral-300 hover:text-neutral-200 text-[0.7rem] capitalize' to={"/createchannel"}>become a cretor</Link>
            </div>
        </div>
    )
}

export default Footer