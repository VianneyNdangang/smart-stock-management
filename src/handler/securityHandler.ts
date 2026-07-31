import {user_token} from '@/helpers/constant'
import { z } from 'zod'

export const SaveToken = (token: string)=>{
    localStorage.setItem(user_token, token)
}

export const deleteToken = () =>{
    localStorage.removeItem(user_token)
}

export const loginSchema = z.object({
  email: z
    .string()
    // .email()
    .min(1,"The Email is required"),

  password: z
    .string()
    .min(5, "Le mot de passe doit contenir au moins 5 caractères"),
});