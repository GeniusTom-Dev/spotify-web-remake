import { Navbar } from "../../components"
import {RxMagnifyingGlass} from 'react-icons/rx'
import { useNavigate } from "react-router-dom"

function DashBoard() {

  const navigate = useNavigate()

  const setSearch = () => {
    navigate('/search')
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className='bg-[var(--main)] h-[80vh] w-[80vw] rounded-3xl relative'>
        <Navbar/>
        <div className="w-[calc(100%-5rem)] h-full ml-20 absolute top-0">
          <div className="w-1/5 h-14 bg-[var(--search)] ml-8 mt-4 rounded-3xl relative" onClick={setSearch}>
            <RxMagnifyingGlass className="text-3xl text-[var(--white)] absolute top-1/2 -translate-y-1/2 left-6"/>
            <h1 className="text-xl text-[var(--white)] absolute top-1/2 -translate-y-1/2 left-16">Search here...</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard