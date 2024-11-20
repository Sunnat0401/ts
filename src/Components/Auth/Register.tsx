
import { Separator } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuthState } from '@/Store/Auth-store';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerScheme } from '@/lib/Validation'
import { zodResolver } from '@hookform/resolvers/zod'

const Register = () => {
    const {setAuth} = useAuthState()
    const form = useForm<z.infer<typeof registerScheme>>({
      resolver : zodResolver(registerScheme) ,
      defaultValues:{ email:"" , password:"", }
    })
    const onSubmit = async (values: z.infer<typeof registerScheme>) => {
      const { email, password, confirmPassword } = values;
    
      // Ma'lumotlarni konsolga chiqarish
      console.log("Submitted values:", values);
    };
    
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-bold'>Register</h2>
      <p className='text-muted-foreground'>
        Don't have an account ? {""}
        <span className='text-blue-500 cursor-pointer hover:underline'  onClick={()=>setAuth("login")}>Sign up</span>
      </p>
      <Separator className='my-3' />
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
        <div className='grid grid-cols-2 gap-2'>
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
             <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div>
        <Button type="submit" className='h-12 w-full mt-2'>Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default Register
