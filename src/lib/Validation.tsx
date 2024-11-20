import { z } from "zod"
export const  loginScheme = z.object({
    email : z.string().email(),
    password: z.string().min(8),
})

export const registerScheme  = z.object({
    email : z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine(data => data.password == data.confirmPassword,{
    message: "Passwords do not match",
    path:['confirmPaswword']
})