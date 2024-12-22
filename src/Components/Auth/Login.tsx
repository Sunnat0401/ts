import { useAuthState } from '@/Store/Auth-store'
import { Input } from '../ui/input'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginScheme } from '@/lib/Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '@/Firebase/Firebase'
import { RiAlertLine } from "react-icons/ri";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import FillLoading from '../Shared/Fill-loading'
import { useUserState } from '@/Store/User.store'
const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
    const {setAuth} = useAuthState()
    const {setUser} = useUserState()
    const form = useForm<z.infer<typeof loginScheme>>({
      resolver : zodResolver(loginScheme) ,
      defaultValues:{ email:"" , password:"", }
    })
    const onSubmit = async(values: z.infer<typeof loginScheme>) =>{
    const {email , password} = values
    setIsLoading(true)   
    try{
   const res  = await signInWithEmailAndPassword(auth , email , password)
   setUser(res.user)
   navigate('/')
    } catch(error) {
      const result = error as Error
      setError(result.message)
    }finally{
      setIsLoading(false)
    }
    }
  return (
    <div className='flex flex-col'>
    {isLoading &&   <FillLoading/>}
      <h2 className='text-xl font-bold'>Login</h2>
      <p className='text-muted-foreground'>
        Don't have an account ? {""}
        <span className='text-blue-500 cursor-pointer hover:underline' onClick={()=>setAuth("register")}>Sign in</span>
      </p>
      <Separator className='my-3' />
      {error && (
         <Alert variant="destructive">
         <RiAlertLine  className="h-4 w-4" />
         <AlertTitle>Error</AlertTitle>
         <AlertDescription>
           {error}
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
                <Input placeholder="example@gmail.com" {...field} disabled={isLoading}/>
              </FormControl>
              <FormDescription>
               {error}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field}  disabled={isLoading}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
        <Button type="submit" className='h-12 w-full mt-2' disabled={isLoading}>Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default Login
