import { Skeleton } from "../ui/skeleton"
import { LucideLoader2 } from "lucide-react"
const FillLoading = () => {
  return (
    <Skeleton className="absolute insert-0 flex justify-center items-center w-full h-full opacity-20 z-50 ">
      <LucideLoader2 className="animate-spin w-20 h-20"/>
    </Skeleton>
  )
}

export default FillLoading
