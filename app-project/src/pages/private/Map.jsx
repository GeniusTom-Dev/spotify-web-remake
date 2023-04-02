import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components'
import {RxMagnifyingGlass} from 'react-icons/rx'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

function Map() {

  const token = sessionStorage.getItem('token')
  const [artistsName, setArtistsName] = useState([])
  const [artistsCoords, setArtistsCoords] = useState([])
  const navigate = useNavigate()

  const getArtistName = async (idList) => {
    let dataArtist = []
    idList.map(async (id, index) => {
      try {
        const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        let artistName = data.name

        try {
          const { data } = await axios.get(`https://musicbrainz.org/ws/2/artist/?query=${artistName}&fmt=json`);
          let locName = data.artists[0]["begin-area"]?.name

          if(locName){
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${locName}`);
            if (response.data && response.data.length > 0) {
              const locCoords = [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)];
              if(!artistsCoords.includes({artistName,location, locCoords})){
                dataArtist.push({artistName,locName, locCoords})
                console.log(index, idList.length - 1)
                if(index == idList.length - 1){
                  setArtistsCoords(dataArtist)
                }
              }
            }
          }
          
        } catch (err) {
          console.error(err);
        }       
        
      } catch (err) {
        console.error(err);
      }
    })  
    
  }

  useEffect(() => {
    getArtistName(JSON.parse(localStorage.getItem('likedArtist')))
  }, [])

  const setSearch = () => {
    navigate('/search')
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
        </div>

        <section className="w-[calc(100%-5rem)] ml-20 h-5/6 absolute bottom-[4.25rem] rounded-br-3xl">
          <h1 className="text-3xl mt-8 ml-8">Localisation de naissance de vos artists préféré</h1>
          <MapContainer center={[47.052450, 2.398864]} zoom={5} scrollWheelZoom={true} className='w-full h-full rounded-br-3xl'>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className='rounded-br-3xl'/>
            {artistsCoords.map((artist, index) =>
              <Marker key={index} position={artist.locCoords}>
                <Popup >
                  <h1 className='text-black text-center'>{artist.artistName}</h1>
                </Popup>
              </Marker>
            )

            }
          </MapContainer>

        </section>
        

      </div>
    </div>
  )
}

export default Map