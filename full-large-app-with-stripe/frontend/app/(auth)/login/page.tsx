'use client'

import { useState } from 'react'
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { useRouter } from 'next/navigation'

import useUserStore from '@/app/lib/user-store'

import Button from '@/app/components/button'
import HiddenInput from '@/app/components/hiddenInput'
import TextInput from '@/app/components/textInput'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser } = useUserStore()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let response  = await signInWithEmailAndPassword(auth, email, password)
      let token = await response.user.getIdToken()
      if (response.user) {
        let serverResponse = await fetch('http://localhost:8000/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': `${token}`,
          }, 
        })
        let returns = await serverResponse.json()
        //if signup field is true and in the object
        if (returns.signup) {
            setUser({
                email: returns.email,
                emailVerified: returns.emailVerified,
                userId: returns.userId,
                token: token,
            })
            router.push('/register')
        }
        else {

            setUser({
                email: returns.email,
                emailVerified: returns.emailVerified,
                username: returns.username,
                firstName: returns.firstName,
                lastName: returns.lastName,
                userId: returns.userId,
                token: token,
            })
            console.log(returns.username)
            router.push('/dashboard')
        }
      }
    } catch (error: any) {
        setError(error.message)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-two rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextInput label="Email" value={email} onChange={setEmail} placeholder="Email" />
          </div>
          <div className="mb-4">
            <HiddenInput label="Password" value={password} onChange={setPassword} placeholder="Password" />
          </div>
          <Button type="submit" className="w-full" disabled={!email || !password}>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}