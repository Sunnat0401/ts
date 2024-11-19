import { useAuthState } from '@/Store/Auth-store'
import { Input } from '../ui/input'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginScheme } from '@/lib/Validation'
import { zodResolver } from '@hookform/resolvers/zod'

const Login = () => {
    const {setAuth} = useAuthState()
    const from = useForm<z.infer<typeof loginScheme>>({
      resolver : zodResolver(loginScheme) ,
      
    })
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-bold'>Login</h2>
      <p className='text-muted-foreground'>
        Don't have an account ? {""}
        <span className='text-blue-500 cursor-pointer hover:underline' onClick={()=>setAuth("register")}>Sign in</span>
      </p>
      <Separator className='my-3' />
      <div className='flex flex-col gap-1'>
       <span  className='mb-2'>Email</span>
       <Input placeholder='example@gmail.com'/>
      </div>
      <div className='flex flex-col gap-2 mt-2'>
       <span>Password</span>
       <Input placeholder='*****' type='password' />
      </div>
      <Button className='w-full h-12 mt-2'>Login</Button>
    </div>
  )
}

export default Login
