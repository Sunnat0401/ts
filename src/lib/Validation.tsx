import { z } from "zod"
export const  loginScheme = z.object({
    email : z.string().email(),
    password: z.string().min(8),
})