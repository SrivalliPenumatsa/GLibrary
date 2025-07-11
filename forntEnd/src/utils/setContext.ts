'use client'

import { cookies } from 'next/headers'
import { useUser } from "@/services/contexts/UserContext";


interface UserData {
  name: string
  email: string
  token: string
}

export async function setAuthContext(userData: UserData) {
    const { setUser } = useUser();
  
  setUser({
    name: userData.name,
    email: userData.email
  }) 
  
  return {
    name: userData.name,
    email: userData.email
  }
}