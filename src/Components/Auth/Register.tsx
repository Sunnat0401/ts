
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuthState } from '@/Store/Auth-store';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerScheme } from '@/lib/Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth" ;
import { auth } from '@/Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { RiAlertLine } from "react-icons/ri";
import FillLoading from '../Shared/Fill-loading';
import { useUserState } from '@/Store/User.store';
const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
    const {setAuth} = useAuthState()
    const {setUser} = useUserState()
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof registerScheme>>({
      resolver : zodResolver(registerScheme) ,
      defaultValues:{ email:"" , password:"", }
    })
    const onSubmit = async (values: z.infer<typeof registerScheme>) => {
      const { email, password, confirmPassword } = values;
        setIsLoading(true)   
        try{
       const res  = await createUserWithEmailAndPassword(auth , email , password)
       setUser(res?.user)
       navigate('/')
        } catch(error) {
          const result = error as Error
          setError(result.message)
        }finally{
          setIsLoading(false)
        }
    };
    
  return (
    <div className='flex flex-col'>
          {isLoading &&   <FillLoading/>}
      <h2 className='text-xl font-bold'>Register</h2>
      <p className='text-muted-foreground'>
        Don't have an account ? {""}
        <span className='text-blue-500 cursor-pointer hover:underline'  onClick={()=>setAuth("login")}>Sign up</span>
      </p>
      <Separator className='my-3' />
      {error && (
         <Alert variant="destructive">
         <RiAlertLine  className="h-4 w-4" />
         <AlertTitle>Error</AlertTitle>
         <AlertDescription>
           Your session has expired. Please log in again.
         </AlertDescription>
       </Alert>
      )}
             <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email adress</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field}  disabled={isLoading}/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-2'>
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
             <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div>
        <Button type="submit" className='h-12 w-full mt-2' disabled={isLoading}>Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default Register
