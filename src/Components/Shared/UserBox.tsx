import { useUserState } from "@/Store/User.store";
import { LogOut, LucideLoader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CgGym } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { auth } from "@/Firebase/Firebase";

const UserBox = () => {
  const { user , setUser } = useUserState();
  const navigate = useNavigate()

  if (!user) return <LucideLoader2 className="animate-spin" />;

  const onLogaut =()=>{
  auth.signOut().then(()=>{
setUser(null)
navigate("/auth")
  })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.photoURL!} />
          <AvatarFallback className="uppercase">{user.email![0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="fllex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground ">
            {user.email}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary/50 p-1">
              <Avatar>
                <AvatarImage src={user.photoURL!} />
                <AvatarFallback className="uppercase">{user.email![0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
                <p className="line-clamp-1 text-sm">{user.displayName ?? user.email} </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuRadioGroup>
        <DropdownMenuItem className="cursor-pointer" onClick={onLogaut}>
                <CgGym  className="w-4 h-4 mr-2"/>
                <span>Gym</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer bg-destructive" onClick={onLogaut}>
                <LogOut className="w-4 h-4 mr-2 "/>
                <span>Logout</span>
            </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserBox;
