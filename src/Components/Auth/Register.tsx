import { useAuthState } from '@/Store/Auth-store'
import { Separator } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const Register = () => {
    const {setAuth} = useAuthState()
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-bold'>Register</h2>
      <p className='text-muted-foreground'>
        Don't have an account ? {""}
        <span className='text-blue-500 cursor-pointer hover:underline'  onClick={()=>setAuth("login")}>Sign up</span>
      </p>
      <Separator className='my-3' />
      <div className='flex flex-col gap-1'>
       <span>Email</span>
       <Input placeholder="Email" />
      </div>
      <div className='grid grid-cols-2 gap-6 mt-2 '>
        <div className='flex flex-col gap-1'>
          <span>Password</span>
          <Input placeholder='*****' type='password' />
        </div>
        <div className='flex flex-col gap-1'>
          <span>Confirm password</span>
          <Input placeholder='*****' type='password' />
        </div>
      </div>
      <Button className='w-full h-12 mt-2'>Register</Button>
    </div>
  )
}

export default Register
