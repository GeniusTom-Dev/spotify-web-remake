import {  useNavigate, useParams } from "react-router-dom"
import { useEffect,useReducer,useState } from "react"
import { Navbar } from "../../components"
import {RxMagnifyingGlass} from 'react-icons/rx'
import {FaPlay, FaPause, FaRetweet} from 'react-icons/fa'
import {AiFillStepBackward,AiFillHeart} from 'react-icons/ai'
import {BiShuffle} from 'react-icons/bi'
import axios from "axios"

function PlayMusic() {

  const { id } = useParams()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const [likeMusics, setLikeMusics] = useState([])
  const [topTracks, setTopTracks] = useState([])
  const [track, setTrack] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  const setSearch = () => {
    navigate('/search')
  }
  
  const getTopTracks = async (artistId) => {
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

  const getTrackInfo = async () => {
    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTrack(data)
      getTopTracks(data.artists[0].id)
      
    } catch (err) {
      console.error(err);
    }
  }

  const playMusic = () => {
    const audio = document.querySelector('audio')
    if(audio){
      audio.play()
      audio.volume = 0.5
      setIsPlaying(true)
    }else{
      setTimeout(() => {
        playMusic()
      }, 1000);
    }
  }

  const pauseMusic = () => {
    const audio = document.querySelector('audio')
    audio.pause()
    setIsPlaying(false)
  }

  const setProgressBar = () => {
    const audio = document.querySelector('audio')
    const progressed = document.getElementById('progressed')
    const currentTimeMusic = document.getElementById('currentTime')
    progressed.style.width = Math.floor(audio.currentTime) * 100 / audio.duration + "%"

    let min = Math.floor(audio.currentTime / 60)
    let sec = Math.floor(audio.currentTime) - min * 60

    if(sec < 10){
        sec = "0" + sec
    }

    currentTimeMusic.textContent = min + ":" + sec

    changeMusicInit(audio)
  }

  const changeMusicInit = (audio) =>{
    const totalTimeMusic = document.getElementById('totalTime')
    let min = Math.floor(audio.duration / 60)
    let sec = Math.floor(audio.duration - min * 60)
    if(sec < 10){
        sec = "0" + sec
    }
    totalTimeMusic.textContent = min + ":" + sec
  }

  const switchRepeat = () => {
    setIsLooping(!isLooping)
  }

  const resetTime = () => {
    const audio = document.querySelector('audio')
    audio.currentTime = 0
  }

  const endAudio = () => {
    const audio = document.querySelector('audio')
    if(isLooping){
      audio.currentTime = 0
      audio.play()
    }else{
      audio.currentTime = 0
      audio.pause()
      setIsPlaying(false)
    }
  }

  const getLikeMusic = async () => {
    const likedMusic = JSON.parse(localStorage.getItem('likedMusic'))
    setLikeMusics(likedMusic)
    console.log(likedMusic);
  }

  const likeMusic = () => {
    const likedMusic = JSON.parse(localStorage.getItem('likedMusic'))
    if(likedMusic){
      const isLiked = likedMusic.find(music => music === track.id)
      if(isLiked){
        const newLikedMusic = likedMusic.filter(music => music !== track.id)
        localStorage.setItem('likedMusic', JSON.stringify(newLikedMusic))
      }else{
        const newLikedMusic = [...likedMusic, track.id]
        localStorage.setItem('likedMusic', JSON.stringify(newLikedMusic))
      }
    }else{
      localStorage.setItem('likedMusic', JSON.stringify([track.id]))
    }
    getLikeMusic()
  }

  useEffect(() => {
    getTrackInfo()
    getLikeMusic()
    // playMusic()   
  }, [])

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className='bg-[var(--main)] h-[80vh] w-[80vw] rounded-3xl relative'>
        <Navbar/>
        <div className="w-[calc(100%-5rem)] h-full ml-20 absolute top-0">

          <div className="w-1/5 h-14 bg-[var(--search)] ml-8 mt-4 rounded-3xl relative" onClick={setSearch}>
            <RxMagnifyingGlass className="text-3xl text-white absolute top-1/2 -translate-y-1/2 left-6"/>
            <h1 className="text-xl text-white absolute top-1/2 -translate-y-1/2 left-16">Search here...</h1>
          </div>

          {track && 
          <div className="w-full h-3/4 flex justify-center absolute bottom-0">
            <div className="w-1/2 h-full relative">
              <img src={track.album.images[0].url} alt="jacket" className="w-2/5 absolute top-1/2 -translate-y-full left-1/2 -translate-x-1/2 scale-125 blur-xl"/>
              <img src={track.album.images[0].url} alt="jacket" className="w-2/5 absolute top-1/2 -translate-y-full left-1/2 -translate-x-1/2"/>

              <h1 className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-4xl w-5/6 text-center truncate">{track.name}</h1>

              <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 flex justify-around items-center space-x-8">
                <BiShuffle className="text-4xl text-white cursor-pointer"/>
                <AiFillStepBackward className="text-4xl text-white cursor-pointer" onClick={resetTime}/>
                {isPlaying ? <FaPause className="text-4xl text-white cursor-pointer" onClick={pauseMusic}/> : <FaPlay className="text-4xl text-white cursor-pointer" onClick={playMusic}/>}
                <AiFillHeart className={`text-4xl cursor-pointer ${likeMusics?.find(music => music === track.id) ? "fill-green-600" : "fill-white"}`} onClick={likeMusic}/>
                <FaRetweet className={`text-4xl cursor-pointer ${isLooping ? `fill-red-600`: `fill-white`}`} onClick={switchRepeat}/>
              </div>  

              <audio src={track.preview_url} onTimeUpdate={setProgressBar} onEnded={endAudio}/>

              <h1 className="absolute bottom-[10%] left-1 translate-y-1/2" id="currentTime">00:00</h1>

              <div className="w-5/6 h-2 bg-[#5e5e5e] absolute bottom-[10%] left-1/2 -translate-x-1/2 rounded-full translate-y-1/3">
                <div className="w-0 h-full bg-white rounded-full" id="progressed"></div>
              </div>

              <h1 className="absolute bottom-[10%] right-1 translate-y-1/2" id="totalTime">00:00</h1>
                

            </div>    

            <div className="absolute -top-[20%] right-1/4 text-4xl translate-x-1/2">{track.artists[0].name} - Top Titre</div>

            <div className="w-1/2 h-full relative overflow-y-scroll">
              {
                topTracks && topTracks.map((tTrack, index) => {
                  return (
                    <div className="w-full flex items-center relative mb-2" key={index}>
                      <div className="absolute w-1/6 h-full bg-[var(--navbar)] opacity-0 hover:opacity-70 flex justify-center items-center">
                        <FaPlay className="text-2xl text-white cursor-pointer" onClick={() => {
                          navigate(`/play/${tTrack.id}`)
                          window.location.reload()
                        }}/>
                      </div>
                      <img src={tTrack.album.images[0].url} alt="jacket" className="w-1/6 "/>
                      <h1 className="text-xl ml-4">{tTrack.name}</h1>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
        </div>
      </div>
    </div>
  )
}

export default PlayMusic