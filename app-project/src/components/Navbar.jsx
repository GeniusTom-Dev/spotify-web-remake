import { genius_logo } from "../assets"
import {AiFillHome} from 'react-icons/ai'
import {FaPlay} from 'react-icons/fa'
import {IoMapSharp} from 'react-icons/io5'
import {AiFillHeart} from 'react-icons/ai'
import {SlMagnifier} from 'react-icons/sl'

const classIcons = 'text-3xl text-[var(--white)] cursor-pointer'

const addShadow = (e) => {
    e.target.classList.add('icon-shadow')
}

const removeShadow = (e) => {
    e.target.classList.remove('icon-shadow')
}

function Navbar() {
  return (
    <div className='w-20 h-full bg-[var(--navbar)] relative top-0 left-0 rounded-l-3xl flex items-center justify-center'>
        <img src={genius_logo} alt="genius tom logo" className="w-full absolute top-2 left-1/2 -translate-x-1/2"/>

        <ul className="h-1/3 flex flex-col justify-around">
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow}><AiFillHome/></li>
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow}><FaPlay/></li>
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow}><SlMagnifier/></li>
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow}><AiFillHeart/></li>
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow}><IoMapSharp/></li>
        </ul>
    </div>
  )
}

export default Navbar