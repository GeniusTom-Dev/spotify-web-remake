import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Navbar } from '../../components'
import axios from 'axios'
import {RxMagnifyingGlass} from 'react-icons/rx'
import {AiFillHeart} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa'
import {FaPlay} from 'react-icons/fa'


function Like() {

    const token = sessionStorage.getItem('token')
    const [artistList, setArtistList] = useState([])
    const [trackList, setTrackList] = useState([])
    const [likeMusics, setLikeMusics] = useState([])
    const [likeArtists, setLikeArtists] = useState([])
    const navigate = useNavigate()

    const setSearch = () => {
        navigate('/search')
    }

    const getTrack = async (tracksIdList) => {
        let tracks = []
        tracksIdList.map(async (id, index) => {
            
            try {
                const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                tracks.push(data)
                if(index == tracksIdList.length - 1){
                    setTrackList(tracks)
                }
                
              } catch (err) {
                console.error(err);
              }
        })

        
    }

    const getArtist = async (artistsIdList) => {
        let artists = []
        artistsIdList.map(async (id, index) => {

            try {
                const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                      }
                    });
                    artists.push(data)
                    if(index == artistsIdList.length - 1){
                        setArtistList(artists)
                    }

                } catch (err) {
                    console.error(err);
                }
        })
    }


    const getLike = async () => {
        const likedMusic = JSON.parse(localStorage.getItem('likedMusic'))
        const likedArtist = JSON.parse(localStorage.getItem('likedArtist'))
        getTrack(localStorage.getItem('likedMusic') ? JSON.parse(localStorage.getItem('likedMusic')) : [])
        getArtist(localStorage.getItem('likedArtist') ? JSON.parse(localStorage.getItem('likedArtist')) : [])
        setLikeMusics(likedMusic)
        setLikeArtists(likedArtist)
      }

    const likeMusic = (e) => {
        const likedMusic = JSON.parse(localStorage.getItem('likedMusic'))
        const trackId = e.target.parentElement.dataset.id
        if(likedMusic){
            const isLiked = likedMusic.find(music => music === trackId)
            if(isLiked){
            const newLikedMusic = likedMusic.filter(music => music !== trackId)
            localStorage.setItem('likedMusic', JSON.stringify(newLikedMusic))
            }else{
            const newLikedMusic = [...likedMusic, trackId]
            localStorage.setItem('likedMusic', JSON.stringify(newLikedMusic))
            }
        }else{
            localStorage.setItem('likedMusic', JSON.stringify([trackId]))
        }
        getLike()
    }

    const likeArtist = (e) => {
        const likedArtist = JSON.parse(localStorage.getItem('likedArtist'))
        const artistId = e.target.parentElement.dataset.id
        if(likedArtist){
            const isLiked = likedArtist.find(artist => artist === artistId)
            if(isLiked){
                const newLikedArtist = likedArtist.filter(artist => artist !== artistId)
                localStorage.setItem('likedArtist', JSON.stringify(newLikedArtist))
            }else{
                const newLikedArtist = [...likedArtist, artistId]
                localStorage.setItem('likedArtist', JSON.stringify(newLikedArtist))
            }
        }else{
            localStorage.setItem('likedArtist', JSON.stringify([artistId]))
        }
        getLike()       
    }

    const playMusic = (e) => {
        const trackId = e.target.parentElement.dataset.trackId
        navigate(`/play/${trackId}`)
    }

    const showArtist = (e) => {
        const artistId = e.target.parentElement.dataset.artistId
        navigate(`/artist/${artistId}`)
    }
        

    useEffect(() => {
        getLike()
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
                
                    <section className="w-full h-2/5 relative">
                        <h1 className="text-3xl mt-8 ml-8">Artiste</h1>

                        <div className="w-full h-full overflow-x-scroll overflow-auto flex items-center">
                            {artistList.map((artist, index) => 
                                <div className="glass h-5/6 w-[15rem] min-w-[15rem] ml-6 flex justify-center relative rounded-2xl overflow-hidden" key={artist.name + index}>

                                    <div className="bg-[var(--navbar)] w-full h-full opacity-0 hover:opacity-70 z-10 flex flex-col items-center justify-around rounded-2xl">
                                        <AiFillHeart className={`text-5xl cursor-pointer ${likeArtists?.find(a => a === artist.id) ? "fill-green-600" : "fill-white"}`} data-id={artist.id} onClick={likeArtist}/>
                                        <FaUser className="text-4xl text-[var(--white)] cursor-pointer" data-artistId={artist.id} onClick={showArtist}/>
                                    </div>

                                    {artist.images[0] ? 
                                        <img src={artist.images[0].url} alt="artist icon" className="w-[7.5rem] h-[7.5rem] object-cover rounded-full absolute top-5"/> :
                                        <div className="w-[7.5rem] h-[7.5rem] bg-[var(--navbar)] rounded-full absolute top-5 flex items-center justify-center">
                                            <FaUser className="text-5xl text-[var(--white)]"/>
                                        </div>
                                    }
                                    <h1 className="absolute w-5/6 bottom-5 text-2xl text-center truncate">{artist.name}</h1>
                                </div>
                            )} 

                        </div>

                    </section>

                    <section className="w-full h-2/5 relative">
                        <h1 className="text-3xl mt-8 ml-8">Sons</h1>

                        <div className="w-full h-full overflow-x-scroll overflow-auto flex items-center">
                            {trackList.map((track, index) => 
                                <div className="glass h-5/6 w-[15rem] min-w-[15rem] ml-6 flex justify-center relative rounded-2xl overflow-hidden" key={track.name + index} data-preview-url={track.preview_url}>

                                    <div className="bg-[var(--navbar)] w-full h-full opacity-0 hover:opacity-70 z-10 flex flex-col items-center justify-around rounded-2xl">
                                        <AiFillHeart className={`text-5xl cursor-pointer ${likeMusics?.find(music => music === track.id) ? "fill-green-600" : "fill-white"}`} data-id={track.id} onClick={likeMusic}/>
                                        <FaPlay className="text-4xl text-[var(--white)] cursor-pointer" data-trackId={track.id} onClick={playMusic}/>

                                    </div>

                                    {track.album.images[0].url ? 
                                        <img src={track.album.images[0].url} alt="artist icon" className="w-[7.5rem] h-[7.5rem] object-cover rounded-full absolute top-5"/> :
                                        <div className="w-[7.5rem] h-[7.5rem] bg-[var(--navbar)] rounded-full absolute top-5 flex items-center justify-center">
                                            <FaUser className="text-5xl text-[var(--white)]"/>
                                        </div>
                                    }

                                    <h1 className="absolute w-5/6 bottom-5 text-2xl text-center truncate">{track.name}</h1>
                                </div>
                            )} 

                        </div>

                    </section>
                        
                </div>
            </div>
        </div>
    </div>
  )
}

export default Like