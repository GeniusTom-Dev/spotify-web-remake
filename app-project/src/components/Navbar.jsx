import { genius_logo } from "../assets"
import {AiFillHome} from 'react-icons/ai'
import {IoMapSharp} from 'react-icons/io5'
import {AiFillHeart} from 'react-icons/ai'
import {SlMagnifier} from 'react-icons/sl'
import { useNavigate } from "react-router-dom"

const classIcons = 'text-3xl text-[var(--white)] cursor-pointer'  

function Navbar() {

  const navigate = useNavigate()

  const addShadow = (e) => {
    e.target.classList.add('icon-shadow')
  }

  const removeShadow = (e) => {
      e.target.classList.remove('icon-shadow')
  }

  const moove = (e) => {
    const location = e.target.parentElement.dataset.location ? e.target.parentElement.dataset.location : e.target.parentElement.parentElement.dataset.location
    navigate(`/${location}`)
  }

    
  return (
    <div className='w-20 h-full bg-[var(--navbar)] relative top-0 left-0 rounded-l-3xl flex items-center justify-center'>
        <img src={genius_logo} alt="genius tom logo" className="w-full absolute top-2 left-1/2 -translate-x-1/2"/>

        <ul className="h-1/3 flex flex-col justify-around">
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow} data-location="home" onClick={moove}><AiFillHome/></li>
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow} data-location="search" onClick={moove}><SlMagnifier/></li>
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow} data-location="like" onClick={moove}><AiFillHeart/></li>
            <li className={classIcons} onMouseOver={addShadow} onMouseLeave={removeShadow} data-location="map" onClick={moove}><IoMapSharp/></li>
        </ul>
    </div>
  )
}

export default Navbar