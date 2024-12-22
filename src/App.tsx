import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import { Toaster } from "./Components/ui/sonner";


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      <Toaster position="top-center" />
    </div>
  )
}

export default App
