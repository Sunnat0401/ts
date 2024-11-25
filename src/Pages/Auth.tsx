import Login from "@/Components/Auth/Login"
import Register from "@/Components/Auth/Register"
import Social from "@/Components/Auth/Social"
import { Card } from "@/Components/ui/card"
import { useAuthState } from "@/Store/Auth-store"
import { useState } from "react"

const Auth = () => {
    const {authState} = useAuthState()
  return (
    <div className="w-full h-screen bg-gradient-to-t from-foreground to-background flex items-center justify-center">
      <Card className="p-8 w-1/3 relative"> 
       {authState == 'login' && <Login/>}
       {authState == 'register' && <Register/>}
       <Social/>
      </Card>
    </div>
  )
}

export default Auth
