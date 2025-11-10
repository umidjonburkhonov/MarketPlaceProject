import React from 'react'
import AuthForm from '../components/AuthForm'

export default function Login() {
  const handleLogin = async (data) => {
    try {
      const res = await fetch('https://7ac4d0ddb89b.ngrok-free.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      const result = await res.json()
      console.log(result)
      alert(result.success || result.warning || result.error)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center   ">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  )
}
