import { Navbar } from "../../components"
import {RxMagnifyingGlass} from 'react-icons/rx'
import {RiPlayList2Fill} from 'react-icons/ri'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function DashBoard() {

  const navigate = useNavigate()
  const [topTrackPlaylist, setTopTrackPlaylist] = useState([])
  const token = sessionStorage.getItem('token')

  const setSearch = () => {
    navigate('/search')
  }

  const getTopTracks = async () => {
    try{
      const { data } = await axios.get("https://api.spotify.com/v1/browse/categories/toplists/playlists", {
          headers: {
              Authorization: `Bearer ${token}`
          },
          params: {
            limit: 10
          }
      })
      setTopTrackPlaylist(data.playlists.items)
    }
    catch(err){
      console.log(err)
        if(err.response.status === 401){
            sessionStorage.removeItem('token')
            navigate('/')
        }
    }
  }

  useEffect(() => {
    getTopTracks()
  }, [])

  const openPlaylist = (e) => {
    const id = e.target.dataset.id ? e.target.dataset.id : e.target.parentElement.parentElement.dataset.id
    navigate(`/playlist/${id}`)
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className='bg-[var(--main)] h-[80vh] w-[80vw] rounded-3xl relative'>
        <Navbar/>
        <div className="w-[calc(100%-5rem)] h-full ml-20 absolute top-0">
          <div className="w-1/5 h-14 bg-[var(--search)] ml-8 mt-4 rounded-3xl relative z-10" onClick={setSearch}>
            <RxMagnifyingGlass className="text-3xl text-[var(--white)] absolute top-1/2 -translate-y-1/2 left-6"/>
            <h1 className="text-xl text-[var(--white)] absolute top-1/2 -translate-y-1/2 left-16">Search here...</h1>            
          </div>
        

        <section className="w-full h-3/6 relative">
            <h1 className="text-3xl mt-8 ml-8">Top playlists</h1>

            <div className="w-full h-3/4 overflow-x-scroll overflow-auto flex items-center">
                {topTrackPlaylist.map((item, index) => 
                    (item && 
                      <div className="glass h-5/6 w-[15%] min-w-[15%] ml-6 flex justify-center relative rounded-2xl overflow-hidden" key={item.name + index}>

                      <div className="bg-[var(--navbar)] w-full h-full opacity-0 hover:opacity-70 z-10 flex flex-col items-center justify-around rounded-2xl">
                          <RiPlayList2Fill className="text-5xl text-[var(--white)] cursor-pointer" data-id={item.id} onClick={openPlaylist}/>
                      </div>

                      {item.images[0] ? 
                          <img src={item.images[0].url} alt="artist icon" className="w-1/2 pb-[66.6%] object-cover rounded-full absolute top-5"/> :
                          <div className="w-1/2 pb-[66.6%] bg-[var(--navbar)] rounded-full absolute top-5 flex items-center justify-center">
                              <FaUser className="text-5xl text-[var(--white)]"/>
                          </div>
                      }
                      <h1 className="absolute w-5/6 bottom-5 text-2xl text-center truncate">{item.name}</h1>
                  </div>
                    )
                )} 

            </div>

        </section>
        </div>

      </div>
    </div>
  )
}

export default DashBoard