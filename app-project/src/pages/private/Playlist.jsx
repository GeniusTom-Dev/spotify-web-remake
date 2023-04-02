import { Navbar } from "../../components"
import {RxMagnifyingGlass} from 'react-icons/rx'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaPlay } from "react-icons/fa"

function Playlist() {
  
  const { id } = useParams()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const [playlist, setPlaylist] = useState([])

  const getPlaylistTrack = async (artistId) => {
    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setPlaylist(data.items)
      
    } catch (err) {
      console.error(err);
      
    }
  }

  useEffect(() => {
    getPlaylistTrack()
  }, [])

  const setSearch = () => {
    navigate('/search')
  }

  const playMusic = (e) => {
    const trackId = e.target.parentElement.dataset.id
    navigate(`/play/${trackId}`)
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

          <section className="w-full h-5/6 absolute bottom-0">
            <h1 className="text-3xl mt-8 ml-8">Top playlists</h1>
            <div className="h-[90%] flex flex-col overflow-hidden overflow-y-scroll">
              {playlist.map((item) => (
                <div className="w-full h-20 rounded-3xl mt-4 ml-8 flex items-center relative" key={item.track.id}>
                  <img src={item.track.album.images[0].url} alt="" className="w-16 h-16 rounded-xl"/>
                  <div className="bg-[var(--navbar)] w-16 h-16 absolute rounded-xl opacity-0 hover:opacity-70">
                    <FaPlay className="text-3xl text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer" data-id={item.track.id} onClick={playMusic}/>
                  </div>

                  <h1 className="text-2xl text-white ml-8">{item.track.name}</h1>
                  <h1 className="text-2xl text-white absolute right-[5%]">{item.track.artists[0].name}</h1>
                </div>
              ))}
            </div>
          </section>
        

        
        </div>

      </div>
    </div>
  )
}

export default Playlist