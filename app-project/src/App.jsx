import { LoginPage, DashBoard, Search, PlayMusic,Playlist,Map, Like, Artist } from "./pages"
import {Routes, Route} from "react-router-dom"

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/home" element={<DashBoard/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/play/:id" element={<PlayMusic/>}/>
      <Route path="/playlist/:id" element={<Playlist/>}/>
      <Route path="/artist/:id" element={<Artist/>}/>
      <Route path="/map" element={<Map/>}/>
      <Route path="/like" element={<Like/>}/>
    </Routes>
  </div>
)


export default App