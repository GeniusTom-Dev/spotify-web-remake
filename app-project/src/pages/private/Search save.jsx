import axios from "axios"

function DashBoard() {
  const token = sessionStorage.getItem('token')

  const searchTrack = async (e) => {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: e.target.value,
            type: "track"
        }
    })

    

    // récupère la première piste de la réponse
    const track = data.tracks.items[0]

    // fait quelque chose avec la piste (par exemple, afficher son nom)
    console.log(track)
    
}


  return (
    <div className='bg-[var(--grey)] h-[100vh]'>
      {token}
      <input type="text" className="bg-red-300" onChange={searchTrack}/>
    </div>
  )
}

export default DashBoard