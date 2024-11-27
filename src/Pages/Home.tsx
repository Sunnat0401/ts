import { Button } from "@/Components/ui/button"
import { featuredItems, programs } from "@/Const"
import Man from '../assets/men.png'
import { Card } from "@/Components/ui/card"
import { FaArrowRightLong } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { useUserState } from "@/Store/User.store"
import { CgGym } from "react-icons/cg"
import { LogOut } from "lucide-react"
import { auth } from "@/Firebase/Firebase"
const Home = () => {
   const navigate = useNavigate()
  const {user, setUser} = useUserState()
  const onLogaut =()=>{
    auth.signOut().then(()=>{
  setUser(null)
  navigate("/auth")
    })
    }
  return (
    <>
    <div className=" max-w-6xl w-full h-screen flex justify-between items-center  container  mx-auto">
     <div className="max-w-xl  flex h-full flex-col justify-center">
        <h1 className="text-9xl font-semibold uppercase"> Workout with me </h1>
        <p className="text-muted-foreground"> A huge selection of health end fitness content , healthy recipes and transformation stories to help you get fit and stay fit !</p>
        {user ? (
          <div className="flex gap-4">
            <Link to={"/dashboard"}>
                <Button className="w-fit mt-6 font-bold h-12 " size={"lg"}>
                 <span>Go to GYM</span>
                 <CgGym className="h-5 w-5 ml-2"/>
                </Button>
            </Link>
            <Button className="w-fit mt-6 font-bold h-12 " variant={"destructive"} size={"lg"}
            onClick={onLogaut}>
                 <span>Logout</span>
                 <LogOut className="h-5 w-5 ml-2"/>
                </Button>
          </div>
        ) :(
        <Link to={"/auth"}>
        <Button className="w-fit mt-6 font-bold h-12 " size={'lg'}>Join club now </Button>
        </Link>

        )}
        <div className="mt-24">
          <p className="text-muted-foreground">AS FEATURED IN </p>
          <div className="flex items-center gap-4 mt-2">
           {featuredItems.map((Icon, index) => (
              <Icon key={index} className="text-4xl w-12 h-12" />
             ))}
          </div>
     </div>
     </div>
   <img src={Man} alt="Man" className="w-1/4" />
    </div>
    <div className="container max-w-5xl mx-auto ">
      <h1 className="text-4xl ">Not sure where to start ? </h1>
      <p className="mt-2 text-muted-foreground">
        Programs offer day to day guidance on a interactive calendar to keep you on track
      </p>
       <div className="grid grid-cols-3 gap-4 my-8">
        {programs.map(item =>(
          <Card key={item.title} className="p-8 relative cursor-pointer group">
            <h3>{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
          <Button size={"icon"} variant={'ghost'} className="absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform">
             <FaArrowRightLong/>
          </Button>
          </Card>
        ))}
       </div>
    </div>
    </>
  )
}

export default Home
