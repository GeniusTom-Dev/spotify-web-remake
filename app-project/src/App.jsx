import { LoginPage, DashBoard, Search } from "./pages"
import {Routes, Route} from "react-router-dom"

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/home" element={<DashBoard/>}/>
      <Route path="/search" element={<Search/>}/>
    </Routes>
  </div>
)


export default App