import { taskScheme } from "@/lib/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/Firebase/Firebase";
import { useUserState } from "@/Store/User.store";
import {  toast } from "sonner";
import FillLoading from "../Shared/Fill-loading";


interface Props {
    title?:string,
    isEdit?: boolean,
    onClose?:() =>void
    handler: (values: z.infer<typeof taskScheme>)=> Promise<void >
}
const TaskForm = ({title = "", handler} :Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useUserState()
  const form = useForm<z.infer<typeof taskScheme>>({
    resolver: zodResolver(taskScheme),
    defaultValues: { title: "" },
  });
  const onSubmit = async (values: z.infer<typeof taskScheme>) => {
    if(!user) return null;
   setIsLoading(true)
    const promise =  handler(values).finally(() =>setIsLoading(false))


    toast.promise(promise,{
         loading:"Loading..",
          success:"Success !",
         error:"Something went wrong !"
     })
   };
  return (
    <>
    {isLoading && <FillLoading/>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter a task"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button className="mt-4" type="submit" disabled={isLoading}>Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TaskForm;
