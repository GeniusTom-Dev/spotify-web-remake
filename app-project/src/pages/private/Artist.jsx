import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navbar } from '../../components'
import {RxMagnifyingGlass} from 'react-icons/rx'
import {FaPlay} from 'react-icons/fa'



function Artist() {

  const { id } = useParams()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const [artist, setArtist] = useState()
  const [topTracks, setTopTracks] = useState()

  const getArtist = async (artistId) => {
    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setArtist(data)

    } catch (err) {
      console.error(err);
      
    }

    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=FR`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTopTracks(data.tracks)
    } catch (err) {
      console.error(err);
      
    }
  }

  const setSearch = () => {
    navigate('/search')
  }

  useEffect(() => {
    getArtist(id)
  }, [])

  return (
    <div>
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className='bg-[var(--main)] h-[80vh] w-[80vw] rounded-3xl relative'>
                <Navbar/>
                <div className="w-[calc(100%-5rem)] h-full ml-20 absolute top-0">
                    <div className="w-1/5 h-14 bg-[var(--search)] ml-8 mt-4 rounded-3xl relative z-10" onClick={setSearch}>
                        <RxMagnifyingGlass className="text-3xl text-[var(--white)] absolute top-1/2 -translate-y-1/2 left-6"/>
                        <h1 className="text-xl text-[var(--white)] absolute top-1/2 -translate-y-1/2 left-16">Search here...</h1>            
                    </div>
                
                    <section className='w-full h-5/6 absolute bottom-0 rounded-br-3xl'>
                      { artist &&
                        <div className='flex flex-col'>
                          <div className='flex items-center'>
                            <img src={artist.images[0].url} alt="artiste image" className='w-1/6 ml-8 mt-8'/>
                            <div className='flex flex-col'>
                              <h1 className='text-4xl text-[var(--white)] ml-8 mt-4'>{artist.name}</h1>
                              <h1 className='text-l text-[var(--white)] ml-8 mt-4'>{artist.followers.total} Follow</h1>
                            </div>
                          </div>

                          <div className='h-[28rem] mt-24 overflow-y-scroll overflow-x-hidden'>
                          {topTracks && topTracks.map((tTrack, index) => 
                            
                              <div className="w-full flex items-center relative mb-2 ml-8 " key={index}>
                                <div className="absolute w-[6rem] h-full bg-[var(--navbar)] opacity-0 hover:opacity-70 flex justify-center items-center">
                                  <FaPlay className="text-2xl text-white cursor-pointer" onClick={() => {
                                    navigate(`/play/${tTrack.id}`)
                                    window.location.reload()
                                  }}/>
                                </div>
                                <img src={tTrack.album.images[0].url} alt="jacket" className="w-[6rem] "/>
                                <h1 className="text-xl ml-4">{tTrack.name}</h1>
                              </div>
                            
                          )
                        }
                          </div>
                        </div>
                      }
                    </section>
                        
                </div>
            </div>
        </div>
    </div>
  )
}

export default Artist