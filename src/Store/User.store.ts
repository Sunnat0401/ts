import {User} from "firebase/auth"
import { create } from "zustand"
type UserType = User | null 

 interface IUserStoreInterface {
    user: UserType ,
    setUser:(user : UserType) =>  void , 
 }

 export const useUserState = create <IUserStoreInterface>(set => ({
    isLoading: true,
    user: null,
    setUser: user => set({user}),
 }))