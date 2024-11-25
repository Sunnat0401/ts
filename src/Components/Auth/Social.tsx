import { Separator } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import { FaGithub, FaGoogle } from "react-icons/fa6"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Social = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onGoogle =() =>{
    setIsLoading(true)
  }
  return (
    <>
      <Separator className="my-3"/>
      <div className="grid grid-cols-2 gap-2 ">
        <Button className="h-12" variant={'secondary'}> 
            <FaGithub/>
            <span>Sign in with Github</span>
        </Button>
        <Button className="h-12" variant={'destructive'}> 
            <FaGoogle/>
            <span>Sign in with Google</span>
        </Button>
      </div>
    </>
  )
}

export default Social
