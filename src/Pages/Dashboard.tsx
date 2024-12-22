import TaskForm from "@/Components/Forms/Task-Form";
import FillLoading from "@/Components/Shared/Fill-loading";
import TaskItem from "@/Components/Shared/Task-item";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import {   Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from "@/Components/ui/dialog";
import { db } from "@/Firebase/Firebase";
import { TaskServices } from "@/Service/Task-Service";
import { useUserState } from "@/Store/User.store";
import { taskScheme } from "@/lib/Validation";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import { RiAlertLine } from "react-icons/ri";
import { z } from "zod";

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const {user} = useUserState()
  const {isPending , error, data , refetch } = useQuery({
    queryKey:["task-data"] ,
    queryFn:TaskServices.getTasks,
    // async ()=>{
    //   const q =  query(collection(db , "tasks"))
    //   const data = await getDocs(q)
    //   return data
    // }
  })

  
  const onAdd = async ({title}: z.infer<typeof taskScheme>) => {

    return addDoc(collection(db, "tasks"), {
      title,
      status: "unstarted",
      startTime: null,
      endTime: null,
      userId: user?.uid,
    })
    .then(()=> refetch())
    .finally(() => {
        setOpen(false);  
      });
  
  }
  return (
    <>
    <div className="h-screen max-w-6xl mx-auto flex items-center">
      <div className=" grid grid-cols-2 w-full gap-8 items-center">
        <div className=" flex flex-col space-y-3">
          <div className=" w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary">
            <div className="text-2xl font-bold ">Trainings</div>
            <Button size={"icon"} onClick={()=>setOpen(true)}>
                  <BadgePlus />
                </Button>
           
          </div>
          <Separator />
          <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60">
            {isPending && <FillLoading/>}
            {error && (
         <Alert variant="destructive">
         <RiAlertLine  className="h-4 w-4" />
         <AlertTitle>Error</AlertTitle>
         <AlertDescription>
           {error?.message}
         </AlertDescription>
       </Alert>
      )}
      {data &&(
           <div className="flex flex-col space-y-3 w-full">
           { data.tasks.map((task) => (
             <TaskItem  key={task?.id} task={task}/>
           ))}
         </div>
      )}
           
          </div>
        </div>
        <div className="flex flex-col space-y-3  w-full">
          <div className="p-4 rounded-md bg-gradient-to-tr from-blue-900 to-background relative h-24">
            <div className="text-2xl font-bold">Total week</div>
            <div className="text-3xl font-bold ">02:89:45</div>
          </div>
          <div className="p-4 rounded-md bg-gradient-to-tr from-secondary to-background relative h-24">
            <div className="text-2xl font-bold">Total week</div>
            <div className="text-3xl font-bold ">02:89:45</div>
          </div>
          <div className="p-4 rounded-md bg-gradient-to-tr from-destructive to-background relative h-24">
            <div className="text-2xl font-bold">Total week</div>
            <div className="text-3xl font-bold ">02:89:45</div>
          </div>
        </div>
      </div>
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new task ?</DialogTitle>
                
                </DialogHeader>
                <Separator/>
                <TaskForm handler={onAdd}/>
              </DialogContent>
            </Dialog>
    </>
  );
};

export default Dashboard;
