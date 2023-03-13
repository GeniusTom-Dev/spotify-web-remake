import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

function LoginPage() {

  const CLIENT_ID = "c046f20efc624d8986a3713da1606d17"
  const REDIRECT_URI = "http://127.0.0.1:5173/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const [token, setToken] = useState()

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  if(token) return <Navigate to="/home"/>

  return (
    <div className='bg-[var(--grey)] h-[100vh] w-[100vw] flex flex-col justify-around items-center'>
        <div className="flex items-center ">
          {/* <img src={spotify} alt="spotify logo" className="w-16 mr-4"/> */}
          <h1 className="ml-4 text-4xl sm:text-8xl">Spotify</h1>
        </div>
        
        <div className="flex flex-col border p-8 rounded-xl -translate-y-1/2">
          <h1 className='text-4xl mb-8'>Login to Spotify</h1>
          <button className='bg-[var(--green)] w-full rounded-xl text-xl py-2 md:py-0'><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a></button>
        </div>
      
    </div>
  )
}

export default LoginPage