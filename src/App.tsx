import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </div>
  )
}

export default App
