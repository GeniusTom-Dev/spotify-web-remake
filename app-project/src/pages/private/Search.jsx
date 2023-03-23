import { useState } from "react"
import { useNavigate } from "react-router"
import { Navbar } from "../../components"
import axios from "axios"
import {RxMagnifyingGlass} from 'react-icons/rx'
import {FaUser,FaPlay} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'

function Search() {

    const token = sessionStorage.getItem('token')
    const [artistList, setArtistList] = useState([])
    const [trackList, setTrackList] = useState([])
    const navigate = useNavigate()

    const search = async (e) => {

        if(e.target.value === ""){
            setArtistList([])
            setTrackList([])
            return
        }

        try{
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: e.target.value,
                    type: "artist"
                }
            })
            setArtistList(data.artists.items)

        }
        catch(err){
            if(err.response.status === 401){
                sessionStorage.removeItem('token')
                navigate('/')
            }

            
        }

        try{
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: e.target.value,
                    type: "track"
                }
            })
            setTrackList(data.tracks.items)

        }
        catch(err){
            console.log(err)
        }
        
    }

    const likeTrack = (e) => {
        const musicId = e.target.parentElement.dataset.musicid
        const storage = JSON.parse(localStorage.getItem('likedTracks')) || []

        if(!storage.includes(musicId)){
            storage.push(musicId)
            localStorage.setItem('likedTracks', JSON.stringify(storage))
        }

        console.log(localStorage.getItem('likedTracks'))
    }

    const likeArtist = (e) => {
        const artistId = e.target.parentElement.dataset.artistid
        const storage = JSON.parse(localStorage.getItem('likedArtists')) || []

        if(!storage.includes(artistId)){
            storage.push(artistId)
            localStorage.setItem('likedArtists', JSON.stringify(storage))
        }

        console.log(localStorage.getItem('likedArtists'))
    }

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className='bg-[var(--main)] h-[80vh] w-[80vw] rounded-3xl relative'>
                <Navbar/>
                <div className="w-[calc(100%-5rem)] h-full ml-20 absolute top-0 flex flex-col items-center">
                    <div className=" w-5/6 h-14 bg-[var(--search)] ml-8 mt-8 rounded-3xl relative">
                        <RxMagnifyingGlass className="text-3xl text-[var(--white)] absolute top-1/2 -translate-y-1/2 left-6"/>
                        <input type="text" placeholder="Search here..." autoFocus className="w-full h-full bg-transparent outline-none pl-16 text-xl" onChange={search}/>
                    </div>
                
                    <section className="w-full h-3/6 relative">
                        <h1 className="text-3xl mt-8 ml-8">Artiste</h1>

                        <div className="w-full h-3/4 overflow-x-scroll overflow-auto flex items-center">
                            {artistList.map((artist, index) => 
                                <div className="glass h-5/6 w-[15%] min-w-[15%] ml-6 flex justify-center relative rounded-2xl overflow-hidden" key={artist.name + index}>

                                    <div className="bg-[var(--navbar)] w-full h-full opacity-0 hover:opacity-70 z-10 flex flex-col items-center justify-around rounded-2xl">
                                        <AiFillHeart className="text-5xl text-[var(--white)] cursor-pointer" data-artistid={artist.id} onClick={likeArtist}/>
                                        <FaUser className="text-4xl text-[var(--white)] cursor-pointer"/>
                                    </div>

                                    {artist.images[0] ? 
                                        <img src={artist.images[0].url} alt="artist icon" className="w-1/2 pb-[66.6%] object-cover rounded-full absolute top-5"/> :
                                        <div className="w-1/2 pb-[66.6%] bg-[var(--navbar)] rounded-full absolute top-5 flex items-center justify-center">
                                            <FaUser className="text-5xl text-[var(--white)]"/>
                                        </div>
                                    }
                                    <h1 className="absolute w-5/6 bottom-5 text-2xl text-center truncate">{artist.name}</h1>
                                </div>
                            )} 

                        </div>

                    </section>

                    <section className="w-full h-3/6 relative">
                        <h1 className="text-3xl mt-8 ml-8">Sons</h1>

                        <div className="w-full h-3/4 overflow-x-scroll overflow-auto flex items-center">
                            {trackList.map((track, index) => 
                                <div className="glass h-5/6 w-[15%] min-w-[15%] ml-6 flex justify-center relative rounded-2xl overflow-hidden" key={track.name + index} data-preview-url={track.preview_url}>

                                    <div className="bg-[var(--navbar)] w-full h-full opacity-0 hover:opacity-70 z-10 flex flex-col items-center justify-around rounded-2xl">
                                        <AiFillHeart className="text-5xl text-[var(--white)] cursor-pointer" data-musicid={track.id} onClick={likeTrack}/>
                                        <FaPlay className="text-4xl text-[var(--white)] cursor-pointer" data-musicid={track.id}/>
                                    </div>

                                    {track.album.images[0].url ? 
                                        <img src={track.album.images[0].url} alt="artist icon" className="w-1/2 pb-[66.6%] object-cover rounded-full absolute top-5"/> :
                                        <div className="w-1/2 pb-[66.6%] bg-[var(--navbar)] rounded-full absolute top-5 flex items-center justify-center">
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
    )
}

export default Search