import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import Chat from "./Pages/Chat"
import Auth from "./Pages/Auth"
import { useAuthStore } from "./Store/useAuthStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"

function App() {
  const {authUser, checkAuth , checkingAuth} = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return (
      null
    )
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <Routes>
        <Route path="/" element={authUser ?<Home/>:<Navigate to="/auth" />} />
        <Route path="/auth" element={!authUser ?<Auth/>:<Navigate to="/" />} />
        <Route path="/profile" element={authUser ?<Profile/>:<Navigate to="/auth" />} />
        <Route path="/chat/:id" element={authUser ?<Chat/>:<Navigate to="/auth" />} />

      </Routes>

      <Toaster/>
    </div>
  );
}

export default App