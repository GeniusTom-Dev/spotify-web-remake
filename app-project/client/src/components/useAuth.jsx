import { useState, useEffect } from "react"
import axios from "axios"

export default function UseAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios.post('http://127.0.0.1:3001/login', {
            code,
        })
        .then(res => {
            console.log(res.data)
        })
        // .catch(() => {
        //     window.localStorage.removeItem("token")
        //     window.location = "/"
        // })
    }, [code])
}