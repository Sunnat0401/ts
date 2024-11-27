import { auth } from "@/Firebase/Firebase"
import { useUserState } from "@/Store/User.store"
import { ReactNode, useEffect, useState } from "react"
import FillLoading from "../Shared/Fill-loading"
const AuthProvider = ({children} : {children : ReactNode}) => {
    const [isLoading, setIsLoading] = useState(true)
 const { setUser } = useUserState()
 useEffect(()=>{
   auth.onAuthStateChanged(user =>{
  user && setUser(user) ;
  setIsLoading(false)
   })
 } , [])
  return  isLoading ? <FillLoading/>  : <>{children}</>
}

export default AuthProvider
