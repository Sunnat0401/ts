import { useAuthState } from '@/Store/Auth-store'
import { Input } from '../ui/input'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginScheme } from '@/lib/Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

const Login = () => {
    const {setAuth} = useAuthState()
    const form = useForm<z.infer<typeof loginScheme>>({
      resolver : zodResolver(loginScheme) ,
      defaultValues:{ email:"" , password:"", }
    })
    const onSubmit = async(values: z.infer<typeof loginScheme>) =>{
    const {email , password} = values
      
    }
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-bold'>Login</h2>
      <p className='text-muted-foreground'>
        Don't have an account ? {""}
        <span className='text-blue-500 cursor-pointer hover:underline' onClick={()=>setAuth("register")}>Sign in</span>
      </p>
      <Separator className='my-3' />
      {/* <div className='flex flex-col gap-1'>
       <span  className='mb-2'>Email</span>
       <Input placeholder='example@gmail.com'/>
      </div>
      <div className='flex flex-col gap-2 mt-2'>
       <span>Password</span>
       <Input placeholder='*****' type='password' />
      </div>
      <Button className='w-full h-12 mt-2'>Login</Button> */}
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email adress</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
                <Input placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
        <Button type="submit" className='h-12 w-full mt-2'>Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default Login
